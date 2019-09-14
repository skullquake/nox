{
	var login=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
		var Applogin=require('cjs/app/applogin.js');
		this.applogin=new Applogin(ctlP);
	};
	login.prototype.src='res/cjs/cmd/cmd/login.js';
	login.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	login.prototype.data={};
	login.prototype.exec=function(){
		this.log('exec()');
		this.applogin.exec();
	}
	login.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	login.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	login.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=login;
}



