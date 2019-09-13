{
	/*
	nodes0.prototype._constructors.push(
		function(p,c,_this){
			_this.log('test Constructor() nodes0');
			_this.log(this.m0);
			_this.log(this.m1);
			_this.log(this.m2);
		}
	);
	nodes0.constructor=function(){
		this.m0='___m0';
		this.m1='___m1';
		this.m2='___m2';
	}
	*/
	var Node=require('cjs/wid/node.js?nodes0');//fake copy for inheritance
	var nodes0=Node;
	//nodes0.prototype.getDescendents='foo';
	nodes0.prototype.getParent='foo';
	nodes0.prototype.src='res/cjs/ses/nodes0.js';
	nodes0.prototype.nodename='div';
	module.exports=nodes0;
}
