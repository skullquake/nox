{
	var App=require('cjs/app/app.js?apphome');
	var apphome=App;
	apphome.prototype.init=function(ctlp){
		this.log('Constructor()');
		this.somedata='lorem ipsum';
		this.ajax=true;//false;
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
		this.Ajax=require('cjs/wid/ajax.js');

		this.container=new this.Container(null);//ctx inh test (qwer)
		this.container.setCtx(this);

		this.buildMenu();
		this.buildJumbotron();

		this.pages={
			'home':this.buildPageHome(),
			'numbers':this.buildPageNumbers(),
			'bionode':this.buildPageBioNode(),
			'ajaxtest':this.buildPageAjaxTest(),
			'table':this.buildPageTable()
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
					this.ctx.showPage('table');
				}},
				{'name':'Numbers','cmd':function(){
					this.ctx.jumbotron.setTitle('Buttons Test');
					this.ctx.jumbotron.setSubTitle('');
					this.ctx.showPage('numbers');
				}},
				{'name':'Ajax Test','cmd':function(){
					this.ctx.jumbotron.setTitle('Ajax Test');
					this.ctx.jumbotron.setSubTitle('');
					this.ctx.showPage('ajaxtest');
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
			.addAttribute('style','margin-top:8px;')
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
				var _seqmsgerr=false;
				try{
					var _seq=require('cjs/bionode/bionode-seq.min.js');
					_seqmsg=_seq.checkType(seq);
				}catch(e){
					console.log(e.toString());
					_seqmsg=e.toString();
				}
				_seqmsgerr=_seqmsg==''||_seqmsg==null;
				_seqmsg==''||_seqmsg==null?_seqmsg='Invalid sequence':null;
				typeof(this._parent.getChild('alert'))!='undefined'
					?
					this
						._parent
						.getChild('alert')
						.setClass(_seqmsgerr==true?'alert alert-danger':'alert alert-info')
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
	};
	apphome.prototype.buildPageAjaxTest=function(){
		console.log('apphome.prototype.buildPageAjaxTest=function():start');
		if(typeof(this.containerAjax)=='undefined'){//avoid rebuilding
			//root container
			this.containerAjax=this.container.addChild(new this.Container());
			this.containerAjax.addChild(
				new this.Ajax()
				.init()
				.putToken('<%= cmd %>','home')
			);//ajaxing widget (under development)
			//some child widgets with callbacks that are going to ajax
			this.containerAjax
				.addChild(new this.Container(),'msgcontainer')
				.setText('Click on the squares')
				.addAttribute('class','alert alert-primary')
			;
			this.containerAjax
				.addChild(new this.Container(),'boxescontainer')
				.addStyleAttribute('display','flex')
				.addStyleAttribute('flex-wrap','wrap');
			for(var i=0;i<128;i++){
				this.containerAjax.getChild('boxescontainer')
				.addChild(new this.Node())
					.setNodeName('div')
					.setCtx(this)
					.setText('')
					.addStyleAttribute('background','green')
					.addStyleAttribute('padding','16px')
					.addStyleAttribute('margin','8px')
					.setOnClick(
						function(){
							console.log('________________________________________');
							console.log('ajax rEx                                ');
							console.log('________________________________________');
							this.addStyleAttribute('background',this.getStyleAttribute('background')=='green'?'red':'green')
							this.refresh();
							//this.ctx.getChild('msgcontainer').setText('asdf');
							//this.ctx.getChild('msgcontainer').refresh();
							console.log(this.ctx.containerAjax.getChild('msgcontainer').setText('Server callback for '+this.uuid));
							this.ctx.containerAjax.getChild('msgcontainer').refresh();
							console.log('________________________________________');
						}
					)
				;
			}
			//hide for navigation
			this.containerAjax.hide();
		console.log('apphome.prototype.buildPageAjaxTest=function():end');
			return this.containerAjax;
		}else{
		console.log('apphome.prototype.buildPageAjaxTest=function():end');
			return null;
		}
	};
	apphome.prototype.buildPageTable=function(){
		if(typeof(this.containerTable)=='undefined'){//avoid rebuilding
			this.Table=require('cjs/wid/table.js');
			this.containerTable=this.container.addChild(new this.Container());;
			var d=[];
			for(var i=0;i<32;i++){
				var r=[];
				for(var j=0;j<8;j++){
					r.push(i*32+j);
				}
				d.push(r);
			}
			this.containerTable.addChild(new this.Table(),'table')
				.init()
				.setData(
					d
				)
			;
			this.containerTable.hide();
		}
		return this.containerTable;
	}
	module.exports=apphome;
}



