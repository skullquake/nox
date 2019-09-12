{
	var dummy=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	dummy.prototype.src='res/cjs/cmd/cmd/dummy.js';
	dummy.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	dummy.prototype.data={};
	dummy.prototype.exec=function(){
		this.log('exec()');
	}
	dummy.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	dummy.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	dummy.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=dummy;
}



