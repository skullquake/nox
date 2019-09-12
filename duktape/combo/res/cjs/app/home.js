{
	var home=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	home.prototype.src='res/cjs/cmd/cmd/home.js';
	home.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	home.prototype.data={};
	home.prototype.exec=function(){
		this.log('exec()');
	}
	home.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	home.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	home.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=home;
}



