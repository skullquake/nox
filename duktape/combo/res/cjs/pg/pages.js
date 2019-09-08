module.exports={
	nav:function(usrdata){
		if(usrdata.state.page!=null){
			if(this[usrdata.state.page]!=null){
				try{
					this[usrdata.state.page](usrdata);
				}catch(e){
					console.log('Navigation error:');
					console.log(e);
					this.home(usrdata);
				}
			}else{
				console.log('Navigation error: page not defined');
				this.home(usrdata);
			}
		}else{
			console.log('Navigation error: usrdata.state.page NULL');
			this.home(usrdata);
		}
	},
	home:function(usrdata){
		try{
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
						"HOME"
					)
					.replace(
						'<%- contents %>',
						'<div class="container">'+
						'	<div class="row">'+
						'		<div class="col-sm-8"><%- col2 %></div>'+
						'		<div class="col-sm-4"><%- col1 %></div>'+
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
					""//window.history.pushState('Home', 'Home', '/');"
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
	},
	login:function(usrdata){
		try{
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
						"LOGIN "
					)
					.replace(
						'<%- contents %>',
						'<div class="container">'+
						'	<div class="row">'+
						'		<div class="col-sm-8"><%- col2 %></div>'+
						'		<div class="col-sm-4"><%- col1 %></div>'+
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
					""//window.history.pushState('Home', 'Home', '/');"
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
	},

}

