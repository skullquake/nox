try{
	console.log("dg::classes::SQLiteCpp::Database::select()");
	try{
		var db=new Database("./db/sqlite/test.db3");
		var table="test";
		if(db.tableExists(table)){
			var result=db.execAndGet('SELECT * FROM test');
			result.forEach(
				function(row,rowidx){
					var line='';
					row.forEach(
						function(col,colidx){
							line+=(col);
							colidx==row.length-1?null:line+='\t';
						}
					);
					console.log(line);
				}
			);
		}else{
			console.error("table "+table+" does not exist");
		}
	}catch(e){
	}
}catch(e){
	console.error(e);

}
