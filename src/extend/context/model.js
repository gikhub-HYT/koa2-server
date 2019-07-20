const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");

function resolve(...dir) {
    return path.join(__dirname, "../../", dir);
}



function loadModel(modelName) {
    const targetPath = path.resolve(process.cwd(), 'src/modules');
    const modelPath = path.resolve(`${targetPath}/${modelName}`, `${modelName}.model.js`)
    return require(modelPath);
}



module.exports = {
    findModel: function (modelName) {
        return loadModel(modelName);
    }
};
