{
	var app=function(ctlp){
		this.log('Constructor():start');
		this.init(ctlp);
		var UrlUtils=require('cjs/url/urlutils.js');
		this.urlUtils=new UrlUtils();
		this.log('Constructor():end');
	};
	app.prototype.src='res/cjs/app/app.js';
	app.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	app.prototype.init=function(ctlp){
		this.log('init():start');
		this.somedata='lorem ipsum';
		this.ajax=false;
		this.ctl=ctlp;
		this.tpl_page=new TextDecoder("utf-8").decode(readFile('./res/tpl/page.html'));
		this.tpl_contents=new TextDecoder("utf-8").decode(readFile('./res/tpl/contents.html'));
		this._=require('cjs/lodash/lodash.js');
		this.json2html=require("cjs/json2html/json2html.js");
		var Node=require('cjs/wid/node.js');
		var Anchor=require('cjs/wid/anchor.js');
		var Button=require('cjs/wid/button.js');
		var Container=require('cjs/wid/container.js');
		var Jumbotron=require('cjs/wid/jumbotron.js');
		var Layout=require('cjs/wid/layout.js');
		var Menu=require('cjs/wid/menu.js');
		var Form=require('cjs/wid/form.js');
		var Table=require('cjs/wid/table.js');
		var Text=require('cjs/wid/text.js');
		var Model=require('cjs/mod/mod.js');
		var View=require('cjs/view/view.js');

		this.container=new Container();
		this.container.setCtx(this);
		this.menu=new Menu();
		this.menu.setCmd(this.ctl.data.cmd);
		this.menu.addMenuItem(
			[
				{'name':'Reinit','cmd':'hdlreinit'},
				{'name':'Login','cmd':
					function(){
						try{
							this.ctx.jumbotron.setTitle('Login');
							this.ctx.jumbotron.setSubTitle('Login Form');
							this.ctx.containerSignup.hide();
							this.ctx.containerLogin.show();
						}catch(e){
							console.log(e);
						}
					}

				},
				{'name':'Signup','cmd':
					function(){
						try{

							this.ctx.jumbotron.setTitle('Signup');
							this.ctx.jumbotron.setSubTitle('Signup Form');
							this.ctx.containerSignup.show();
							this.ctx.containerLogin.hide();
						}catch(e){
							console.log(e);
						}
					}
				}
			]
		);
		this.container.addChild(this.menu);
		this.jumbotron=new Jumbotron();
		this.jumbotron.setTitle('App Login');
		this.jumbotron.setSubTitle('Application Login');
		this.container.addChild(this.jumbotron);
		var container=this.container.addChild(new Container());
		container.addAttribute('class','container');
		var row=container.addChild(new Container());
		row.addAttribute('class','row');
		var col=row.addChild(new Container());
		col.addAttribute('class','col-sm-12');

		//login
		this.containerLogin=col.addChild(new Container());
		this.alertLogin=this.containerLogin.addChild(new Container());
		this.alertLogin.hide();
		this.alertLogin.setNodeName('div');
		this.alertLogin.addAttribute('class','alert alert-info');
		this.alertLogin.setText('enter credentials');
		this.alertLogin.hide();
		this.formLogin=this.containerLogin.addChild(new Form());
		this.formLogin.init();
		this.formLogin.addField('login','text','');
		this.formLogin.addField('password','password','');
		this.formLogin.onClick=function(){
			try{
				this.ctx.alertLogin.hide();
				var login=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'login');
				var pass=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'password');
				this.addField('login','text',login);//same as set
				this.addField('password','password',pass);//same as set
				var errmsg=[]
				var valid=true;
				if(login==null||login==''){valid=false;errmsg.push('login not specified')}
				if(pass==null||pass==''){valid=false;errmsg.push('password not specified')}
				if(valid){
					var db=require('cjs/db/db.js');
					db.connect("./db/sqlite/test.db3");
					var table='usr';
					var res;
					var sql='';
					sql=
						"SELECT COUNT(*) FROM <%= table %> WHERE login LIKE '<%= login %>'"
						.replace(
							'<%= table %>',
							table
						)
						.replace(
							'<%= login %>',
							login
						)
					;
					res=db.select(table,sql);//[0];
					if(parseInt(res[0])!=0){
						sql=
							"SELECT COUNT(*) FROM <%= table %> WHERE login LIKE '<%= login %>' AND pass LIKE '<%= pass %>'"
							.replace(
								'<%= table %>',
								table
							)
							.replace(
								'<%= login %>',
								login
							)
							.replace(
								'<%= pass %>',
								pass
							)
						;
						res=db.select(table,sql);//[0];
						if(parseInt(res[0])!=0){
						}else{
							valid=false;
							errmsg.push('Invalid password');
						}
					}else{
						valid=false;
						errmsg.push('No such user exists');
					}
				}else{
				}

			}catch(e){
				console.log(e);
			}
			if(!valid){
				this.ctx.alertLogin.show();
				this.ctx.alertLogin.addAttribute('class','alert alert-danger');
				this.ctx.alertLogin.setText(errmsg.join('<br/>'));
			}else{
				//clear fields
				this.addField('login','text','');//same as set
				this.addField('password','password','');//same as set
				this.ctx.ctl.ses.data.ual=1;
				return 'home';
			}
		}
		this.formLogin.setAction('login');

		//signup
		this.containerSignup=col.addChild(new Container());
		this.alertSignup=this.containerSignup.addChild(new Container());
		this.alertSignup.hide();
		this.formSignup=this.containerSignup.addChild(new Form());
		this.formSignup.init();
		this.formSignup.addField('name','text','');
		this.formSignup.addField('surname','text','');
		this.formSignup.addField('login','text','');
		this.formSignup.addField('password','password','');
		this.formSignup.onClick=function(){
			var fname=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'name');
			var lname=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'surname');
			var login=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'login');
			var pass=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'password');
			this.addField('name','text',fname);//same as set
			this.addField('surname','text',lname);//same as set
			this.addField('login','text',login);//same as set
			this.addField('password','password',pass);//same as set
			var errmsg=[]
			var valid=true;
			if(fname==null||fname==''){valid=false;errmsg.push('name not specified')}
			if(lname==null||lname==''){valid=false;errmsg.push('surname not specified')}
			if(login==null||login==''){valid=false;errmsg.push('login not specified')}
			if(pass==null||pass==''){valid=false;errmsg.push('password not specified')}
			if(valid){
				var db=require('cjs/db/db.js');
				db.connect("./db/sqlite/test.db3");
				var table='usr';
				var sql=
					"SELECT COUNT(*) FROM <%= table %> WHERE login LIKE '<%= login %>'"
					.replace(
						'<%= table %>',
						table
					)
					.replace(
						'<%= login %>',
						login
					)
				;
				var res=db.select(table,sql);//[0];
				if(parseInt(res[0])==0){
					try{
						sql=	
							(
								"INSERT INTO <%- table %>("+
								"	fname,"+
								"	lname,"+
								"	login,"+
								"	pass"+
								") "+
								" VALUES ("+
								"	'<%- fname %>',"+
								"	'<%- lname %>',"+
								"	'<%- login %>',"+
								"	'<%- pass %>'"+
								")"
							)
							.replace(
								'<%- table %>',
								table
							)
							.replace(
								'<%- fname %>',
								fname
							)
							.replace(
								'<%- lname %>',
								lname
							)
							.replace(
								'<%- login %>',
								login
							)
							.replace(
								'<%- pass %>',
								pass
							)
						;
						db.exec(sql);
						valid=true;
					}catch(e){
						console.log(e);
					}
				}else{
					valid=false;
					errmsg.push('usr already exists');
				}
			}else{
			}
			if(!valid){
				this.ctx.alertSignup.show();
				this.ctx.alertSignup.addAttribute('class','alert alert-danger');
				this.ctx.alertSignup.setText(errmsg.join('<br/>'));
			}else{
				//clear fields
				this.addField('name','text','');//same as set
				this.addField('surname','text','');//same as set
				this.addField('login','text','');//same as set
				this.addField('password','password','');//same as set
				this.ctx.ctl.ses.data.ual=1;
				return 'home';
			}
		};
		this.formSignup.setAction('login');
		this.containerSignup.hide();
		this.log('init():end');
	};
	app.prototype.data={};
	app.prototype.render=function(){
		_response.setHeader('Content-type','text/html');
		_response.write(
			this._.template(this.tpl_page)(
				{
					'contents':
					this._.template(
						'<%= test %>'
					)(
						{
							'test':this.container.toString()
						}
					)
				}
			)
		);
		var t1=new Date();
		this.log('exec(): end ['+((t1-t0)/1000)+' s]');
	}
	app.prototype.procreq=function(){
		console.log('app.prototype.procreq=function():start');
		var ret=null;
		var id=this.urlUtils.getQueryVariable(request.getQueryString(),'id');
		var _this=this;
		var o=this._.find(this.container.getDescendents(), function(o) { return o.uuid==id;});
		console.log(request.getQueryString());
		switch(
			typeof(o)
		){
			case 'object':
				console.log("case 'object':");
				if(typeof(o.onClick)=='function'){
					console.log("case function':");
					//o.refresh();
					ret=o.onClick();
				}
				break;
			default:
				break;
		};
		console.log('app.prototype.procreq=function():end');
		return ret;
	};
	app.prototype.exec=function(){
		this.log('exec(): start');
		var ret=null;
		ret=this.procreq();
		if(this.urlUtils.getQueryVariable(request.getQueryString(),'ajax')=='true'){
			console.log('----------------');
			try{
				/*
				var _this=this;
				var id=this.urlUtils.getQueryVariable(request.getQueryString(),'id');
				var o=this._.find(this.container.getDescendents(), function(o) { return o.uuid==id;});
				arrobj.push(o.toJson());
				arrobj.push(o.toJson());
				arrobj.push(o.toJson());
				*/
				/*
				*/
				var _this=this;
				var arrobj=[];
				var arrobjjson=[];
				arrobj=this._.filter(this.container.getDescendents(), function(o) { return o._refresh==true;});
				arrobj.forEach(
					function(obj,objidx){
						arrobjjson.push(obj.toJson());
					}
				);
				_response.setHeader('Content-type','application/json');
				_response.write(
						JSON.stringify(arrobjjson)
				);
				arrobj.forEach(
					function(obj,objidx){
						obj._refresh=false;
					}
				);
			}catch(e){
				console.log(e.toString());
			}
			console.log('----------------');
		}else{
			if(ret==null){
				this.render();
			}
		}
		return ret;
	}
	app.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	app.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	app.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=app;
}
