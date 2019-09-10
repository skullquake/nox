module.exports={
	ver:function(p){
		console.log(new Date().getTime()+" cjs/util/duk.js:connect()...starting");
		console.log(new Date().getTime()+" cjs/util/duk.js:connect()...ending");
	},
	dump:function(){
		console.log(new Date().getTime()+" cjs/util/duk.js:dump()...starting");
		var i,t;
		for(i=-1;;i--){
			t=Duktape.act(i);
			if(!t){break;}
				print(i,t.lineNumber,t.function.name,Duktape.enc('jx',t));
		}
		console.log(new Date().getTime()+" cjs/util/duk.js:dump()...ending");
	}
}
