{
	var Node=require('cjs/wid/node.js?container');//fake copy for inheritance
	var container=Node;
	container.prototype.src='res/cjs/ses/container.js';
	container.prototype.nodename='div';
	module.exports=container;
}
