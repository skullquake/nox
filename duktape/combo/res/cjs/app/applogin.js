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
		var row=new Container();
		row.addAttribute('class','row');
		var col=row.addChild(new Container());
		col.addAttribute('class','col-sm-12');
		this.container=col.addChild(new Container();//ctx inh test (qwer)
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

		//login
		this.containerLogin=new Container();
		this.container.addChild(this.containerLogin);
		this.alertLogin=this.containerLogin.addChild(new Node());
		this.alertLogin.setNodeName('div');
		this.alertLogin.addAttribute('class','alert alert-info');
		this.alertLogin.setText('enter credentials');
		this.alertLogin.show();
		this.formLogin=this.containerLogin.addChild(new Form());
		this.formLogin.init();
		this.formLogin.addField('usr');
		this.formLogin.addField('pas');
		this.formLogin.onClick=function(){
			console.log('yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
			try{
				this.ctx.alertLogin.hide();
				var usr=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'usr');
				var pas=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'pas');
				if(usr=='qwer'&&pas=='asdf'){
					this.ctx.ctl.ses.data.ual=1;
					return 'home';
				}else{
					this.ctx.alertLogin.setText('Invalid Credentials');
					this.ctx.alertLogin.addAttribute('class','alert alert-danger');
					this.ctx.alertLogin.show();
					this.ctx.ctl.ses.data.ual=0;
					return null;
				}
			}catch(e){
				console.log(e);
			}
		}
		this.formLogin.setAction('login');

		//signup
		this.containerSignup=new Container();
		this.formSignup=this.containerSignup.addChild(new Form());
		this.formSignup.init();
		this.formSignup.addField('usr');
		this.formSignup.addField('pas');
		this.formSignup.onClick=function(){
			console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
			var usr=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'usr');
			var pas=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'pas');
			if(usr=='qwer'&&pas=='asdf'){
				this.ctx.ctl.ses.data.ual=1;
				return 'home';
			}else{
				this.ctx.ctl.ses.data.ual=0;
				return null;
			}
		}
		this.formSignup.setAction('login');
		this.containerSignup.hide();
		this.container.addChild(this.containerSignup);
		this.containerSignup.setText('containerSignup');
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



