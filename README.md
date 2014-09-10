grunt-replace-configvalues
==========================

Replace values in a config.js file by grunt.

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

Hope it helps you.

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


Limitations
---------------

*  This tool only works if the start of the config file starts with:

```javascript
   module.exports = 
```

*  At this time, there is no way to set the config parameter inside of the Gruntfile.js. Just --conf:_key_=_value_ works in this version.