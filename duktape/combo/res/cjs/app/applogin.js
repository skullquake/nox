{
	var applogin=function(ctlp){
		this.log('Constructor():start');
		this.init(ctlp);
		this.log('Constructor():end');
	};
	applogin.prototype.src='res/cjs/app/applogin.js';
	applogin.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	applogin.prototype.init=function(ctlp){
		this.log('init():start');
		this.somedata='lorem ipsum';
		this.ajax=false;
		this.ctl=ctlp;
		var UrlUtils=require('cjs/url/urlutils.js');
		this.urlUtils=new UrlUtils();
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
			console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
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
					console.log(sql);
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
			console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
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
						console.log("user does not exist: creating...");
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
	applogin.prototype.data={};
	applogin.prototype.render=function(){
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
	applogin.prototype.procreq=function(){
		var ret=null;
		var id=this.urlUtils.getQueryVariable(request.getQueryString(),'id');
		var _this=this;
		var o=this._.find(this.container.getDescendents(), function(o) { return o.uuid==id;});
		console.log('----------------------------------------');
		console.log(request.getQueryString());
		//console.log(id);
		//console.log(o);
		console.log('----------------------------------------');
		switch(
			typeof(o)
		){
			case 'object':
				if(typeof(o.onClick)=='function')
					ret=o.onClick();
				break;
			default:
				break;
		};
		return ret;
	};
	applogin.prototype.exec=function(){
		this.log('exec(): start');
		var ret=null;
		ret=this.procreq();
		if(ret==null){
			this.render();
		}
		return ret;
	}
	applogin.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	applogin.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	applogin.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=applogin;
}

/*
			case "signup":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				usrdata.data.fname=getQueryVariable(request.getQueryString(),'fname')!=null?getQueryVariable(request.getQueryString(),'fname'):usrdata.data.fname;
				usrdata.data.lname=getQueryVariable(request.getQueryString(),'lname')!=null?getQueryVariable(request.getQueryString(),'lname'):usrdata.data.lname;
				usrdata.data.login=getQueryVariable(request.getQueryString(),'login')!=null?getQueryVariable(request.getQueryString(),'login'):usrdata.data.login;
				usrdata.data.pass=getQueryVariable(request.getQueryString(),'pass')!=null?getQueryVariable(request.getQueryString(),'pass'):usrdata.data.pass;
				var table='usr';
				var sql="SELECT COUNT(*) FROM "+table+" WHERE login LIKE '"+usrdata.data.login+"'";
				console.log(sql);
				if(parseInt(this.db.select(table,sql)[0])==0){
					try{
						console.log("user does not exist: creating...");
						console.log("done");
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
								usrdata.data.fname
							)
							.replace(
								'<%- lname %>',
								usrdata.data.lname
							)
							.replace(
								'<%- login %>',
								usrdata.data.login
							)
							.replace(
								'<%- pass %>',
								usrdata.data.pass
							)
						;
						this.db.exec(sql);
						console.log("signing in...");
						usrdata.state.clearancelevel=1;
						usrdata.state.page="home";
						usrdata.state.pagestate[cmd]={};
					}catch(e){
						console.log(e);
					}
				}else{
					usrdata.state.pagestate[cmd]={};
					usrdata.state.pagestate[cmd].error=true;
					usrdata.state.pagestate[cmd].message='User already exists';
					usrdata.state.page=cmd;
					usrdata.state.clearancelevel=0;
					console.log("user exists: not creating");
				}
				break;



			case "login":
				usrdata.data.login=getQueryVariable(request.getQueryString(),'login')!=null?getQueryVariable(request.getQueryString(),'login'):usrdata.data.login;
				usrdata.data.pass=getQueryVariable(request.getQueryString(),'pass')!=null?getQueryVariable(request.getQueryString(),'pass'):usrdata.data.pass;
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				var table='usr';
				var sql="SELECT COUNT(*) FROM "+table+" WHERE login LIKE '"+usrdata.data.login+"' and pass LIKE '"+usrdata.data.pass+"'";
				var count=parseInt(this.db.select(table,sql)[0]);
				usrdata.state.pagestate[cmd]={};
				if(count>0){
					var sql="SELECT * FROM "+table+" WHERE login LIKE '"+usrdata.data.login+"' and pass LIKE '"+usrdata.data.pass+"' LIMIT 1";
					var usrdatadb=this.db.select(table,sql,true);
					for(var i=0;i<usrdatadb[0].length;i++){
						usrdata.data[usrdatadb[0][i]]=usrdatadb[1][i];
					}
					usrdata.state.clearancelevel=1;
					usrdata.state.page="home";
					usrdata.state.pagestate[cmd].error=false;
					usrdata.state.pagestate[cmd].message=null;
				}else{
					usrdata.state.pagestate[cmd].error=true;
					usrdata.state.pagestate[cmd].message='Invalid Credentials';
					usrdata.state.page=cmd;
					usrdata.state.clearancelevel=0;
				}
				break;

*/
