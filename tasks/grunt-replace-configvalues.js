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
		cur[last] = replm;
	}

    grunt.registerTask('configvalues', 'Replace config values.', function () {

		var options = this.options({
			src: ''
		});
    
		var confparam = _.compact(
			_.map(process.argv, function(elm){
				if(S(elm).startsWith("--conf")){
					return elm;
				}
			})
		);
		if(confparam.length > 0){
			var buildconf = require(process.cwd()+"/"+options.src);
			_.each(confparam, function(p){
				var path = S(p).replace('--conf:', '').s;
				var keyval = path.split("=");
				console.log("Replace "+ keyval[0] +" with "+ keyval[1]);
				selectPathAndReplaceWith(buildconf, keyval[0], keyval[1]);
			});
			fs.writeFile(options.src
				, "module.exports = "+ JSON.stringify(buildconf, null, 4)
				, function(err) {
				    if(err) {
				        grunt.error(err);
				    }
				}
			);
		}
    })
};