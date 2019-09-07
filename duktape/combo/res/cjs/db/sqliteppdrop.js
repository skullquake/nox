try{
	console.log("dg::classes::SQLiteCpp::Database::drop()");
	try{
		var db=new Database("./db/sqlite/test.db3");
		var table="test";
		var idx=0;
		if(db.tableExists(table)){
			console.log("Dropping "+table+" ...");
			db.exec("DROP TABLE "+table);
			console.log("Done");
		}else{
			console.log("Table "+table+" does not exist");
		}
	}catch(e){
	}
}catch(e){
	console.error(e);

}
