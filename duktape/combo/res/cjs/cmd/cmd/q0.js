{
	var q0=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	q0.prototype.src='res/cjs/cmd/cmd/q0.js';
	q0.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	q0.prototype.data={};
	q0.prototype.exec=function(){
		this.log('exec()');
		return 'q1';
	}
	q0.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	q0.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	q0.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=q0;
}



