try{
	console.log("srv.js: stopping server...");
	server.stop();
	console.log("srv.js: done");
}catch(e){
	console.log("srv.js");
	console.error(e);
}
