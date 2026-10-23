# Bài 58 - Fashion tổng hợp

## Cấu trúc

- `server-fashion`: Express/MongoDB API, port `4000`
- `admin-fashion`: Angular Admin, port `4001`
- `client-fashion`: Angular Client, port `4002`

Cả hai ứng dụng Angular dùng chung API và database MongoDB hiện có:

- Database: `FashionData`
- Collection: `Fashion`
- MongoDB URL: `mongodb://127.0.0.1:27017`

## Cấu trúc document Fashion

```json
{
  "_id": "MongoDB tự tạo",
  "style": "Street Style",
  "fashion_subject": "Tiêu đề Fashion",
  "fashion_detail": "<p>Nội dung HTML từ WYSIWYG editor</p>",
  "fashion_image": "data:image/png;base64,...",
  "created_date": "2026-10-23T00:00:00.000Z"
}
```

Các document cũ thiếu `created_date` hoặc `IdF` sẽ được server bổ sung khi khởi động.

## Chạy bài

Mở ba terminal:

```powershell
cd bai58/server-fashion
npm install
npm start
```

```powershell
cd bai58/admin-fashion
npm install
npm start
```

```powershell
cd bai58/client-fashion
npm install
npm start
```

Địa chỉ:

- API: `http://localhost:4000`
- Admin: `http://localhost:4001/fashion-admin`
- Client: `http://localhost:4002/bai58`

## API

```text
GET    /fashions
GET    /fashions?style=Street%20Style
GET    /fashions/:id
POST   /fashions
PUT    /fashions
DELETE /fashions/:id
GET    /fashions/:id/image
```

