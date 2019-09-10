module.exports={
	db:null,
	connect:function(p){
		this.db=new Database(p);
	},
	select:function(table,sql,hdr){
		hdr=hdr==null?false:hdr;
		var ret=null;
		try{
			try{
				if(this.db!=null){
					if(table!=null){
						if(sql!=null){
							if(this.db.tableExists(table)){
								ret=this.db.execAndGet(sql,hdr);
							}else{
								console.error("table "+table+" does not exist");
							}
						}else{
							console.error("sql null");
						}
					}else{
						console.error("table null");
					}
				}else{
					console.error("table "+table+" does not exist");
				}
			}catch(e){
				console.error("db null");
			}
		}catch(e){
			console.error(e);

		}
		return ret;
	},
	exec:function(sql){
		var ret=false;
		try{
			try{
				if(this.db!=null){
					if(sql!=null){
						try{
							this.db.exec(sql);
							ret=true;
						}catch(e){
							console.error(e);
						}finally{
						}
					}else{
						console.error("sql null");
					}
				}else{
					console.error("table "+table+" does not exist");
				}
			}catch(e){
				console.error("db null");
			}
		}catch(e){
			console.error(e);

		}
		return ret;
	}
}
