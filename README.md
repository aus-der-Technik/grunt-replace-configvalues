grunt-replace-configvalues
==========================

Replace values in a config.js or config.json file by grunt.

     **--conf:key.subkey=new_value**

Example:

```bash
grunt --conf:host.url=http://www.example.com \
      --conf:database.credentials.username=piere \
      --conf:database.credentials.password=quah4ies3Poo8
      
```

will replace the values in the config.js file:

```javascript
   module.exports = {
      host: {
         url: 'http://localhost'
      },
      database: {
         credentials: {
            username: 'noname',
            password: 'secret'
         }
      }
   }

```

to:

```javascript
   module.exports = {
      host: {
         url: 'http://www.example.com'
      },
      database: {
         credentials: {
            username: 'piere',
            password: 'quah4ies3Poo8'
         }
      }
   }

```

Why
---

This grunt task is build because configuration parameters are dynamic and will be set while 
ci-servers are build the projet. 
I always use local dev parameters inside the porojet and jenkis replace them with the correkt values 
for the stage and production cluster servers. 

Hope it helps you too to manage your project deployments from Jenkins or any other ci-server.

How
---

Install grunt-replace-configvalues:
 
```bash
   npm install grunt-replace-configvalues --save-dev
```

Than inside the Gruntfile.js:

```javascript

   // load the task
   grunt.loadNpmTasks('grunt-string-replace');

   // configure the task
   grunt.initConfig({
       	configvalues: {
		options: {
		   src: './config.js'
		}
	}	
   });  

   // and than run the task
   grunt.registerTask('default', ['configvalues']);
```

Multiple files are supported since Version 1.0.0:

```javascript

   // load the task
   grunt.loadNpmTasks('grunt-string-replace');

   // configure the task
   grunt.initConfig({
       	configvalues: {
		options: {
		   src: ['./config.js', './hosts.js']
		}
	}	
   });  

   // and than run the task
   grunt.registerTask('default', ['configvalues']);
```

You can replace json files in version 1.0.0, too:

```javascript

   // load the task
   grunt.loadNpmTasks('grunt-string-replace');

   // configure the task
   grunt.initConfig({
       	configvalues: {
		options: {
		   src: ['./config.js', './hosts.json']
		}
	}	
   });  

   // and than run the task
   grunt.registerTask('default', ['configvalues']);
```

If you have to set the file from the command line, you can do now with Version 1.0.0:

```
grunt --conf:host=127.0.0.1 --conffiles=hosts.js
```

Or even with a list of files: 

```
grunt --conf:host=127.0.0.1 --conffiles=hosts.js,config.json
```

Arrays
---------------
You can, replace a value with an array:

```
grunt --conf:hosts=["192.0.3.12", "192.0.3.13"]
```


Limitations
---------------

*  At this time, there is no way to set the config parameter inside of the Gruntfile.js. 
Just say --conf:_key_=_value_  at an argument of the grunt command line.


Donate 
---------------
If you like this module and want to say thanks, than please spend a tiny fraction of a 
BitCoin to: 1FaKEmpUz7S1g4v5qgmDWwQDzVYGBM6MLw

