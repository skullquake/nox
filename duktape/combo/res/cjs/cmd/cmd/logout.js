{
	var logout=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	logout.prototype.src='res/cjs/cmd/cmd/logout.js';
	logout.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	logout.prototype.data={};
	logout.prototype.exec=function(){
		this.log('exec()');
		//this.applogin.exec();
		return 'login';
	}
	logout.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	logout.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	logout.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=logout;
}



