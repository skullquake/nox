{
	var Node=require('cjs/wid/nodes1.js?nodes2');//fake copy for inheritance
	var nodes2=Node;
	/*
	nodes2.prototype._constructors.push(
		function(p,c,_this){
			_this.log('test Constructor() nodes2');
			_this.log(_this.m0);
			_this.log(_this.m1);
			_this.log(_this.m2);
		}
	);
	nodes2.prototype.src='res/cjs/ses/nodes2.js';
	nodes2.prototype.nodename='div';
	*/
	module.exports=nodes2;
}
