module.exports={
	nav:function(usrdata){
		if(usrdata.state.page!=null){
			if(this[usrdata.state.page]!=null){
				try{
					//this[usrdata.state.page](usrdata);
					//bump clearance
					if(
						usrdata.state.clearancelevel
						>=
						this._menuitems[usrdata.state.page].clearancelevel
					){
						this['_buildpage'](usrdata,this[usrdata.state.page]);
					}else{
						this['_buildpage'](usrdata,this['login']);
					}
				}catch(e){
					console.log('Navigation error:');
					console.log(e);
					if(
						usrdata.state.clearancelevel
						>=
						this._menuitems['home'].clearancelevel
					){
						this['_buildpage'](usrdata,this['home']);
					}else{
						this['_buildpage'](usrdata,this['login']);
					}
				}
			}else{
				console.log('Navigation error: page not defined');
				this['_buildpage'](usrdata,this['login']);
			}
		}else{
			console.log('Navigation error: usrdata.state.page NULL');
			this['_buildpage'](usrdata,this['login']);
		}
	},
	_menuitems:{
		"home":{
			"clearancelevel":1,
			"url":"/?cmd=home",
			"title":"Home"
		},
		"usr":{
			"clearancelevel":1,
			"url":"/?cmd=usr",
			"title":"User"
		},
		"usrrst":{
			"clearancelevel":1,
			"url":"/?cmd=usrrst",
			"title":"Reset User Data"
		},
		"dbls":{
			"clearancelevel":1,
			"url":"/?cmd=dbls",
			"title":"Database"
		},
		"dbdel":{
			"clearancelevel":1,
			"url":"/?cmd=dbdel",
			"title":"Database Delete"
		},
		"dbins":{
			"clearancelevel":1,
			"url":"/?cmd=dbins",
			"title":"Database Insert"
		},
		"login":{
			"clearancelevel":0,
			"clearancelogic":"exact",
			"url":"/?cmd=login",
			"title":"Login"
		},
		"logout":{
			"clearancelevel":1,
			"url":"/?cmd=logout",
			"title":"Logout"
		}

	},
	_buildmenu:function(usrdata){
		var ret='';
		var ctx=this;
		Object.keys(this._menuitems).forEach(
			function(m,midx){
				if(
					usrdata.state.clearancelevel>=ctx._menuitems[m].clearancelevel
				){
					if(ctx._menuitems[m].clearancelogic!=null){
						if(ctx._menuitems[m].clearancelogic=="exact"){
							if(usrdata.state.clearancelevel==ctx._menuitems[m].clearancelevel){
								ret+='<li><a class="nav-link" href="'+ctx._menuitems[m].url+'">'+ctx._menuitems[m].title+'</a></li>'
							}else{
							}
						}
					}else{
						ret+='<li><a class="nav-link" href="'+ctx._menuitems[m].url+'">'+ctx._menuitems[m].title+'</a></li>'
					}
				}
			}
		);
		return ret;
	},
	_buildpage:function(usrdata,cb){
		try{
			var tpl_page=new TextDecoder("utf-8").decode(readFile('./res/tpl/page.html'));
			var tpl_menu=new TextDecoder("utf-8").decode(readFile('./res/tpl/_menu.html'));
			var ret=
				tpl_page
				.replace(
					"<%- menu %>",
					tpl_menu
					.replace(
						"<%- contents %>",
						this._buildmenu(usrdata)
					)
				)
				.replace(
					"<%- contents %>",
					cb(usrdata,new TextDecoder("utf-8").decode(readFile('./res/tpl/contents.html')))
				)
				.replace(
					"<%- script %>",
					''
				)
			;
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
	_buildtable:function(jsondata){
		var ret='';
		ret+=
			'<table class="table table-striped table-sm">\n'+
			'	<tr>\n'+
			'		<td>\n'+
			'			test\n'+
			'		<td>\n'+
			'	</tr>\n'+
			'</table>\n'
		;
		return ret;
	},
	_dbselect:function(s){
		//todo: move to db folder
	},
	home:function(usrdata,tpl_contents){
		try{
			var ret=
			tpl_contents
				.replace(
					"<%- title %>",
					"Home"
				)
				.replace(
					'<%- contents %>',
					'<div class="container"><div class="row"><div class="col-md-12"><%- contents %></div></div></div>'
				)
				.replace(
					'<%- contents %>',
					'<h3> Welcome <%- fname %> <%- lname %>'
				)
				.replace("<%- fname %>",usrdata.data.fname)
				.replace("<%- lname %>",usrdata.data.lname)
			;
			return ret;
		}catch(e){
			writeHttpResponse(
				response,
				e.toString()
			);
		}
	},
	login:function(usrdata,tpl_contents){
		try{
			var ret=
				tpl_contents
					.replace(
						"<%- title %>",
						"Login"
					)
					.replace(
						'<%- contents %>',
						(
							(
								'<div class="container">'+
								'	<div class="row">'+
								'		<div class="col-md-12">'+
								'			<form action="/" method="get">'+
								'				Login : <input class="form-control" type="text" name="login" value="<%- login %>"><br>'+
								'				Password : <input class="form-control" type="password" name="pass" value="<%- pass %>"><br>'+
								'				<input type="submit" class="btn btn-default" value="Login">'+
								'				<input type="hidden" name="cmd" value="login" />'+
								'			</form>'+
								'		</div>'+
								'	</div>'+
								'</div>'
							)
							.replace("<%- login %>",usrdata.data.login)
							.replace("<%- pass %>",usrdata.data.pass)
						)
					)
			;
			return ret;
		}catch(e){
			writeHttpResponse(
				response,
				e.toString()
			);
		}
	},
	usr:function(usrdata,tpl_contents){
		try{
			var tpl_card=new TextDecoder("utf-8").decode(readFile('./res/tpl/card.html'));
			var ret=
					tpl_contents
					.replace(
						"<%- title %>",
						"Test Page"
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
			;
			return ret;
		}catch(e){
			writeHttpResponse(
				response,
				e.toString()
			);
		}
	},
	dbls:function(usrdata,tpl_contents){
		var ret=''
		try{
			ret=tpl_contents
				.replace(
					"<%- title %>",
					"Database - Select Test"
				)
				.replace(
					'<%- contents %>',
					'<div class="container"><div class="row"><div class="col-md-12"><%- contents %></div></div></div>'
				)
				.replace(
					'<%- contents %>',
					//todo move to controller script/restructure
					function(){
						var str_contents=''
						//table data stored in usrdata.data.select
						if(usrdata.data!=null&&usrdata.data.select!=null){
							try{
								str_contents+='<table class="table table-striped table-sm">\n';
								usrdata.data.select.forEach(
									function(row,rowidx){
										str_contents+='\t<tr>\n';
										var line='';
										row.forEach(
											function(col,colidx){
												line+=(col);
												colidx==row.length-1?null:line+='\t';
												str_contents+='\t\t<td>\n';
												str_contents+='\t\t\t'+col+'\n';
												str_contents+='\t\t</td>\n';
											}
										);
										str_contents+='\t</tr>\n';
									}
								);
								str_contents+='</table>\n';
							}catch(e){
								str_contents='<div class="alert alert-danger">usrdata.data.select NULL</div>';
							}
						}else{
							str_contents='<div class="alert alert-danger">usrdata.data.select NULL</div>';
						}
						return str_contents
					}()
				)
			;
			return ret;
		}catch(e){
			return (e.toString());
			console.error(e.toString());
		}
	}

}

