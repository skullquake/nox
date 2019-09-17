{
	var App=require('cjs/app/app.js?applogin');
	var applogin=App;
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
		var AjaxTest=require('cjs/wid/custom/ajaxtest.js');

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
		//this.ajaxtest(this.container);
		this.container.addChild(new AjaxTest().init());
		this.jumbotron=new Jumbotron();
		this.jumbotron.setTitle('App Login');
		this.jumbotron.setSubTitle('Application Login');
		this.jumbotron.setOnClick(function(){
			for(var i=0;i<20;i++){
				console.log('yaaaas');
			}
		});
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
		this.formLogin
			.divButtons
			.addChild(new Anchor())
			.setText('Signup')
			.setCmd('login')
			.setClass('btn btn-default')
			.setOnClick(function(){
				console.log('xxxxxxxxxxxxxxxxxxxxxxxx');
				this.ctx.containerSignup.show();
				this.ctx.containerLogin.hide();
				console.log('xxxxxxxxxxxxxxxxxxxxxxxx');
			})
		;
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
		/*
		this.containerSignup.addChild(new Container().setText('asdf'));
		*/
		this.alertSignup=this.containerSignup.addChild(new Container());
		this.alertSignup.hide();
		this.formSignup=this.containerSignup.addChild(new Form());
		this.formSignup.init();
		this.formSignup.addField('name','text','');
		this.formSignup.addField('surname','text','');
		this.formSignup.addField('login','text','');
		this.formSignup.addField('password','password','');
		this.formSignup
			.divButtons
			.addChild(new Anchor())
			.setText('Login')
			.setCmd('login')
			.setClass('btn btn-default')
			.setOnClick(function(){
				this.ctx.containerSignup.hide();
				this.ctx.containerLogin.show();
			})
		;

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
	applogin.prototype.ajaxtest=function(a){
		this.progressdata={
			min:0,
			max:100,
			cur:0,
			btns:[],
			nbtns:8
		}
		var Anchor=require('cjs/wid/anchor.js');
		var Node=require('cjs/wid/node.js');
		/*
		a.addChild(new Node())
			.setNodeName('script')
			.setText(
				new TextDecoder("utf-8").decode(readFile('./res/wjs/wcli.js'))
			)
			//.queuecmd('alert("1")')
			//.queuecmd('alert("2")')
		;
		*/
		var _this=this;
		var arrbtn=[];
		var progress=
			a
			.addChild(new Node(),'progress')
			.setNodeName('div')
			.setClass('progress')
			.addChild(new Node(),'progressbar')
			.setNodeName('div')
			.setClass('progress-bar progress-bar-striped progress-bar-animated')
			.addAttribute('style','width:25%')
			.addAttribute('aria-valuenow','25')
			.addAttribute('aria-valuemin','0')
			.addAttribute('aria-valuemax','100')
		;
		for(var i=0;i<this.progressdata.nbtns;i++){
			var asdf=i;
			var btn=
			a
			.addChild(new Anchor(),'btn'+i)
				.setCmd(null)
				.setText(i)
				//.setData('idx',''+i)//asdf)//(function(){var ii=i;return i;})())
				.setData('idx',i)//asdf)//(function(){var ii=i;return i;})())
				.addAttribute('class','btn btn-default')
				.addAttribute('href','#')
				.setOnClick(
					function(){
						var _this=this;
						this.setText(this.getData('idx'));
						this.ctx.progressdata.btns.forEach(
							function(b,bidx){
								b.setClass('btn '+(b.getData('idx')<_this.getData('idx')?'btn-danger':'btn-default'));
								b.refresh();
							}
						);
						var classes=['info','warning','danger','success']
						var _class='danger';
						this.setClass('btn btn-'+_class);
						this._parent.getChild('btn0').refresh();
						this._parent.getChild('progressbar').addAttribute('style','width:'+this.getData('idx')*10+'%;');
						this._parent.getChild('progressbar').refresh();
					}
				)
			;
			this.progressdata.btns.push(btn);
		}

	}
	module.exports=applogin;
}

