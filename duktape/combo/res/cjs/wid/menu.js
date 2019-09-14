{
	var Node=require('cjs/wid/node.js?menu');//fake copy for inheritance
	var menu=Node;
	//menu.prototype.menuitems=[];
	menu.prototype.init=function(){
			typeof(this.menuitems)=='undefined'?this.menuitems=[]:null;
			var Node=require('cjs/wid/node.js');
			var Container=require('cjs/wid/container.js');
			var Anchor=require('cjs/wid/anchor.js');
			if(typeof(this.nav)=='undefined'){
				this.nav=new Node();
				this.addChild(this.nav);
			}else{
				//drop children before rebuild
				/*
				this.nav.getDescendents().forEach(
					function(a,b){
						delete a;
					}
				);
				*/
			}
			this.nav.setNodeName('nav');
			this.nav.addAttribute('class','navbar navbar-expand-lg navbar-light bg-dark');
			var navbarbrand=new Anchor();
			this.nav.addChild(navbarbrand);
			navbarbrand.addAttribute('class','navbar-brand');
			navbarbrand.setCmd(null);
			navbarbrand.setText('Home');

			//predec for data-target...\/
			var navbarcollapse=new Node();
			var navbarid='navbarSupportedContent';//does not work on guid
			navbarcollapse.uuid=navbarid;


			var navbarToggler=new Node();
			this.nav.addChild(navbarToggler);
			navbarToggler.setNodeName('button');
			navbarToggler.addAttribute('class','navbar-toggler');
			navbarToggler.addAttribute('data-toggle','collapse');
			navbarToggler.addAttribute('data-target','#'+navbarcollapse.uuid);
			navbarToggler.addAttribute('aria-controls',navbarcollapse.uuid);
			navbarToggler.addAttribute('aria-expanded','false');
			navbarToggler.addAttribute('aria-label','Toggle navigation');
			var navbarTogglerIcon=new Node();
			navbarTogglerIcon.setNodeName('span');
			navbarTogglerIcon.addAttribute('class','navbar-toggler-icon');
			navbarToggler.addChild(navbarTogglerIcon);

			//predec for data-target.../\

			navbarcollapse.setNodeName('div');
			navbarcollapse.addAttribute('class','collapse navbar-collapse');//id='navbarSupportedContent'
			this.nav.addChild(navbarcollapse);
			var navbarNav=new Node();
			navbarcollapse.addChild(navbarNav);
			navbarNav.setNodeName('ul');
			navbarNav.addAttribute('class','navbar-nav mr-auto');
			var _this=this;
			this.menuitems.forEach(
				function(a,b){
					var navbarItem=new Node();
					navbarNav.addChild(navbarItem);
					navbarItem.setNodeName('li');
					navbarItem.addAttribute('class','nav-item');
					var navLink=new Anchor();
					navbarItem.addChild(navLink);
					navLink.addAttribute('class','nav-link');
					navLink.setText(a.name);
					switch(typeof(a.cmd)){
						case 'string':
							navLink.setCmd(a.cmd);
							break;
						case 'function':
							navLink.onClick=a.cmd;
							navLink.cmd=_this.cmd;
							break;
						default:
							navLink.setCmd(null);
							break;
					}
				}
			);
			var t1=new Date();
			this.log('end: '+(t1-t0)/1000+' s');

	};
	/*
	menu.prototype._constructors.push(
		function(p,c,_this){
			_this.log('test Constructor() inh');
		}
	);
	*/
	menu.prototype.src='res/cjs/ses/menu.js';
	menu.prototype.nodename='div';
	this.cmd='';
	menu.prototype.setCmd=function(a){
		this.cmd=typeof('a')=='string'?a:'';
	}
	menu.prototype.addMenuItem=function(a){
		//this.menuitems={};
		this.log('menu.prototype.addMenuItem(): start')
		if(typeof(a)=='object'){
			if(typeof(a.length)=='number'){
				for(i=0;i<a.length;i++){
					this.addMenuItem(a[i]);
				}
				/*
				var _this=this;
				a.forEach(
					function(b,c){
						_this.addMenuItem(b);
					}
				);
				*/
			}else{
				typeof(this.menuitems)=='undefined'?this.menuitems=[]:null;
				this.menuitems.push({'name':a.name,'cmd':a.cmd});
			}
		}else{
			this.log('menu.prototype.addMenuItem(): arg not obj')
		}
		this.log('menu.prototype.addMenuItem(): end')
	};
	menu.prototype.toString=function(idx,idt){
		this.log('toString(): start');
		var ret='';
		if(!this.hidden){
			var t0=new Date();
			this.log('start');
			//cache off, implement difflog
			if(false&&typeof(this.cache)!='undefined'){
				var t1=new Date();
				this.log('end: '+(t1-t0)/1000+' s');
				this.log('toString(): end');
				return this.cache;
			}else{

			}
			this.cache='';

			if(this.nav==null)this.init();
			this.cache=this.nav.toString();
			this.log('toString(): end');
			ret=this.cache;
		}
		return ret;
	};
	module.exports=menu;
}
