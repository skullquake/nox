try{
	var t0=new Date();
	//usrdata=undefined;
	var usrdata=typeof(usrdata)=='undefined'?{
		session:{
			username:'foo',
			created:new Date().getTime()
		},
		pagestate:{
			currentpage:"/"
		}
	}:usrdata;
	console.log(JSON.stringify(usrdata,0,' '));
	Duktape.modSearch=function(id){
		res=readFile('./lib/'+id+'.js');
		res=new TextDecoder("utf-8").decode(res);
		if(typeof res==='string') {
			return res;
		}
		new Error('module not found: '+id);
	}
	var tpl_page=new TextDecoder("utf-8").decode(readFile('./res/tpl/page.html'));
	var tpl_menu=new TextDecoder("utf-8").decode(readFile('./res/tpl/menu.html'));
	var tpl_contents=new TextDecoder("utf-8").decode(readFile('./res/tpl/contents.html'));
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
				"Base64 Image [/inline] <br/><br/><%- contentsB64 %><br/>"+
				"Binary Image [/duk] <br/><br/><%- contentsBIN %>"
			)
			.replace(
				"<%- contentsB64 %>",
				'<img src="data:image/jpeg;base64,'+Duktape.enc('base64',readFile('./res/img/a.png'))+'"></img>'
			)
			.replace(
				"<%- contentsBIN %>",
				'<img src="/duk?src=./res/cjs/resbin.js"></img>'
			)
		)
	;
	var t1=new Date();
	console.log("Template time: "+(t1-t0)/1000+" s");
	_response.setHeader("Content-type","text/html");
	_response.write(
		ret
	);
}catch(e){
	writeHttpResponse(
		response,
		e.toString()
	);
}
