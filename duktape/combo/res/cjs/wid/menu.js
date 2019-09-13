
{
	var Node=require('cjs/wid/node.js?menu');//fake copy for inheritance
	var menu=Node;
	menu.prototype.src='res/cjs/ses/menu.js';
	menu.prototype.nodename='div';
	menu.prototype.menuitems=[];
	this.cmd='';
	menu.prototype.setCmd=function(a){
		this.cmd=typeof('a')=='string'?a:'';
	}
	menu.prototype.addMenuItem=function(a){
		this.log('menu.prototype.addMenuItem(): start')
		if(typeof(a)=='object'){
			if(typeof(a.length)=='number'){
				var _this=this;
				a.forEach(
					function(b,c){
						_this.addMenuItem(b);
					}
				);
			}else{
				this.menuitems.push({'name':a.name,'cmd':a.cmd});
			}
		}else{
			this.log('menu.prototype.addMenuItem(): arg not obj')
		}
		this.log('menu.prototype.addMenuItem(): end')
	};
	menu.prototype.toString=function(idx,idt){
		this.log('toString(): start');
		var t0=new Date();
		this.log('start');
		if(typeof(this.cache)!='undefined'){
			var t1=new Date();
			this.log('end: '+(t1-t0)/1000+' s');
			this.log('toString(): end');
			return this.cache;
		}
		this.cache='';


		var Node=require('cjs/wid/node.js');
		var Container=require('cjs/wid/container.js');
		var Anchor=require('cjs/wid/anchor.js');
		var nav=new Node();
		nav.setNodeName('nav');
		nav.addAttribute('class','navbar navbar-expand-lg navbar-light bg-dark');
		var navbarbrand=new Anchor();
		navbarbrand.addAttribute('class','navbar-brand');
		navbarbrand.setCmd(null);
		navbarbrand.setText('Home');
		nav.addChild(navbarbrand);

		//predec for data-target...\/
		var navbarcollapse=new Node();
		var navbarid='navbarSupportedContent';//does not work on guid
		navbarcollapse.uuid=navbarid;


		var navbarToggler=new Node();
		navbarToggler.setNodeName('button');
		navbarToggler.addAttribute('class','navbar-toggler');
		navbarToggler.addAttribute('data-toggle','collapse');
		navbarToggler.addAttribute('data-target','#'+navbarcollapse.uuid);
		navbarToggler.addAttribute('aria-controls',navbarcollapse.uuid);
		navbarToggler.addAttribute('aria-expanded','false');
		navbarToggler.addAttribute('aria-label','Toggle navigation');
		nav.addChild(navbarToggler);
		var navbarTogglerIcon=new Node();
		navbarTogglerIcon.setNodeName('span');
		navbarTogglerIcon.addAttribute('class','navbar-toggler-icon');
		navbarToggler.addChild(navbarTogglerIcon);

		//predec for data-target.../\

		navbarcollapse.setNodeName('div');
		navbarcollapse.addAttribute('class','collapse navbar-collapse');//id='navbarSupportedContent'
		nav.addChild(navbarcollapse);
		var navbarNav=new Node();
		navbarNav.setNodeName('ul');
		navbarNav.addAttribute('class','navbar-nav mr-auto');
		navbarcollapse.addChild(navbarNav);
		this.menuitems.forEach(
			function(a,b){
				var navbarItem=new Node();
				navbarItem.setNodeName('li');
				navbarItem.addAttribute('class','nav-item');
				var navLink=new Anchor();
				navLink.addAttribute('class','nav-link');
				navLink.setText(a.name);
				navLink.setCmd(a.cmd);
				navbarItem.addChild(navLink);
				navbarNav.addChild(navbarItem);
			}
		);
		var t1=new Date();
		this.log('end: '+(t1-t0)/1000+' s');
		this.cache=nav.toString();
		this.log('toString(): end');
		return this.cache;
	};
	module.exports=menu;
}
