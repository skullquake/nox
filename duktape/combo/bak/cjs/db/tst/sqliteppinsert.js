try{
	console.log("dg::classes::SQLiteCpp::Database::insert()");
	try{
		var db=new Database("./db/sqlite/test.db3");
		var table="test";
		var idx=0;
		if(db.tableExists(table)){
			idx=db.execAndGet('SELECT * FROM test').length;
			for(var i=0;i<32;i++){
				db.exec("INSERT INTO "+table+" VALUES ("+(++idx)+",'"+Math.random()+"')");
			}
		}else{
			console.log("Table "+table+" does not exist");
		}
	}catch(e){
	}
}catch(e){
	console.error(e);

}
