var log=function(a){console.log(new Date().getTime()+" cjs/srv/init.js: "+a);}
try{
	log("starting..");
	Duktape.modSearch=function(id){
		//res=readFile('res/'+id+'.js');//regular
		res=readFile('res/'+id.split('?')[0]);//cachebusted
		res=new TextDecoder("utf-8").decode(res);
		if(typeof res==='string')
			return res;
		new log('module not found: '+id);
	};
	var build=new buildutils_build();
	log("bldnum: "+build.getBuildNumber());
	log("blddat: "+build.getBuildDate());
	log("dukver: "+(Math.floor(Duktape.version/10000))+'.'+(Math.floor(Duktape.version/100))+'.'+(Duktape.version%100));
	log("dukenv: "+Duktape.env);
	log("loading modules...");
	var db=require('cjs/db/db.js?cachebust='+new Date().getTime());
	log(JSON.stringify(Duktape.modLoaded));
	log("loading modules done...");
	if(db!=null){
		db.connect("./db/sqlite/test.db3");
		var table='test';
		if(db.db.tableExists(table)){
			log("Table "+table+" already exists");
		}else{
			log("Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(id INTEGER PRIMARY KEY, value TEXT)");
			log("done");
		}
		table="usr";
		if(db.db.tableExists(table)){
			log("Table "+table+" already exists");
		}else{
			log("Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(fname TEXT, lname TEXT, login TEXT, pass TEXT)");
			log("done");
		}
		table='insight_weather';
		if(db.db.tableExists(table)){
			log("Table "+table+" already exists");
		}else{
			log("Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
			log("cjs/srv/init.js: done");
		}
		table='apod';
		if(db.db.tableExists(table)){
			log("Table "+table+" already exists");
		}else{
			log("Creating table "+table);
			db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
			log("done");
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
						log("Table "+table+" already exists");
					}else{
						log("Creating table "+table+"...");
						db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
						log("done");
					}
				}
			);
				//test creation - cleanup
			arr_dbnam.forEach(
				function(dbnam,dbnamidx){
					table=dbnam;
					if(db.db.tableExists(table)){
						log("Dropping table "+table+"...");
						db.exec("DROP TABLE IF EXISTS "+table);
						log("done");
					}else{
						log("Table "+table+" does not exist");
					}
				}
			);
		}
	}else{
		log("failed to load  cjs/db/db.js");
	}
	log("ending..");
	var util=require('cjs/util/duk.js?cachebust='+new Date().getTime());
	//util.dump();
}catch(e){
	log("Error:");
	console.error(e);
}
