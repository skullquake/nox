console.log(new Date().getTime()+' cjs/ctl/home.js: creating main handler...');
/*
console.log(new Date().getTime()+' cjs/ctl/home.js: creating main handler...');
console.log(new Date().getTime()+' cjs/ctl/home.js: starting...');

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

Duktape.modLoaded={};//unload mods

mainHdl=require('cjs/ctl/main.js');//?cachebust='+new Date().getTime());
console.log(mainHdl)
console.log(mainHdl.foo)
console.log(mainHdl.bar)
console.log(mainHdl.baz)
console.log(Duktape.modLoaded);
//var hdl=typeof(hdl)=='undefined'?new Hdl:hdl;
//console.log(new Date().getTime()+' cjs/ctl/home.js: done creating main handler...');
//console.log(new Date().getTime()+' cjs/ctl/home.js: executing main handler...');
//hdl.exec();
//console.log(new Date().getTime()+' cjs/ctl/home.js: done executing main handler...');
console.log(new Date().getTime()+" cjs/ctl/home.js:")
console.log(JSON.stringify(Duktape.modLoaded));
console.log(new Date().getTime()+' cjs/ctl/home.js: ending...');
*/
