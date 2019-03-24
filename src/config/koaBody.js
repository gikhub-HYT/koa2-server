module.exports = {
    multipart: true,
    formidable: {
        maxFileSize: 500 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    },
    jsonLimit: "20mb",
    formLimit: "1mb",
    textLimit: "1mb"
};
