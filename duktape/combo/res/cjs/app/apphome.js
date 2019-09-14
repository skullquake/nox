{
	var apphome=function(ctlp){
		this.log('Constructor()');
		this.somedata='lorem ipsum';
		this.ajax=false;
		this.ctl=ctlp;
		var UrlUtils=require('cjs/url/urlutils.js');
		this.urlUtils=new UrlUtils();
		this.tpl_page=new TextDecoder("utf-8").decode(readFile('./res/tpl/page.html'));
		this.tpl_menu=new TextDecoder("utf-8").decode(readFile('./res/tpl/menu.html'));
		this.tpl_contents=new TextDecoder("utf-8").decode(readFile('./res/tpl/contents.html'));
		this.tpl_card=new TextDecoder("utf-8").decode(readFile('./res/tpl/card.html'));
		this._=require('cjs/lodash/lodash.js');
		this.json2html=require("cjs/json2html/json2html.js");
		var Node=require('cjs/wid/node.js');
		var Anchor=require('cjs/wid/anchor.js');
		var Button=require('cjs/wid/button.js');
		var Container=require('cjs/wid/container.js');
		var Jumbotron=require('cjs/wid/jumbotron.js');
		var Menu=require('cjs/wid/menu.js');
		this.container=new Container(null,'qwer');//ctx inh test (qwer)
		this.container.setCtx(this);
		this.menu=new Menu();
		this.menu.setCmd(this.ctl.data.cmd);
		this.menu.addMenuItem(
			[
				{'name':'Reinit','cmd':'hdlreinit'},
				{'name':'Home','cmd':'home'},
				{'name':'Logout','cmd':'logout'},
				{'name':'Callback','cmd':
					function(){
						console.log('Callback test');
						console.log(this.src);
						console.log(typeof(this.ctx));
						console.log(this.ctx.somedata);
					}
				}
			]
		);
		this.container.addChild(this.menu);
		this.jumbotron=new Jumbotron();
		this.jumbotron.setTitle('AppHome');
		this.jumbotron.setSubTitle('Application Home');
		this.container.addChild(this.jumbotron);
		for(var j=0;j<4;j++){
			var d=new Container();
			this.container.addChild(d);
			for(var k=0;k<2;k++){
				var e=new Container();
				e.addAttribute('class','btn-group');
				d.addChild(e);
				for(var k=0;k<8;k++){
					var f=new Anchor();
					e.addChild(f);
					f.setCmd(this.ctl.data.cmd);
					f.addAttribute('class','btn btn-default');
					      
					f.setText('0');
					f.onClick=function(){
						//this.hide();
						if(this.getText()=='anchor'){
							this.setText('0');
						}
						if(this.getText()=='0'){
							this.addAttribute('class','btn btn-danger');
							this.setText('1');
						}else{
							this.addAttribute('class','btn btn-info');
							this.setText('0');
						}
						console.log(this.uuid+': hello:)');
						this.ctx.jumbotron.setSubTitle('clicked:'+this.uuid);
					};
				}
			}
		}
	};
	apphome.prototype.src='res/cjs/app/apphome.js';
	apphome.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	apphome.prototype.data={};
	apphome.prototype.procreq=function(){
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
	apphome.prototype.exec=function(){
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
	apphome.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	apphome.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	apphome.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=apphome;
}



