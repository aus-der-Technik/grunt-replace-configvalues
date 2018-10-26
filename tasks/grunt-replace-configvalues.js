'use strict';

var _       = require('underscore')
    , S     = require("string")
    , fs    = require("fs")
    ;

module.exports = function (grunt) {
    
    var selectPathAndReplaceWith = function selectPath(obj, path, replm){
        var cur = obj;
        var parts = path.split(".");
        var last = parts.pop();
        var depth = 0;
        _.each(parts, function(part){
        	try { 
        		if(cur[part] === null ){
        			if(depth > 0 ){
	        			cur[part] = {};
    	    		} else {
	    	    		depth = -1;
	     		   		return;
	     	   		}
	        	}
        	} catch (e){ return; }
        	++depth;
            cur = cur[part];
        });
        if(depth === -1){ return; }
        
        try {
            replm = JSON.parse(replm)   
        } catch(e) { replm = replm; }
        
        if(_.has(cur, last)){
            console.log("Replace "+ last +" with "+ replm);
            cur[last] = replm;
        } else {
        	if( cur === null || cur === undefined){ cur = {}; }
        	if(depth === (parts.length) && depth > 0){
	          console.log("Add "+ last +" with "+ replm);
	          if(cur[last] === null){ cur[last] = {}; }
     	      cur[last] = replm;
     	   }
        }
    }

    grunt.registerTask('configvalues', 'Replace config values.', function () {
        var options = this.options({
            src: ''
        });

        var confparam = _.compact(
            _.map(process.argv, function(elm){
                if(S(elm).startsWith("--conf:")){
                    return elm;
                }
            })
        );
        
        var conffiles = _.flatten(_.compact(
            _.map(process.argv, function(elm){
                if(S(elm).startsWith("--conffiles=")){
                    return elm.replace("--conffiles=", "").split(',');
                }
            })
        ));

        if(conffiles.length <= 0){
            conffiles = options.src
        }
        
        if(confparam.length > 0){
            if(typeof conffiles === 'string'){
                conffiles = [conffiles];
            }
            _.each(conffiles, function(src){
                var buildconf = require(process.cwd()+"/"+src);
                _.each(confparam, function(p){
                    var path = S(p).replace('--conf:', '').s;
                    var keyval = path.split("=");
                    var key = keyval.shift();
                    var value = keyval.join("=");
                    selectPathAndReplaceWith(buildconf, key, value);
                });
                var data = "";
                if(S(src).endsWith(".js")){
                    data =  "module.exports = "+ JSON.stringify(buildconf, null, 4);
                } else {
                    data =  JSON.stringify(buildconf, null, 4);
                }
                var err = fs.writeFileSync(
                      src
                    , data
                );
                 if(err) {
                    grunt.error(err);
                }               
            });         
        }
    })
};