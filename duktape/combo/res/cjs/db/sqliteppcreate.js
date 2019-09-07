try{
	try{
		var db=new Database("./db/sqlite/test.db3");
		var table="test";
		if(db.tableExists(table)){
			console.log("Table "+table+" already exists");
		}else{
			console.log("Creating table "+table+"...");
			db.exec("CREATE TABLE "+table+"(id INTEGER PRIMARY KEY, value TEXT)");
			console.log("Done");
		}
	}catch(e){
	}
}catch(e){
	console.error(e);
}
