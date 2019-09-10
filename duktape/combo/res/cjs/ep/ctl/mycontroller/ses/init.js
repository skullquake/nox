/*
 * session context initialization
 */

var log=function(a){console.log(new Date().getTime()+" cjs/ep/ctl/mycontroller/ses/init.js: "+a)};
log('start');
log('adding Duktape.modSearch...');
Duktape.modSearch=function(id){
	log("loading "+id);
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
log('done');
log('end');
