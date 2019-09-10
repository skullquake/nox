console.log(new Date().getTime()+' cjs/ctl/home.js: starting...');
Duktape.modSearch=function(id){
	//res=readFile('res/'+id+'.js');//regular
	res=readFile('res/'+id.split('?')[0]);//cachebusted
	res=new TextDecoder("utf-8").decode(res);
	if(typeof res==='string')
		return res;
	new Error('module not found: '+id);
};
console.log(new Date().getTime()+' cjs/ctl/home.js: creating main handler...');
Duktape.modLoaded={};//unload mods
mainHdl=require('cjs/ctl/main.js');//?cachebust='+new Date().getTime());
console.log(mainHdl.filename)
//var hdl=typeof(hdl)=='undefined'?new Hdl:hdl;
//console.log(new Date().getTime()+' cjs/ctl/home.js: done creating main handler...');
//console.log(new Date().getTime()+' cjs/ctl/home.js: executing main handler...');
//hdl.exec();
//console.log(new Date().getTime()+' cjs/ctl/home.js: done executing main handler...');
console.log(new Date().getTime()+" cjs/ctl/home.js:")
console.log(JSON.stringify(Duktape.modLoaded));
console.log(new Date().getTime()+' cjs/ctl/home.js: ending...');
