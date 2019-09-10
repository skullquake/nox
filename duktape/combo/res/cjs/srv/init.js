try{
	console.log(new Date().getTime()+" cjs/srv/init.js: starting..");

	Duktape.modSearch=function(id){
		//res=readFile('res/'+id+'.js');//regular
		res=readFile('res/'+id.split('?')[0]);//cachebusted
		res=new TextDecoder("utf-8").decode(res);
		if(typeof res==='string')
			return res;
		new Error('module not found: '+id);
	};

	console.log(new Date().getTime()+" cjs/srv/init.js:ver: "+(Math.floor(Duktape.version/10000))+'.'+(Math.floor(Duktape.version/100))+'.'+(Duktape.version%100));
	console.log(new Date().getTime()+" cjs/srv/init.js:env: "+Duktape.env);
	console.log(new Date().getTime()+" cjs/srv/init.js:loading modules...");
	var db=require('cjs/db/db.js?cachebust='+new Date().getTime());
	console.log(new Date().getTime()+" cjs/srv/init.js:"+(JSON.stringify(Duktape.modLoaded)));
	console.log(new Date().getTime()+" cjs/srv/init.js:loading modules done...");
	if(db!=null){
		db.connect("./db/sqlite/test.db3");
		var table='test';
		if(db.db.tableExists(table)){
			console.log(new Date().getTime()+" cjs/srv/init.js: Table "+table+" already exists");
		}else{
			console.log(new Date().getTime()+" cjs/srv/init.js: Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(id INTEGER PRIMARY KEY, value TEXT)");
			console.log(new Date().getTime()+" cjs/srv/init.js: done");
		}
		table="usr";
		if(db.db.tableExists(table)){
			console.log(new Date().getTime()+" cjs/srv/init.js: Table "+table+" already exists");
		}else{
			console.log(new Date().getTime()+" cjs/srv/init.js: Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(fname TEXT, lname TEXT, login TEXT, pass TEXT)");
			console.log(new Date().getTime()+" cjs/srv/init.js: done");
		}
		table='insight_weather';
		if(db.db.tableExists(table)){
			console.log(new Date().getTime()+" cjs/srv/init.js: Table "+table+" already exists");
		}else{
			console.log(new Date().getTime()+" cjs/srv/init.js: Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
			console.log(new Date().getTime()+" cjs/srv/init.js: done");
		}
		table='apod';
		if(db.db.tableExists(table)){
			console.log(new Date().getTime()+" cjs/srv/init.js: Table "+table+" already exists");
		}else{
			console.log(new Date().getTime()+" cjs/srv/init.js: Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
			console.log(new Date().getTime()+" cjs/srv/init.js: done");
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
						console.log(new Date().getTime()+" cjs/srv/init.js: Table "+table+" already exists");
					}else{
						console.log(new Date().getTime()+" cjs/srv/init.js: Creating table "+table+"...");
						db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
						console.log(new Date().getTime()+" cjs/srv/init.js: done");
					}
				}
			);
				//test creation - cleanup
			arr_dbnam.forEach(
				function(dbnam,dbnamidx){
					table=dbnam;
					if(db.db.tableExists(table)){
						console.log(new Date().getTime()+" cjs/srv/init.js: Dropping table "+table+"...");
						db.exec("DROP TABLE IF EXISTS "+table);
						console.log(new Date().getTime()+" cjs/srv/init.js: done");
					}else{
						console.log(new Date().getTime()+" cjs/srv/init.js: Table "+table+" does not exist");
					}
				}
			);
		}
	}else{
		console.log(new Date().getTime()+" cjs/srv/init.js: failed to load  cjs/db/db.js");
	}
	console.log(new Date().getTime()+" cjs/srv/init.js: ending..");
	var util=require('cjs/util/duk.js?cachebust='+new Date().getTime());
	//util.dump();
}catch(e){
	console.log(new Date().getTime()+" cjs/srv/init.js: Error:");
	console.error(e);
}
