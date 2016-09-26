'use strict';

var _		= require('underscore')
	, S		= require("string")
	, fs	= require("fs")
	;

module.exports = function (grunt) {

	var selectPathAndReplaceWith = function selectPath(obj, path, replm){
		var cur = obj;
		var parts = path.split(".");
		var last = parts.pop();
		_.each(parts, function(part){
			cur = cur[part];
		});
		try {
			replm = JSON.parse(replm)	
		} catch(e) { replm = replm; }
		if(_.has(cur, last)){
			console.log("Replace "+ last +" with "+ replm);
			cur[last] = replm;
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
					
					selectPathAndReplaceWith(buildconf, keyval[0], keyval[1]);
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