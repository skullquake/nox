try{
	Duktape.modSearch=function(id){
		res=readFile('./lib/'+id+'.js');
		res=new TextDecoder("utf-8").decode(res);
		if(typeof res==='string') {
			return res;
		}
		new Error('module not found: '+id);
	}
	var _=typeof(_)!='undefined'?_:require('lodash/4.17.15/full/lodash');
}catch(e){
	console.log(e);
}
