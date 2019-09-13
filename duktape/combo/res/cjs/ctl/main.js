{
	var Hdl=function(){
		this.log('Constructor()');
		var Ses=new require('cjs/ses/ses.js');
		var ses=new Ses(this);
		this.ses=ses;
		this.data.created=new Date().getTime();
		this.data.modified=this.data.created;
	};
	Hdl.prototype.src='res/cjs/ctl/main.js';
	Hdl.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Hdl.prototype.data={};
	Hdl.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	Hdl.prototype.exec=function(){
		this.log('exec()');
		this.ses.ctl.exec();
		this.update();
		//this.log(this.toString(0,'\t'));
	}
	Hdl.prototype.toJson=function(){
		var ret={};
		ret.created=this.data.created;
		ret.modified=this.data.modified;
		ret.src=this.src;
		ret.data=this.data;
		ret.ses=this.ses.toJson();
		return ret;
	}
	Hdl.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=Hdl;
}
