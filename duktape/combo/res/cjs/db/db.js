module.exports={
	log:function(a){
		console.log(new Date().getTime()+" cjs/db/db.js: "+a);
	},
	connect:function(p){
		this.log("connect():starting...");
		this.db=new Database(p);
		this.log("connect():ending...");
	},
	select:function(table,sql,hdr){
		this.log("select():starting...");
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
								console.log(new Date().getTime()+" cjs/db/db.js: "+"table "+table+" does not exist");
							}
						}else{
							console.log("sql null");
						}
					}else{
						console.log("table null");
					}
				}else{
					console.log(new Date().getTime()+" cjs/db/db.js: "+"table "+table+" does not exist");
				}
			}catch(e){
				console.log(new Date().getTime()+" cjs/db/db.js: "+"db null");
			}
		}catch(e){
			console.log(new Date().getTime()+" cjs/db/db.js: "+e);

		}
		return ret;
		this.log("select():ending...");
	},
	exec:function(sql){
		this.log("exec():starting...");
		var ret=false;
		try{
			try{
				if(this.db!=null){
					if(sql!=null){
						try{
							this.db.exec(sql);
							ret=true;
						}catch(e){
							console.log(new Date().getTime()+" cjs/db/db.js: "+e);
						}finally{
						}
					}else{
						console.log(new Date().getTime()+" cjs/db/db.js: "+"sql null");
					}
				}else{
					console.log(new Date().getTime()+" cjs/db/db.js: "+"table "+table+" does not exist");
				}
			}catch(e){
				console.log(new Date().getTime()+" cjs/db/db.js: "+"db null");
			}
		}catch(e){
			console.log(new Date().getTime()+" cjs/db/db.js: "+e);

		}
		this.log("exec():ending...");
		return ret;
	},
	db:null
}
