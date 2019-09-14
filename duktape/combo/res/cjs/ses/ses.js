{
	var Ses=function(hdl){
		this.log('Constructor()');
		this.data.sessid=request.getCookie('sessid','');
		this.data.created=new Date().getTime();
		this.data.modified=this.data.created;
		this.data.ual=0;
		var CtlSes=new require('cjs/ctl/ses.js');
		var ctlSes=new CtlSes(this);
		this.ctl=ctlSes;
		this.hdl=hdl;

	};
	Ses.prototype.src='res/cjs/ses/ses.js';
	Ses.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Ses.prototype.data={
		sessid:null,		//session id
		created:null,		//created timestamp
		modified:null,		//modified timestamp
		ual:null,		//user access level, see incual(),decual()
	};
	Ses.prototype.incual=function(){
		this.data.ual++;
	};
	Ses.prototype.decual=function(){
		this.data.ual>0?this.data.ual--:0;
	};
	Ses.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	Ses.prototype.toJson=function(){
		var ret={};
		ret.sessid=this.data.sessid;
		ret.created=this.data.created;
		ret.modified=this.data.modified;
		ret.ctl=this.ctl.toJson();
		return ret;
	}
	Ses.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson,a==null?-1:a,b==null?'':b);
	}
	module.exports=Ses;
}
