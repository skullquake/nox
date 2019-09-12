var t0=new Date();
var Hdl;
var hdl;
function init(){
	log('init()');
	Hdl=typeof(hdl)=='undefined'?require('cjs/ctl/main.js'):Hdl;
	hdl=typeof(hdl)=='undefined'?new Hdl():hdl;
	hdl.exec();
}
function reinit(){
	log('reinit()');
	Duktape.modLoaded={};//unload mods
	Hdl=undefined;
	hdl=undefined;
	init();
}
typeof(hdl)=='undefined'?init():hdl.reinit?reinit():init();//set from cjs/cmd/reinit.js
var t1=new Date();
console.log('Total: '+(t1-t0)/1000);
