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
			console.log('1');
			var cpr=require('cjs/cpr/cpr.js');
			var res=cpr.get(id.split('?')[0]).bod;
			console.log(res);
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
	console.log(0);
	var _=require(
		//'cjs/lodash/lodash.js'
		//'https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.15/lodash.core.js'
		'http://192.168.2.228:8081/lodash.js'
	);
	console.log(1);
	console.log(_);
	log("Loaded modules:");
	log(Duktape.modLoaded);
	log('end');
}catch(e){
	console.error(e);
}
