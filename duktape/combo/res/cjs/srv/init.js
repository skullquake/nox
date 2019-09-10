try{
	console.log("cjs/srv/init.js: starting..");
	console.log("cjs/srv/init.js: \n\tenv: "+Duktape.env);
	function dump() {
		var i,t;
		for(i=-1;;i--){
			t=Duktape.act(i);
			if(!t){break;}
			print(i,t.lineNumber,t.function.name,Duktape.enc('jx',t));
		}
	}
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
			console.log("cjs/srv/init.js: Table "+table+" already exists");
		}else{
			console.log("cjs/srv/init.js: Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(id INTEGER PRIMARY KEY, value TEXT)");
			console.log("cjs/srv/init.js: done");
		}
		table="usr";
		if(db.db.tableExists(table)){
			console.log("cjs/srv/init.js: Table "+table+" already exists");
		}else{
			console.log("cjs/srv/init.js: Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(fname TEXT, lname TEXT, login TEXT, pass TEXT)");
			console.log("cjs/srv/init.js: done");
		}
		table='insight_weather';
		if(db.db.tableExists(table)){
			console.log("cjs/srv/init.js: Table "+table+" already exists");
		}else{
			console.log("cjs/srv/init.js: Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
			console.log("cjs/srv/init.js: done");
		}
		table='apod';
		if(db.db.tableExists(table)){
			console.log("cjs/srv/init.js: Table "+table+" already exists");
		}else{
			console.log("cjs/srv/init.js: Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
			console.log("cjs/srv/init.js: done");
		}

		if(false){
				//test creation
			var arr_dbnam=[];
			for(var i=0;i<32;i++){
				arr_dbnam.push("tstdb_"+i);
			}
			arr_dbnam.forEach(
				function(dbnam,dbnamidx){
					table=dbnam;
					if(db.db.tableExists(table)){
						console.log("cjs/srv/init.js: Table "+table+" already exists");
					}else{
						console.log("cjs/srv/init.js: Creating table "+table);
						db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
						console.log("cjs/srv/init.js: done");
					}
				}
			);
				//test creation - cleanup
			arr_dbnam.forEach(
				function(dbnam,dbnamidx){
					table=dbnam;
					if(db.db.tableExists(table)){
						console.log("cjs/srv/init.js: Dropping table "+table);
						db.exec("DROP TABLE IF EXISTS "+table);
						console.log("cjs/srv/init.js: done");
					}else{
						console.log("cjs/srv/init.js: Table "+table+" does not exist");
					}
				}
			);
		}
	}else{
		console.log("cjs/srv/init.js: failed to load cjs/db/db.js");
	}
	//https://duktape.org/guide.html#builtin-duktape-thread
	///https://wiki.duktape.org/howtofinalization
	//dump();
	//Duktape.gc();
	//dump();
	//var currFin = Duktape.fin(new String())//db.db);
	//console.log(currFin);
	console.log("cjs/srv/init.js: ending..");
}catch(e){
	console.log("cjs/srv/init.js: Error:");
	console.error(e);
}
