{
	var pg=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	pg.prototype.src='res/cjs/cmd/cmd/pg.js';
	pg.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	pg.prototype.data={};
	pg.prototype.exec=function(){
		this.log('exec()');
	}
	pg.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	pg.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	pg.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=pg;
}



