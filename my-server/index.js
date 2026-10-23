const express=require("express")
const app=express()
const port=3000
const morgan=require("morgan")
app.use(morgan("combined"))

const path=require("path")
const fs=require("fs")
app.use(express.static(path.join(__dirname,"public")))

const cors=require("cors")
app.use(cors())
const bodyParser=require("body-parser")
app.use(bodyParser.json({limit:'50mb'}))
app.use(bodyParser.urlencoded({limit:'50mb', extended:true}))


//create default API
app.get("/",(req,res)=>{
    res.send("Hello Restful API")
})
app.get("/about",(req,res)=>{
    res.send("<font color='red'>Bạn muốn vào About@@@@@@</font>")
})

let  database=[
    {"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản","Price":70,"Image":"b1.png"},
    {"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao","Price":100,"Image":"b2.png"},
    {"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Image":"b3.png"},
    {"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Image":"b4.png"},
    {"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Image":"b5.png"},
  ]

app.get("/books",(req,res)=>{
    res.send(database)
})

// Lưu ý: route filter phải đặt TRƯỚC /books/:id, nếu không "filter" sẽ bị hiểu nhầm là :id
app.get("/books/filter/price",(req,res)=>{
    let minPrice=req.query.min;
    let maxPrice=req.query.max;
    if(!minPrice || !maxPrice){
        return res.status(400).send("Vui lòng cung cấp đầy đủ tham số ?min=...&max=...");
    }
    let min=parseFloat(minPrice);
    let max=parseFloat(maxPrice);
    let filteredBooks=database.filter(x=>x.Price>=min && x.Price<=max);
    res.send(filteredBooks);
})

app.get("/books/:id",(req,res)=>{
    id=req.params.id
    let book=database.find(b=>b.BookId==id)
    res.send(book)
})

app.post("/books",(req,res)=>{
    let newBook=req.body;
    if(newBook.ImageBase64){
        // Tách bỏ phần header của Base64 (ví dụ: "data:image/png;base64,")
        const base64Data=newBook.ImageBase64.replace(/^data:image\/\w+;base64,/, "");
        const fileName=`${newBook.BookId}.png`;
        const destPath=path.join(__dirname, 'public', 'images', fileName);
        try{
            fs.writeFileSync(destPath, base64Data, 'base64');
            newBook.Image=fileName;
        } catch(error){
            return res.status(500).send("Lỗi lưu ảnh Base64");
        }
        delete newBook.ImageBase64;
    }
    database.push(newBook);
    res.send(database);
})

app.put("/books",(req,res)=>{
    let updatedBook=req.body;
    const index=database.findIndex(x=>x.BookId===updatedBook.BookId);
    if(index===-1){
        return res.status(404).send("Book not found!");
    }
    if(updatedBook.ImageBase64){
        const base64Data=updatedBook.ImageBase64.replace(/^data:image\/\w+;base64,/, "");
        const fileName=`${updatedBook.BookId}_${Date.now()}.png`;
        const destPath=path.join(__dirname, 'public', 'images', fileName);
        try{
            fs.writeFileSync(destPath, base64Data, 'base64');
            updatedBook.Image=fileName;
        } catch(error){
            return res.status(500).send("Error saving Base64 image!");
        }
        delete updatedBook.ImageBase64;
    } else {
        // Không có ảnh mới -> giữ tên ảnh cũ
        updatedBook.Image=database[index].Image;
    }
    database[index]=updatedBook;
    res.send(database);
})

app.delete("/books/:id",(req,res)=>{
    id=req.params.id
    database=database.filter(x=>x.BookId!==id);
    res.send(database)
})

app.listen(port,()=>{
    console.log(`My Server listening on port ${port}`)
})
