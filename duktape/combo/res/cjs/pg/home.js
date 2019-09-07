try{
	var t0=new Date();
	Duktape.modSearch=function(id){
		res=readFile('./lib/'+id+'.js');
		res=new TextDecoder("utf-8").decode(res);
		if(typeof res==='string') {
			return res;
		}
		new Error('module not found: '+id);
	}
	var tpl_page=new TextDecoder("utf-8").decode(readFile('./res/lodash/page.html'));
	var tpl_menu=new TextDecoder("utf-8").decode(readFile('./res/lodash/menu.html'));
	var tpl_contents=new TextDecoder("utf-8").decode(readFile('./res/lodash/contents.html'));
	var ret=
		tpl_page
		.replace(
			"<%- menu %>",
			tpl_menu
		)
		.replace(
			"<%- contents %>",
			tpl_contents
			.replace(
				"<%- title %>",
				"TEST TITLE"
			)
			.replace(
				"<%- contents %>",
				"Lorem ipsum"
			)
		)
	;
	var t1=new Date();
	console.log("Template time: "+(t1-t0)/1000+" s");
	writeHttpResponse(
		response,
		ret
	);
}catch(e){
	writeHttpResponse(
		response,
		e.toString()
	);
}
