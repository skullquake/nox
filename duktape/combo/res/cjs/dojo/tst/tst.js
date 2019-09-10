//https://wiki.duktape.org/howtomodules

var log=function(a){console.log(new Date().getTime()+" cjs/lodash/tst/tst.js:"+typeof(a)=='object'?JSON.stringify(a):a)};
try{
	log('start');
	Duktape.modLoaded={};//empty out
	Duktape.modSearch=function(id){
		if(
			id.indexOf('https:/')>-1|
			id.indexOf('http:/')>-1
		){
			var cpr=require('cjs/cpr/cpr.js');
			var res=cpr.get(id.split('?')[0]).bod;
			if(typeof res==='string')
				return res;
		}else{
			res=readFile('res/'+id.split('?')[0]);//cachebusted
			res=new TextDecoder("utf-8").decode(res);
			if(typeof res==='string')
				return res;
		}
		new log('module not found: '+id);
	};
this.dojoConfig = {
	packages: [
		{name: "dojo", location: "res/cjs/dojo"}
		//{name: "dijit", location: "./lib/dijit"}
	]
};

	var _=require(
		//"cjs/dojo/dojo.js"
		//'https://cdnjs.cloudflare.com/ajax/libs/dojo/1.10.4/_base/array.js'
	);
	console.log(typeof(define));
	console.log(this.dojo);
	log("Loaded modules:");
	log(Duktape.modLoaded);
	log('end');
}catch(e){
	console.error(e);
}
