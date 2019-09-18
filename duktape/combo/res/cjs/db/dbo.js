{
	/* database object */
	var dbo=function(){
		this.log('ctor:s');
		this.log('ctor:e');
	};
	dbo.prototype.valid=false;
	dbo.prototype.src='cjs/db/dbo.js';
	dbo.prototype.log=function(a){
		console.log(new Date().getTime()+': '+this.src+": "+a);
	}
	dbo.prototype.init=function(){
		this.log('init:s');
		this.log('init:e');
	};
	dbo.prototype.setup=function(a){
		this.log('setup:s');
		var arrmsg=[];;
		if(typeof(a)=='object'){
			typeof(a.db)=='string'?arrmsg.push('a.db not string'):null;
			a.db.length>0?arrmsg.push('a.db.length 0'):null;
			typeof(a.tbl)=='string'?arrmsg.push('a.tbl not string'):null;
			a.tbl.length>0?arrmsg.push('a.tbl.length 0'):null;
			this.valid=arrmsg.length==0?true:false;
			if(this.valid){
				//test if database exists
				//test if table exists
			}
		}else{
		}
		if(!this.valid){
			this.log('setup:invalid conf');
			var _this=this;
			arrmsg.forEach(
				function(b,c){
					_this.log('setup:'+b)
				}
			);
		}
		this.log('setup:e');
	};
	dbo.prototype.connect=function(a){
		this.log('connect:s');
		if(this.valid){
			if(typeof(a)='object'){
				this.valid=
					typeof(a.db)!='undefined'&&
					typeof(a.tbl)!='undefined'
				;

			}else{
				this.log('connect:invalid arg');
			}
		}else{
			this.log('connect:setup invalid');
		}
		this.log('connect:e');
	};

	module.exports=dbo;
}
