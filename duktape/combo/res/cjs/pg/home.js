try{
	var t0=new Date();
	//usrdata=undefined;//reset
	function getQueryVariable(query,variable){
		var vars=query.split('&');
		for(var i=0;i<vars.length;i++){
			var pair=vars[i].split('=');
			if(decodeURIComponent(pair[0])==variable){
				return decodeURIComponent(pair[1]);
			}
		}
		return null;
	}
	function defaultUserData(){
		return {
			session:{
				username:'foo',
				created:new Date().getTime(),
				modified:new Date().getTime()
			},
			state:{
				currentpage:"/",
				lastaction:{}
			},
			data:{
				value:0,
				fname:'foo',
				lname:'bar'
			}
		};
	}
	console.log('----------------------------------------');
	console.log(request.getAllVariable());
	console.log('----------------------------------------');
	/*
	console.log(request);
	console.log(request.get('cmd',''));//second is fallback
	console.log(request.hasCookie('foo'));
	console.log(request.getCookie('foo',''));//second is fallback
	console.log(request.getHeaderKeyValue('User-Agent',null));//second is fallback
	console.log(request.getUrl());
	console.log(request.getMethod());
	*/
	var usrdata=typeof(usrdata)=='undefined'?defaultUserData():usrdata;
	usrdata.state.lastaction.url=request.getUrl();
	usrdata.state.lastaction.method=request.getMethod();
	usrdata.state.lastaction.cmd=request.get('cmd','');
	usrdata.state.lastaction.querystring=request.getQueryString();
	switch(request.get('cmd','')){
		case "increment":
			usrdata.data.value=usrdata.data.value+1;
			usrdata.session.modified=new Date().getTime();
			break;
		case "decrement":
			usrdata.data.value=usrdata.data.value-1;
			usrdata.session.modified=new Date().getTime();
			break;
		case "submit":
			//fname=&lname=
			var fname=getQueryVariable(request.getQueryString(),'fname');
			var lname=getQueryVariable(request.getQueryString(),'lname');
			console.log(fname);
			console.log(lname);
			usrdata.data.fname=fname;
			usrdata.data.lname=lname;
			usrdata.session.modified=new Date().getTime();
			break;
		default:
			console.log("invalid command");
	};
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
	var tpl_card=new TextDecoder("utf-8").decode(readFile('./res/tpl/card.html'));
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
				'<%- contents %>',
				'<div class="container">'+
				'	<div class="row">'+
				'		<div class="col-sm-4"><%- col1 %></div>'+
				'		<div class="col-sm-8"><%- col2 %></div>'+
				'	</div>'+
				'</div>'
			)
			.replace("<%- col1 %>",tpl_card)
			.replace("<%- header %>","User Data")
			.replace("<%- title %>","Session")
			.replace("<%- text %>",(
				'<code><pre><%- json %></pre></code>'
				.replace(
					'<%- json %>',
					JSON.stringify(usrdata,0,' '))
				)
			)
			.replace("<%- col2 %>",tpl_card)
			.replace("<%- header %>","Controls")
			.replace("<%- title %>","Session Data Manipulation")
			.replace("<%- text %>",
				(
					'<div>'+
					'	<h6>'+
					'		<%- value >'+
					'	</h6>'+
					'</div>'
				)
				.replace(
					'<%- value >',
					usrdata.data.value
				)+
				'<div class="btn-group">'+
				'	<a class="btn btn-default" href="/?cmd=decrement">Decrement</a>'+
				'	<a class="btn btn-default" href="/?cmd=increment">Increment</a>'+
				'</div>'+
				(
					(
						'<form action="/" method="get">'+
						'	First name: <input class="form-control" type="text" name="fname" value="<%- fname %>"><br>'+
						'	Last name: <input class="form-control" type="text" name="lname" value="<%- lname %>"><br>'+
						'	<input type="submit" class="btn btn-default" value="Submit">'+
						'	<input type="hidden" name="cmd" value="submit" />'+
						'</form> '
					)
					.replace("<%- fname %>",usrdata.data.fname)
					.replace("<%- lname %>",usrdata.data.lname)
				)
			)
		)
		.replace(
			"<%- script %>",
			"window.history.pushState('Home', 'Home', '/');"
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
