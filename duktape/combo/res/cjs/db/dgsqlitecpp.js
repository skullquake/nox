try{
	console.log("dg::classes::SQLiteCpp::Database:");
	console.log(typeof(Dg_SQLite_Database));
	var dg_SQLite_Database=new Dg_SQLite_Database('foo');
	console.log(dg_SQLite_Database);
	dg_SQLite_Database.bark();
	console.log(dg_SQLite_Database.getName());
}catch(e){
	console.error(e);
}

