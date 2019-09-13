{
	var Home=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
		var AppHome=require('cjs/app/apphome.js');
		this.appHome=new AppHome(ctlP);
	};
	Home.prototype.src='res/cjs/cmd/cmd/home.js';
	Home.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Home.prototype.data={};
	Home.prototype.exec=function(){
		this.log('exec()');
		console.log(this.appHome);
		this.appHome.exec();
	}
	Home.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	Home.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Home.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=Home;
}



