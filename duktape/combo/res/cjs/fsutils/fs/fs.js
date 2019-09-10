console.log("fsutils/fs/fs.js:start:"+new Date().getTime());
var fs;
try{
	Duktape.fin(fsutils_fs.prototype,function(a){
		try {
			delete(a);
			console.log('finalizer, foo ->');//, x.foo);
		} catch (e) {
			console.log('WARNING: finalizer failed (ignoring): ' + e.toString());
		}
	});
	fs=new fsutils_fs();
	fs.test();
	fs=null;
	Duktape.gc();
}catch(e){
	console.error(e);
}
console.log("fsutils/fs/fs.js:end:"+new Date().getTime());
