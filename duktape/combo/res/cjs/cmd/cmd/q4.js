{
	var q4=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	q4.prototype.src='res/cjs/cmd/cmd/q4.js';
	q4.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	q4.prototype.data={};
	q4.prototype.exec=function(){
		this.log('exec()');
		return 'home'
	}
	q4.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	q4.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	q4.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=q4;
}



