{
	var q3=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	q3.prototype.src='res/cjs/cmd/cmd/q3.js';
	q3.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	q3.prototype.data={};
	q3.prototype.exec=function(){
		this.log('exec()');
	}
	q3.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	q3.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	q3.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=q3;
}



