/*
 *
If you want the root of your module's export to be a function (such as a constructor) or if you want to export a complete object in one assignment instead of building it one property at a time, assign it to module.exports instead of exports.
this.exports = {
	'foo':1,
	'bar':2,
	'baz':3,
};
this.exports = {
	'foo':4,
	'bar':5,
	'baz':6,
};
	//just foo overwritten
this.foo=7;
	//just bar overwritten
exports.bar=8;
	//just baz overwritten
module.exports.baz=9;
	//just foo overwritten
this.baz=10
	//just bar overwritten
exports.bar=11;
	//just foo overwritten
module.exports.foo=12;
	//foo bar and baz overwritten
module.exports={
	'foo':13,
	'bar':14,
	'baz':15
}
	//bar and baz removed
module.exports={
	'foo':16
}
	//reset
module.exports.foo=1;
module.exports.bar=2;
module.exports.baz=3;
*/

//compare the following

//module.exports={
//	'foo':1,
//	'bar':2,
//	'baz':3
//}
/*
(function(exports){
	'use strict';
	//this=exports;
	console.log(new Date().getTime()+' cjs/ctl/main.js: exporting')
	// will not pollute the global context
	var module="module.js";
	// will export everywhere the `method` function
	exports.foo=332;
	exports.bar=4;
	exports.baz=5;
	const a=3;
	exports.basdf=a;
	return {};
	exports=function(){}
})(this)
*/
module.exports=function(width) {
	  return {
		      area: function() {
			            return width * width;
			          }
		    };
}
