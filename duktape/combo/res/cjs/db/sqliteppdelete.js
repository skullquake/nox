try{
	console.log("dg::classes::SQLiteCpp::Database::delete()");
	try{
		var db=new Database("./db/sqlite/test.db3");
		var table="test";
		var idx=0;
		if(db.tableExists(table)){
			db.exec("DELETE FROM "+table);
		}else{
		}
	}catch(e){
	}
}catch(e){
	console.error(e);

}
