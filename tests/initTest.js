
var   assert        = require("assert")
    , chai          = require("chai")
    , expect        = chai.expect
    , grunt         = require(__dirname +"/gruntmock")
    , fs            = require('fs-extra')
    , S             = require('string')
    ;


describe('Replace Config Values', function(){

    var opt = function(){
    
    };

    before(function(done){
        require(__dirname +"/../tasks/grunt-replace-configvalues")(grunt, opt);
        fs.mkdirs(__dirname +'/tmp', function (err) {
            fs.copy(__dirname +'/testfiles', __dirname +'/tmp', function (err) {
                done();
            });
        });
    });
    
    after(function(done){
        fs.remove(__dirname +'/tmp', function (err) {
            expect(err).to.be.null;
            done();
        });
    });

    it('should be loadable', function(done){
        expect(grunt.tasks).to.have.property('configvalues');
        done();
    });
    
    it('should replace a simple string in js file', function(done){
        process.argv.push('--conf:key=newvalue');
        grunt.set('src',  'tests/tmp/string.js');
        grunt.tasks.configvalues();
        fs.readFile(__dirname +'/tmp/string.js', function(err, data){
            expect(err).to.be.null;
            expect(data.toString()).to.contains('newvalue');
            expect(data.toString()).to.contains('module.exports');
            done();
        });
    });

    it('should replace a simple string in json file', function(done){
        process.argv.push('--conf:key=newvalue');
        grunt.set('src',  'tests/tmp/string.json');
        grunt.tasks.configvalues();
        fs.readFile(__dirname +'/tmp/string.json', function(err, data){
            expect(err).to.be.null;
            expect(data.toString()).to.contains('"newvalue"');
            expect(data.toString()).not.to.contains('module.exports');
            done();
        });
    });
    
    it('should replace a simple number in json file', function(done){
        process.argv.push('--conf:count=1');
        grunt.set('src',  'tests/tmp/number.json');
        grunt.tasks.configvalues();
        fs.readFile(__dirname +'/tmp/number.json', function(err, data){
            expect(err).to.be.null;
            var result = require(__dirname +'/tmp/number.json');
            expect(data.toString()).to.contains(1);
            expect(data.toString()).not.to.contains('"1"');
            expect(result.count).to.be.a('number');
            expect(result.count).to.be.equal(1);
            done();
        });
    });
    
    it('should replace a simple bool in json file', function(done){
        process.argv.push('--conf:should=true');
        grunt.set('src',  'tests/tmp/bool.json');
        grunt.tasks.configvalues();
        fs.readFile(__dirname +'/tmp/bool.json', function(err, data){
            expect(err).to.be.null;
            var result = require(__dirname +'/tmp/bool.json');
            expect(result.should).to.be.a('boolean');
            expect(result.should).to.be.equal(true);
            done();
        });
    });
    
    it('should replace a simple object in json file', function(done){
        process.argv.push('--conf:obj={"a": 1}');
        grunt.set('src',  'tests/tmp/object.json');
        grunt.tasks.configvalues();
        fs.readFile(__dirname +'/tmp/object.json', function(err, data){
            expect(err).to.be.null;
            var result = require(__dirname +'/tmp/object.json');
            expect(result.obj).to.be.a('object');
            expect(result.obj).to.have.property("a");
            expect(result.obj.a).to.be.equals(1);
            done();
        });
    });     
    
    it('should replace a simple array in json file', function(done){
        process.argv.push('--conf:arr=["hund", "katze", "maus"]');
        grunt.set('src',  'tests/tmp/array.json');
        grunt.tasks.configvalues();
        fs.readFile(__dirname +'/tmp/array.json', function(err, data){
            expect(err).to.be.null;
            var result = require(__dirname +'/tmp/array.json');
            expect(result.arr).to.be.a('array');
            expect(result.arr).to.have.length(3);
            expect(result.arr[0]).to.be.equals("hund");
            done();
        });
    });
    
    it('should replace a string with a simple array in json file', function(done){
        process.argv.push('--conf:arr=["hund", "katze", "maus"]');
        grunt.set('src',  'tests/tmp/string2array.json');
        grunt.tasks.configvalues();
        fs.readFile(__dirname +'/tmp/string2array.json', function(err, data){
            expect(err).to.be.null;
            var result = require(__dirname +'/tmp/string2array.json');
            expect(result.arr).to.be.a('array');
            expect(result.arr).to.have.length(3);
            expect(result.arr[0]).to.be.equals("hund");
            done();
        });
    });     
    
});