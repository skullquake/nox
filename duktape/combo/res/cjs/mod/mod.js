{
	var mod=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	mod.prototype.src='res/cjs/mod/mod.js';
	mod.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	mod.prototype.data={};
	mod.prototype.exec=function(){
		this.log('exec()');
	}
	mod.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	mod.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	mod.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=mod;
}



