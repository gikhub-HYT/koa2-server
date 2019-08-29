const path = require("path");

global.importModel = function (modelName) {
    return require(path.resolve(process.cwd(), `src/models/${modelName}.js`))
}

global.importSrc = function (filePath) {
    return require(path.resolve(process.cwd(), `src/${filePath}`))
}

global.importPlugin = function (pluginName) {
    return require(path.resolve(process.cwd(), `src/plugin/${pluginName}`))
}

global.importMiddlewares = function (pluginName) {
    return require(path.resolve(process.cwd(), `src/middlewares/${pluginName}`))
}

global.importService = function (serviceName) {
    return require(path.resolve(process.cwd(), `src/modules/${serviceName}.service.js`))

}