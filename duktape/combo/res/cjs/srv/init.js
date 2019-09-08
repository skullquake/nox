try{
	console.log("srv.js: initializating database");
	Duktape.modSearch=function(id){
		//res=readFile('res/'+id+'.js');//regular
		res=readFile('res/'+id.split('?')[0]);//cachebusted
		res=new TextDecoder("utf-8").decode(res);
		if(typeof res==='string')
			return res;
		new Error('module not found: '+id);
	};
	var db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
	if(db!=null){
		db.connect("./db/sqlite/test.db3");
		var table='test';
		if(db.db.tableExists(table)){
			console.log("srv.js: Table "+table+" already exists");
		}else{
			console.log("srv.js: Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(id INTEGER PRIMARY KEY, value TEXT)");
			console.log("srv.js: done");
		}
		table="usr";
		if(db.db.tableExists(table)){
			console.log("srv.js: Table "+table+" already exists");
		}else{
			console.log("srv.js: Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(fname TEXT, lname TEXT, login TEXT, pass TEXT)");
			console.log("srv.js: done");
		}

	}else{
		console.log("srv.js: failed to load cjs/db/db.js");
	}
}catch(e){
	console.log("srv.js");
	console.error(e);
}
