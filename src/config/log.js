const log4js = require('log4js');

log4js.configure({
    appenders: {
        loggerConsole: {type: "console"},
        miLoggerFile: {type:"file",  filename: "warn.log"},
        miLoggerFile2: {type: "file", filename: "error.log"}    
    },

    categories: {   
        default: { 
            appenders: ["loggerConsole"], 
            level: "trace" 
        },

        consola: { 
            appenders: ["loggerConsole"], 
            level: "debug" 
        },

        archivo: { 
            appenders: ["miLoggerFile"], 
            level: "warn" 
        },

        archivo2: { 
            appenders: ["miLoggerFile2"], 
            level: "error" 
        },

        todos: { 
            appenders: ["loggerConsole", "miLoggerFile"], 
            level: "error" 
        }
    }
})

module.exports = log4js