
{
	var App=require('cjs/app/app.js?apphome');
	var apphome=App;
	apphome.prototype.init=function(ctlp){
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

		this.Node=require('cjs/wid/node.js');
		this.Anchor=require('cjs/wid/anchor.js');
		this.Button=require('cjs/wid/button.js');
		this.Container=require('cjs/wid/container.js');
		this.Jumbotron=require('cjs/wid/jumbotron.js');
		this.Menu=require('cjs/wid/menu.js');
		this.Form=require('cjs/wid/form.js');

		this.container=new this.Container(null,'qwer');//ctx inh test (qwer)
		this.container.setCtx(this);

		this.buildMenu();
		this.buildJumbotron();

		this.pages={
			'home':this.buildPageHome(),
			'numbers':this.buildPageNumbers(),
			'bionode':this.buildPageBioNode(),
			'tables':this.buildPageTables()
		};
	};
	apphome.prototype.showPage=function(a){
		if(typeof(a)=='string'){
			if(this.pages[a]!=null){
				var _this=this;
				Object.keys(this.pages).forEach(
					function(b,c){
						_this.pages[b].hide();
					}
				);
				this.pages[a].show();
			}else{
				this.log('page not found');
			}
		}else{
			this.log('invalid pagespec');
		}
	}
	apphome.prototype.buildMenu=function(){
		this.menu=new this.Menu();
		this.menu.setCmd(this.ctl.data.cmd);
		this.menu.addMenuItem(
			[
				{'name':'Reinit','cmd':'hdlreinit'},
				{'name':'Home','cmd':function(){
					this.ctx.jumbotron.setTitle('Home');
					this.ctx.jumbotron.setSubTitle('');
					this.ctx.showPage('home');
				}},
				{'name':'BioNode','cmd':function(){
					this.ctx.jumbotron.setTitle('BioNode');
					this.ctx.jumbotron.setSubTitle('');
					this.ctx.showPage('bionode');
				}},
				{'name':'Tables','cmd':function(){
					this.ctx.jumbotron.setTitle('Tables');
					this.ctx.jumbotron.setSubTitle('');
					this.ctx.showPage('tables');
				}},

				{'name':'Numbers','cmd':function(){
					this.ctx.jumbotron.setTitle('Buttons Test');
					this.ctx.jumbotron.setSubTitle('');
					this.ctx.showPage('numbers');
				}},
				{'name':'Logout','cmd':'logout'},
			]
		);
		this.container.addChild(this.menu);
		return this.menu;
	}
	apphome.prototype.buildJumbotron=function(){
		this.jumbotron=new this.Jumbotron();
		this.jumbotron.setTitle('AppHome');
		this.jumbotron.setSubTitle('Application Home');
		this.container.addChild(this.jumbotron);
		return this.jumbotron;
	};
	apphome.prototype.buildPageHome=function(){
		this.containerHome=this.container.addChild(new this.Container());
		this.containerHome.setText('<h3>HOME</h3>');
		this.containerHome.hide();
		return this.containerHome;
	};
	apphome.prototype.buildPageTables=function(){
		this.containerTables=this.container.addChild(new this.Container());
		this.containerTables.setText('<h3>Test - chained stuff, tables later</h3>');
		for(var i=0;i<20;i++){//new chained syntax
			this.containerTables
				.addChild(new this.Anchor(),'a'+i)
				.setClass('btn btn-default')
				.setText('hello')
				.setCmd(this.ctl.data.cmd)
				.show()
				.setOnClick(function(){
					try{
						this.setText(this.getText()=='hello'?'byebye':'hello');
						typeof(this._parent.getChild('a0'))!='undefined'?this._parent.getChild('a0').setText('cviaid: '+new Date().getTime()):console.log('a0 not found');//this.getChild('a0').setText('via id');
					}catch(e){
						console.log(e.toString());
					}
				});
		}
		this.containerTables.hide();
		return this.containerTables;
	}
	apphome.prototype.buildPageBioNode=function(){
		this.containerBioNode=this
			.container
			.addChild(new this.Container())
			.setClass('container')
			.addChild(new this.Container())
			.setClass('row')
			.addChild(new this.Container())
			.setClass('col-sm-12')
		;
		this.formBioTest=this.containerBioNode.addChild(new this.Form());
		this.containerBioNode
			.addChild(new this.Container(),'alert')
			.setClass('alert alert-info')
			.setText('test')
			.hide()
		;
		this.formBioTest.init();
		this.formBioTest.addField('seq','text','');
		this.formBioTest.setAction('home');
		this.formBioTest.onClick=function(){
			var seq=this.ctx.urlUtils.getQueryVariable(request.getQueryString(),'seq');
			this.addField('seq','text',seq);//same as set
			var errmsg=[]
			var valid=true;
			if(seq==null||seq==''){valid=false;errmsg.push('seq not specified')}
			if(valid){
				var _seqmsg='';
				try{
					var _seq=require('cjs/bionode/bionode-seq.min.js');
					_seqmsg=_seq.checkType(seq);
				}catch(e){
					console.log(e.toString());
					_seqmsg=e.toString();
				}
				typeof(this._parent.getChild('alert'))!='undefined'
					?
					this
						._parent
						.getChild('alert')
						.setClass('alert alert-info')
						.setText(_seqmsg)
						.show()
						
					:
					console.log('alert not found')
				;

			}else{
				typeof(this._parent.getChild('alert'))!='undefined'
					?
					this
						._parent
						.getChild('alert')
						.setClass('alert alert-danger')
						.setText(errmsg.join('<br/>'))
						.show()
						
					:
					console.log('alert not found')
				;
			}
		};
		this.containerBioNode.hide();
		return this.containerBioNode;
	}

	apphome.prototype.buildPageNumbers=function(){
		this.containerNumbers=this.container.addChild(new this.Container());
		for(var j=0;j<4;j++){
			var d=new this.Container();
			this.containerNumbers.addChild(d);
			for(var k=0;k<2;k++){
				var e=new this.Container();
				e.addAttribute('class','btn-group');
				d.addChild(e);
				for(var k=0;k<8;k++){
					var f=new this.Anchor();
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
		this.containerNumbers.hide();
		return this.containerNumbers;
	}
	module.exports=apphome;
}



