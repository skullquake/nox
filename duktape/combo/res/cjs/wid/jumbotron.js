
{
	var Node=require('cjs/wid/node.js?jumbotron');//fake copy for inheritance
	var jumbotron=Node;
	jumbotron.prototype.src='res/cjs/ses/jumbotron.js';
	jumbotron.prototype.nodename='div';
	jumbotron.prototype.jumbotronitems=[];
	this.cmd='';
	this.title=null;
	this.subtitle=null;
	jumbotron.prototype.setCmd=function(a){
		this.cmd=typeof('a')=='string'?a:'';
	}
	jumbotron.prototype.setTitle=function(a){
		this.log('jumbotron.prototype.setTitle(): start')
		if(typeof(a)=='string'){
			this.title=a;
		}else{
			this.log('jumbotron.prototype.setTitle(): arg not str')
		}
		this.log('jumbotron.prototype.setTitle(): end')
	};
	jumbotron.prototype.setSubTitle=function(a){
		this.log('jumbotron.prototype.setSubTitle(): start')
		if(typeof(a)=='string'){
			this.subtitle=a;
		}else{
			this.log('jumbotron.prototype.setSubTitle(): arg not str')
		}
		this.log('jumbotron.prototype.setSubTitle(): end')
	};
	jumbotron.prototype.toString=function(idx,idt){
		var t0=new Date();
		this.log('start');
		if(typeof(this.cache)!='undefined'){
			var t1=new Date();
			this.log('end: '+(t1-t0)/1000+' s');
			return this.cache;
		}
		this.cache='';

		var Node=require('cjs/wid/node.js');
		var Container=require('cjs/wid/container.js');
		var nodeJumbotron=new Node();
		nodeJumbotron.setNodeName('div');
		nodeJumbotron.addAttribute('class','jumbotron');
		var nodeTitle=new Node();
		nodeTitle.setNodeName('h3');
		nodeTitle.addAttribute('class','title');
		nodeTitle.setText(this.title);
		var nodeSubTitle=new Node();
		nodeSubTitle.setNodeName('p');
		nodeSubTitle.setText(this.subtitle);
		nodeSubTitle.addAttribute('class','subtitle');
		nodeJumbotron.addChild(nodeTitle);
		nodeJumbotron.addChild(nodeSubTitle);
		var t1=new Date();
		this.cache=nodeJumbotron.toString();
		this.log('caching');
		this.log('end: '+(t1-t0)/1000+' s');
		return this.cache;
	};
	module.exports=jumbotron;
}
