{
	var q2=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	q2.prototype.src='res/cjs/cmd/cmd/q2.js';
	q2.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	q2.prototype.data={};
	q2.prototype.exec=function(){
		this.log('exec()');
	}
	q2.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	q2.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	q2.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=q2;
}



