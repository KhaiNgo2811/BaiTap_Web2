const express = require("express")
const app = express()
const port = 3002

const morgan = require("morgan")
app.use(morgan("combined"))

const cors = require("cors")
app.use(cors())
const bodyParser = require("body-parser")
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

const { MongoClient, ObjectId } = require("mongodb")
const MONGO_URL = "mongodb://127.0.0.1:27017"
const DB_NAME = "FashionData"
const COLLECTION = "Fashion"

const client = new MongoClient(MONGO_URL)
const fashionCollection = () => client.db(DB_NAME).collection(COLLECTION)

app.get("/", (req, res) => {
    res.send("This Web server is processed for MongoDB")
})

// Tách chuỗi thành tập các từ (chữ thường, bỏ dấu câu)
function tokenize(text) {
  const words = String(text || "")
    .toLowerCase()
    .normalize("NFC")
    .replace(/[’']s\b/g, "")          // Oh’s -> Oh
    .match(/[\p{L}\p{N}]+/gu) || [];
  return new Set(words);
}

// J(A,B) = |A ∩ B| / |A ∪ B|
function jaccard(a, b) {
  if (a.size === 0 && b.size === 0) return 0;
  let inter = 0;
  for (const w of a) if (b.has(w)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

// GET /fashions?q=street style&field=fashion_subject|fashion_detail&limit=5
app.get("/fashions", cors(), async (req, res) => {
  try {
    const q = (req.query.q || "").toString().trim();
    const style = (req.query.style || "").toString().trim();
    const field = req.query.field === "fashion_detail" ? "fashion_detail" : "fashion_subject";
    const limit = Math.max(1, parseInt(req.query.limit) || 10);
    // lite=1: bỏ ảnh base64 (rất nặng) khi chỉ cần hiển thị danh sách
    const lite = req.query.lite === "1";
    // measure=cosine|jaccard: độ đo dùng để sắp xếp giảm dần
    const measure = req.query.measure === "cosine" ? "cosine" : "jaccard";
    // order=created_desc: sắp xếp theo ngày tạo giảm dần (dùng cho trang Client)
    const order = req.query.order;

    const filter = style ? { style: { $regex: style, $options: "i" } } : {};
    const docs = await fashionCollection().find(filter).sort({ created_date: -1 }).toArray();
    const qTokens = tokenize(q);
    const qList = tokenizeList(q);

    const result = docs
      .map((d) => {
        const jac = q ? jaccard(qTokens, tokenize(d[field])) : 0;
        const cos = q ? cosine(qList, tokenizeList(d[field])) : 0;
        return {
          Id: d._id.toString(),
          IdF: d.IdF,
          CreatedDate: d.created_date,
          Style: d.style,
          fashion_subject: d.fashion_subject,
          fashion_detail: d.fashion_detail,
          Image: lite ? "" : d.fashion_image,
          Jaccard: jac,
          Cosine: cos,
          Similarity: measure === "cosine" ? cos : jac,
        };
      })
      .sort(order === "created_desc"
        ? (x, y) => new Date(y.CreatedDate || 0) - new Date(x.CreatedDate || 0)   // mới nhất trước
        : (x, y) => y.Similarity - x.Similarity)
      .slice(0, limit);

    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi truy vấn MongoDB: " + err.message);
  }
});

// Danh sách từ (giữ lặp) để tính tần suất TF cho Cosine
function tokenizeList(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFC")
    .replace(/[’']s\b/g, "")
    .match(/[\p{L}\p{N}]+/gu) || [];
}

// cos(A,B) = A·B / (|A|·|B|) trên vector tần suất từ
function cosine(tokensA, tokensB) {
  const fa = new Map(), fb = new Map();
  for (const w of tokensA) fa.set(w, (fa.get(w) || 0) + 1);
  for (const w of tokensB) fb.set(w, (fb.get(w) || 0) + 1);
  let dot = 0, na = 0, nb = 0;
  for (const [w, c] of fa) { na += c * c; if (fb.has(w)) dot += c * fb.get(w); }
  for (const c of fb.values()) nb += c * c;
  return na === 0 || nb === 0 ? 0 : dot / (Math.sqrt(na) * Math.sqrt(nb));
}

// GET /fashions/:id -> trả về document gốc (_id, style, fashion_image...)
app.get("/fashions/:id", cors(), async (req, res) => {
  try {
    const id = req.params.id;
    let filter;
    if (/^\d+$/.test(id)) {
      filter = { IdF: parseInt(id, 10) };          // tra theo IdF (số)
    } else if (ObjectId.isValid(id)) {
      filter = { _id: new ObjectId(id) };          // tra theo _id Mongo
    } else {
      return res.status(400).send("Id không hợp lệ");
    }
    // lite=1: bỏ ảnh base64 khi chỉ cần nội dung chữ
    const options = req.query.lite === "1" ? { projection: { fashion_image: 0 } } : {};
    const doc = await fashionCollection().findOne(filter, options);
    if (!doc) return res.status(404).send("Not found Fashion");
    res.send(doc);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi truy vấn MongoDB: " + err.message);
  }
});

// GET /fashions/:id/image -> trả ảnh nhị phân (giải mã base64) để <img src> tải và cache được
app.get("/fashions/:id/image", cors(), async (req, res) => {
  try {
    const id = req.params.id;
    let filter;
    if (/^\d+$/.test(id)) filter = { IdF: parseInt(id, 10) };
    else if (ObjectId.isValid(id)) filter = { _id: new ObjectId(id) };
    else return res.status(400).send("Id không hợp lệ");

    const doc = await fashionCollection().findOne(filter, { projection: { fashion_image: 1 } });
    if (!doc || !doc.fashion_image) return res.status(404).send("Not found image");

    const m = String(doc.fashion_image).match(/^data:(image\/[\w.+-]+);base64,(.*)$/s);
    const mime = m ? m[1] : "image/png";
    const buf = Buffer.from(m ? m[2] : doc.fashion_image, "base64");
    res.set("Content-Type", mime);
    res.set("Cache-Control", "public, max-age=3600");
    res.send(buf);
  } catch (err) {
    console.error(err);
    res.status(500).send("Lỗi truy vấn MongoDB: " + err.message);
  }
});

// Gán IdF (số, duy nhất) cho các Fashion chưa có, bắt đầu từ max(IdF)+1
async function ensureIdF() {
  const col = fashionCollection();
  const last = await col.find({ IdF: { $exists: true } }).sort({ IdF: -1 }).limit(1).toArray();
  let next = last.length ? last[0].IdF + 1 : 1;
  const missing = await col.find({ IdF: { $exists: false } }, { projection: { _id: 1 } }).sort({ _id: 1 }).toArray();
  for (const d of missing) {
    await col.updateOne({ _id: d._id }, { $set: { IdF: next++ } });
  }
  await col.createIndex({ IdF: 1 }, { unique: true });
  if (missing.length) console.log(`Đã gán IdF cho ${missing.length} Fashion`);
}

// Gán ngày tạo (created_date) cho Fashion chưa có, lấy từ thời điểm sinh ra ObjectId
async function ensureCreatedDate() {
  const col = fashionCollection();
  const missing = await col.find({ created_date: { $exists: false } }, { projection: { _id: 1 } }).toArray();
  for (const d of missing) {
    await col.updateOne({ _id: d._id }, { $set: { created_date: d._id.getTimestamp() } });
  }
  if (missing.length) console.log(`Đã gán created_date cho ${missing.length} Fashion`);
}

client.connect().then(ensureIdF).then(ensureCreatedDate).then(() => {
  console.log("Đã kết nối MongoDB");
  app.listen(port, () => {
    console.log(`My Server listening on port ${port}`)
  });
}).catch((err) => console.error("Không kết nối được MongoDB:", err));

app.post("/fashions", cors(), async (req, res) => {
  try {
    const fashion = {
      style: String(req.body.style || "").trim(),
      fashion_subject: String(req.body.fashion_subject || "").trim(),
      fashion_detail: String(req.body.fashion_detail || "").trim(),
      fashion_image: String(req.body.fashion_image || ""),
      created_date: new Date(),
    };

    if (!fashion.style || !fashion.fashion_subject || !fashion.fashion_detail) {
      return res.status(400).send("Thiếu style, fashion_subject hoặc fashion_detail");
    }

    const result = await fashionCollection().insertOne(fashion);
    res.status(201).send({ ...fashion, _id: result.insertedId });
  } catch (err) {
    console.error("Lỗi thêm Fashion:", err);
    res.status(500).send("Lỗi thêm Fashion vào MongoDB: " + err.message);
  }
});

app.put("/fashions", cors(), async (req, res) => {
  try {
    if (!ObjectId.isValid(req.body._id)) {
      return res.status(400).send("ObjectId không hợp lệ");
    }

    const id = new ObjectId(req.body._id);
    const update = {
      style: String(req.body.style || "").trim(),
      fashion_subject: String(req.body.fashion_subject || "").trim(),
      fashion_detail: String(req.body.fashion_detail || "").trim(),
      fashion_image: String(req.body.fashion_image || ""),
    };

    if (!update.style || !update.fashion_subject || !update.fashion_detail) {
      return res.status(400).send("Thiếu style, fashion_subject hoặc fashion_detail");
    }

    const result = await fashionCollection().updateOne(
      { _id: id },
      { $set: update }
    );

    if (result.matchedCount === 0) {
      return res.status(404).send("Không tìm thấy Fashion");
    }

    const fashion = await fashionCollection().findOne({ _id: id });
    res.send(fashion);
  } catch (err) {
    console.error("Lỗi cập nhật Fashion:", err);
    res.status(500).send("Lỗi cập nhật Fashion trong MongoDB: " + err.message);
  }
});

app.delete("/fashions/:id", cors(), async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).send("ObjectId không hợp lệ");
    }

    const result = await fashionCollection().deleteOne({
      _id: new ObjectId(req.params.id),
    });

    if (result.deletedCount === 0) {
      return res.status(404).send("Không tìm thấy Fashion");
    }

    res.status(204).send();
  } catch (err) {
    console.error("Lỗi xóa Fashion:", err);
    res.status(500).send("Lỗi xóa Fashion trong MongoDB: " + err.message);
  }
  app.delete("/fashions/:id",cors(),async(req,res)=>{   
    //find detail Fashion with id
    var o_id = new ObjectId(req.params["id"]);
    const result = await fashionCollection.find({_id:o_id}).toArray(); 
    //update json Fashion into database
    await fashionCollection.deleteOne(
        {_id:o_id}
        )
    //send Fashion after remove
    res.send(result[0])
})

});
