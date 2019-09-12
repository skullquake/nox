{
	var q1=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	q1.prototype.src='res/cjs/cmd/cmd/q1.js';
	q1.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	q1.prototype.data={};
	q1.prototype.exec=function(){
		this.log('exec()');
		return ['q2','q3','q4'];
	}
	q1.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	q1.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	q1.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=q1;
}



