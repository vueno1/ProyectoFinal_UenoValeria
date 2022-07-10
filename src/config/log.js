const log4js = require('log4js');

log4js.configure({
    appenders: {
        loggerConsole: {type: "console"}   
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


        todos: { 
            appenders: ["loggerConsole"], 
            level: "error" 
        }
    }
})

module.exports = log4js