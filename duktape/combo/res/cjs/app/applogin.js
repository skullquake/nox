{
	var applogin=function(ctlp){
		this.log('Constructor()');
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
		var Table=require('cjs/wid/table.js');
		var Text=require('cjs/wid/text.js');
		var Model=require('cjs/mod/mod.js');
		var View=require('cjs/view/view.js');
		this.container=new Container(null,'qwer');//ctx inh test (qwer)
		this.container.setCtx(this);
		this.menu=new Menu();
		this.menu.setCmd(this.ctl.data.cmd);
		this.menu.addMenuItem(
			[
				{'name':'Reinit','cmd':'hdlreinit'},
				{'name':'Login','cmd':
					function(){
						try{
							this.ctx.containerSignup.hide();
							this.ctx.containerLogin.show();
						}catch(e){
							console.log(e);
						}
					}

				},
				{'name':'Home','cmd':'home'},
				{'name':'Signup','cmd':
					function(){
						try{
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

		this.containerLogin=new Container();
		this.container.addChild(this.containerLogin);
		this.containerLogin.setText('containerLogin');
		this.containerSignup=new Container();
		this.containerSignup.hide();

		this.container.addChild(this.containerSignup);
		this.containerSignup.setText('containerSignup');

	};
	applogin.prototype.src='res/cjs/app/applogin.js';
	applogin.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	applogin.prototype.data={};
	applogin.prototype.procreq=function(){
		var id=this.urlUtils.getQueryVariable(request.getQueryString(),'id');
		var _this=this;
		var o=this._.find(this.container.getDescendents(), function(o) { return o.uuid==id;});
		switch(
			typeof(o)
		){
			case 'object':
				if(typeof(o.onClick)=='function')
					o.onClick();
				break;
			default:
				break;
		};

	};
	applogin.prototype.exec=function(){
		this.log('exec(): start');
		var t0=new Date();
		this.procreq();
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



