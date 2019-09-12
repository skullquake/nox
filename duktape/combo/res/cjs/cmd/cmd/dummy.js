{
	var Dummy=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	Dummy.prototype.src='res/cjs/cmd/cmd/dummy.js';
	Dummy.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Dummy.prototype.data={};
	Dummy.prototype.exec=function(){
		this.log('exec()');
	}
	Dummy.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	Dummy.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Dummy.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=Dummy;
}



