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
					console.log(e.toString());
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
		/*
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
		*/
		"dbusr":{
			"clearancelevel":1,
			"url":"/?cmd=dbusr",
			"title":"Users"
		},
		"mgses":{
			"clearancelevel":1,
			"url":"/?cmd=mgses",
			"title":"Sessions"
		},
		"apod":{
			"clearancelevel":1,
			"url":"/?cmd=apod",
			"title":"APOD"
		},
		"insight_weather":{
			"clearancelevel":1,
			"url":"/?cmd=insight_weather",
			"title":"Insight Weather"
		},
		"pgcapfin":{
			"clearancelevel":1,
			"url":"/?cmd=pgcapfin",
			"title":"Capfin"
		},
		"pgcapfincreate":{
			"clearancelevel":1,
			"url":"/?cmd=pgcapfin",
			"title":"Capfin Create",
			"hidden":true
		},
		/*
		"dbusrdel":{
			"clearancelevel":1,
			"url":"/?cmd=dbusrdel",
			"title":"Delete Users"
		},
		*/
		"pg_login":{
			"clearancelevel":0,
			"clearancelogic":"exact",
			"url":"/?cmd=pg_login",
			"title":"Login"
		},
		"logout":{
			"clearancelevel":1,
			"url":"/?cmd=logout",
			"title":"Logout"
		},
		"signup":{
			"clearancelevel":0,
			"clearancelogic":"exact",
			"url":"/?cmd=pg_signup",
			"title":"Signup"
		},
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
						if(!ctx._menuitems[m].hidden)
							ret+='<li><a class="nav-link" href="'+ctx._menuitems[m].url+'">'+ctx._menuitems[m].title+'</a></li>'
					}
				}
			}
		);
		return ret;
	},
	_buildpage:function(usrdata,cb,pd){
		console.log('_buildpage:function(usrdata,cb,pd)')
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
					cb(
						usrdata,
						new TextDecoder("utf-8").decode(readFile('./res/tpl/contents.html')),
						usrdata.state.pagestate==null?null:usrdata.state.pagestate[usrdata.state.page]==null?null:usrdata.state.pagestate[usrdata.state.page],
						this
					)
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
			console.error(e)
		}
		console.log('end _buildpage:function(usrdata,cb,pd)')
	},
	_buildtable:function(jsondata){
		console.log('_buildtable:function(jsondata)')
		var ret='';
		if(jsondata!=null){
			try{
				ret+=
					'<table class="table table-striped table-sm">\n';
				jsondata.forEach(
					function(r){
					ret+='	<tr>\n';
						r.forEach(
							function(c){
					ret+='		<td>\n';
								try{
					ret+='			'+c+'\n';
								}catch(e){
					ret+='			'+e+'\n';
								}
					ret+='		<td>\n';
							}
						)
					ret+='	</tr>\n';
					}
				);
				ret+='</table>\n';
				;
			}catch(e){
				ret=e.toString();
			}
		}else{
		}
		console.log('end _buildtable:function(jsondata)')
		return ret;
	},
	home:function(usrdata,tpl_contents,pd){
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
	login:function(usrdata,tpl_contents,pd){
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
								'			<%- feedback %>'+
								'		</div>'+
								'	</div>'+
								'</div>'
							)
							.replace("<%- login %>",usrdata.data.login)
							.replace("<%- pass %>",usrdata.data.pass)
							.replace("<%- feedback %>",pd==null?'':pd.error?
								'<br/><div class="alert alert-danger"><%- contents %></div>'
								.replace(
									'<%- contents %>',
									pd.message
								)
							:'')
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
	signup:function(usrdata,tpl_contents,pd){
		try{
			var ret=
				tpl_contents
					.replace(
						"<%- title %>",
						"Signup"
					)
					.replace(
						'<%- contents %>',
						(
							(
								'<div class="container">'+
								'	<div class="row">'+
								'		<div class="col-md-12">'+
								'			<form action="/" method="get">'+
								'				Name:		<input class="form-control" type="text" name="fname" value="<%- fname %>"><br>'+
								'				Surname:	<input class="form-control" type="text" name="lname" value="<%- lname %>"><br>'+
								'				Login :		<input class="form-control" type="text" name="login" value="<%- login %>"><br>'+
								'				Password :	<input class="form-control" type="password" name="pass" value="<%- pass %>"><br>'+
								'				<input type="submit" class="btn btn-default" value="Signup">'+
								'				<input type="hidden" name="cmd" value="signup" />'+
								'			</form>'+
								'			<%- feedback %>'+
								'		</div>'+
								'	</div>'+
								'</div>'
							)
							.replace("<%- fname %>",usrdata.data.fname)
							.replace("<%- lname %>",usrdata.data.lname)
							.replace("<%- login %>",usrdata.data.login)
							.replace("<%- pass %>",usrdata.data.pass)
							.replace("<%- feedback %>",pd==null?'':pd.error?
								'<br/><div class="alert alert-danger"><%- contents %></div>'
								.replace(
									'<%- contents %>',
									pd.message
								)
							:'')

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
	usr:function(usrdata,tpl_contents,pd){
		try{
			var tpl_card=new TextDecoder("utf-8").decode(readFile('./res/tpl/card.html'));
			var ret=
					tpl_contents
					.replace(
						"<%- title %>",
						"User"
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
	dbls:function(usrdata,tpl_contents,pd){
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
	},
	dbusr:function(usrdata,tpl_contents,pd,ctx){
		var ret=''
		try{
			ret=tpl_contents
				.replace(
					"<%- title %>",
					"Database - Users"
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
	},
	mgses:function(usrdata,tpl_contents,pd,ctx){
		var ret=''
		try{
			ret=tpl_contents
				.replace(
					"<%- title %>",
					"Mongoose - Sessions [in progress]"
				)
				.replace(
					'<%- contents %>',
					ctx._buildtable(pd.data)
				)
			;
			return ret;
		}catch(e){
			return (e.toString());
			console.error(e.toString());
		}
	},
	apod:function(usrdata,tpl_contents,pd,ctx){
		var ret=''
		try{
			ret=tpl_contents
				.replace(
					"<%- title %>",
					"CPR Test - <code>https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY</code>"
				)
				.replace(
					'<%- contents %>',
					(
						'<div><%- explanation %></div>'+
						'<img src="<%- url %>"></img>'+
						'<div><%- copyright %></div>'
					)
					.replace(
						'<%- copyright %>',
						pd.data.copyright
					)
					.replace(
						'<%- explanation %>',
						pd.data.explanation
					)
					.replace(
						'<%- url %>',
						pd.data.url
					)
				)
			;
			return ret;
		}catch(e){
			return (e.toString());
			console.error(e.toString());
		}
	},
	insight_weather:function(usrdata,tpl_contents,pd,ctx){
		var ret=''
		try{
			ret=tpl_contents
				.replace(
					"<%- title %>",
					"CPR Test - <code>https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0</code>"
				)
				.replace(
					'<%- contents %>',
					(
						'<code><pre><%- contents %></pre></code>'
						.replace(
							'<%- contents %>',
							JSON.stringify(pd,0,'\t')
						)
					)
				)
			;
			return ret;
		}catch(e){
			return (e.toString());
			console.error(e.toString());
		}
	},
	pgcapfin:function(usrdata,tpl_contents,pd,ctx){
		console.log(pd);
		var tpl_card=new TextDecoder("utf-8").decode(readFile('./res/tpl/card.html'));
		try{
			var ret=
				tpl_contents
					.replace(
						"<%- title %>",
						"Capfin - Leads"
					)
					.replace(
						'<%- contents %>',
						(
							(
								(
									'<div class="container">'+
									'	<div class="row">'+
									'		<div class="col-md-12">'+
									'			<%- contents %>'+
									'		</div>'+
									'	</div>'+
									'</div>'
								)
								.replace("<%- contents %>",tpl_card)
								.replace("<%- header %>",
									"Submissions"+
									(
										'<div class="pull-right"><%- contents %></div>'
										.replace(
											'<%- contents %>',
											(
												('<a class="btn btn-default" href="/?cmd=capfincreate">New</a>')+
												//(pd.data!=null&&pd.data.size!=null?'<a class="btn btn-default" href="/?cmd=capfindrop">Drop</a>':'')
												'<a class="btn btn-default" href="/?cmd=capfindrop">Drop</a>'
											)
										)
									)
									
								)
								.replace("<%- title %>","")
								.replace("<%- text %>",
									(
										'<%- contents %>'+
										'<%- feedback %>'
									)
									.replace(
										"<%- contents %>",
										pd==null?
											''
										:
											pd.data==null?'':ctx._buildtable(pd.data)
									)
									.replace(
										"<%- feedback %>",
										(
											(
											pd==null?
												'':
												pd.error?
													'<br/><div class="alert alert-danger"><%- contents %></div>'
													.replace(
														'<%- contents %>',
														pd.message
													)
												:
											''
											)+
											(
											pd==null?
												'':
												pd.info?
													'<br/><div class="alert alert-'+pd.info.lvl+'"><%- contents %></div>'
													.replace(
														'<%- contents %>',
														pd.info.msg
													)
												:
											''
											)
										)
									)

								)

							)

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
	pgcapfincreate:function(usrdata,tpl_contents,pd){
		try{
			var tpl_card=new TextDecoder("utf-8").decode(readFile('./res/tpl/card.html'));
			var ret=
					tpl_contents
					.replace(
						"<%- title %>",
						"New Lead"
					)
					.replace(
						'<%- contents %>',
						'<div class="container">'+
						'	<div class="row">'+
						'		<div class="col-sm-12"><%- contents %></div>'+
						'	</div>'+
						'</div>'
					)
					.replace("<%- contents %>",tpl_card)
					.replace("<%- header %>","Edit Lead")
					.replace("<%- title %>","")
					.replace("<%- text %>",
						(
							(
								'<form action="/" method="get">'+
								'	name:<input class="form-control" type="text" name="name" value=""><br>'+
								'	surname: <input class="form-control" type="text" name="surname" value=""><br>'+
								'	id_Number: <input class="form-control" type="text" name="id_Number" value=""><br>'+
								'	cell_Number: <input class="form-control" type="text" name="cell_Number" value=""><br>'+
								'	email_Address: <input class="form-control" type="text" name="email_Address" value=""><br>'+
								'	ad_Id: <input class="form-control" type="text" name="ad_Id" value=""><br>'+
								'	<input type="submit" class="btn btn-default" value="Submit">'+
								'	<input type="hidden" name="cmd" value="capfinsubmitlead" />'+
								'</form> '
							)
							/*
							.replace("<%- fname %>",usrdata.data.fname)
							.replace("<%- lname %>",usrdata.data.lname)
							*/
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






}

