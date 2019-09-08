try{
	var t0=new Date();
	Duktape.modSearch=function(id){
		console.log('a');
		//res=readFile('res/'+id+'.js');//regular
		res=readFile('res/'+id.split('?')[0]);//cachebusted
		res=new TextDecoder("utf-8").decode(res);
		if(typeof res==='string')
			return res;
		new Error('module not found: '+id);
	}
	var usr=require('cjs/usr/usr.js?cachebust="='+new Date().getTime());
	var pages=require('cjs/pg/pages.js?cachebust="='+new Date().getTime());
	//usrdata=undefined;//reset
	var usrdata=typeof(usrdata)=='undefined'?usr.prep():usrdata;
	usrdata=usr.proc(usrdata);
	pages.nav(usrdata);
}catch(e){
	writeHttpResponse(
		response,
		e.toString()
	);
}
