module.exports={
	connect:function(p){
		console.log(new Date().getTime()+" cjs/db/db.js:connect()...starting");
		this.db=new Database(p);
		console.log(new Date().getTime()+" cjs/db/db.js:connect()...ending");
	},
	select:function(table,sql,hdr){
		console.log(new Date().getTime()+" cjs/db/db.js:select()...starting");
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
		console.log(new Date().getTime()+" cjs/db/db.js:select()...ending");
	},
	exec:function(sql){
		console.log(new Date().getTime()+" cjs/db/db.js:exec()...starting");
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
		console.log(new Date().getTime()+" cjs/db/db.js:exec()...ending");
		return ret;
	},
	db:null
}
