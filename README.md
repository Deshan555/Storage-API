
# 🚀📂 File Upload and Download Service
This is a simple Express.js application that handles file uploads and downloads. It uses the Multer middleware for handling `multipart/form-data`, which is primarily used for uploading files.

## 📦 Dependencies

The project uses the following dependencies:

- body-parser: ^1.20.2
- cors: ^2.8.5
- dotenv: ^16.3.1
- express: ^4.18.2
- log4js: ^6.9.1
- morgan: ^1.10.0
- multer: ^1.4.5-lts.1
- nodemon: ^3.0.2
- uuid: ^9.0.1

## 🛠️ Installation

To install the dependencies, run the following command:

```bash
npm install
```

## 📚 Usage

### 📤 File Upload

To upload a file, make a POST request to the `/upload` endpoint with the file in the form-data under the key 'file'.

```bash
curl -X POST -F "file=@<FILE_PATH>" http://localhost:3002/upload
```

The response will be a JSON object with details about the uploaded file and a download link:

```json
{
    "success": true,
    "message": "File uploaded successfully",
    "traceId": "c4c4128b-3b1f-4651-9e3e-f72f9444408a",
    "responseTime": "2024-01-15T10:52:18.360Z",
    "data": {
        "file": {
            "fieldname": "file",
            "originalname": "pic.png",
            "encoding": "7bit",
            "mimetype": "image/png",
            "destination": "uploads/images",
            "filename": "pic-1705315938333.png",
            "path": "uploads\\images\\pic-1705315938333.png",
            "size": 14685
        },
        "downloadLink": "http://localhost:3002/thaprobane/files/v01/download/pic-1705315938333.png"
    }
}
```

### 📥 File Download

To download a file, make a GET request to the `/download/:filename` endpoint with the filename as a parameter.

```bash
curl -O http://localhost:3002/download/<FILENAME>
```

Replace `<FILENAME>` with the name of the file you want to download.

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

[MIT](https://choosealicense.com/licenses/mit/)
