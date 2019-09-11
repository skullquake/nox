//log=function(a){console.log(new Date().getTime()+' /cjs/ep/ctl/mycontroller/hdlr/home.js: '+a);}
log('start');
Duktape.modLoaded={};//unload mods
var Hdl=require('cjs/ctl/main.js');
var hdl=new Hdl(8);
/*
*/
log(hdl);
log(hdl.area());
log('end');
