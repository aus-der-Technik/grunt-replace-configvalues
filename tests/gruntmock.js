
var _       = require('underscore')
    ;

module.exports = {

    data: {},
    
    tasks: {},
    
    options: function(){},

    registerTask: function(name, descr, fn){
        this.tasks[name] = fn;
    }
    
};

module.exports.tasks.options = function(defaults){
    return _.extend(defaults, module.exports.data);
};

module.exports.set = function(key, value){
    this.data[key] = value; 
};