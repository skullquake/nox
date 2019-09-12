
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

		/*
<nav class='navbar navbar-expand-lg navbar-light bg-light'>
			  <a class='navbar-brand' href='#'>Navbar</a>
			  <button class='navbar-toggler' type='button' data-toggle='collapse' data-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle naviga
		    <span class='navbar-toggler-icon'></span>
			  </button>

			  <div class='collapse navbar-collapse' id='navbarSupportedContent'>
			    <ul class='navbar-nav mr-auto'>
			      <li class='nav-item active'>
			        <a class='nav-link' href='#'>Home <span class='sr-only'>(current)</span></a>
			      </li>
			      <li class='nav-item'>
			        <a class='nav-link' href='#'>Link</a>
			      </li>
			      <li class='nav-item dropdown'>
			        <a class='nav-link dropdown-toggle' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
			          Dropdown
		        </a>
			        <div class='dropdown-menu' aria-labelledby='navbarDropdown'>
			          <a class='dropdown-item' href='#'>Action</a>
			          <a class='dropdown-item' href='#'>Another action</a>
			          <div class='dropdown-divider'></div>
			          <a class='dropdown-item' href='#'>Something else here</a>
			        </div>
			      </li>
			      <li class='nav-item'>
			        <a class='nav-link disabled' href='#' tabindex='-1' aria-disabled='true'>Disabled</a>
			      </li>
			    </ul>
			    <form class='form-inline my-2 my-lg-0'>
			      <input class='form-control mr-sm-2' type='search' placeholder='Search' aria-label='Search'>
			      <button class='btn btn-outline-success my-2 my-sm-0' type='submit'>Search</button>
			    </form>
			  </div>
			</nav>
		*/


		var Node=require('cjs/wid/node.js');
		var Container=require('cjs/wid/container.js');
		var Anchor=require('cjs/wid/anchor.js');
		var nav=new Node();
		nav.setNodeName('nav');
		nav.addAttribute('class','navbar navbar-expand-lg navbar-light bg-dark');
		var navbarbrand=new Anchor();
		navbarbrand.addAttribute('class','navbar-brand');
		navbarbrand.setCmd(this.cmd);
		nav.addChild(navbarbrand);
		var navbarToggler=new Node();
		navbarToggler.setNodeName('button');
		navbarToggler.addAttribute('class','navbar-toggler');
		navbarToggler.addAttribute('data-toggle','collapse');
		navbarToggler.addAttribute('data-toggle','collapse');
		navbarToggler.addAttribute('data-target','#navbarSupportedContent');
		navbarToggler.addAttribute('aria-controls','navbarSupportedContent');
		navbarToggler.addAttribute('aria-expanded','false');
		navbarToggler.addAttribute('aria-label','Toggle navigation');
		navbarToggler.setText('Home');
		navbarbrand.addChild(navbarToggler);
		var navbarTogglerIcon=new Node();
		navbarTogglerIcon.setNodeName('span');
		navbarTogglerIcon.addAttribute('class','navbar-toggler-icon');
		navbarToggler.addChild(navbarTogglerIcon);
		var navbarcollapse=new Node();
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
		return nav.toString();
	};
	module.exports=menu;
}
