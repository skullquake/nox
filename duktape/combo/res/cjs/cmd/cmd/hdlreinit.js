{
	var ReInitHdlr=function(){
		this.log('Constructor()');
	};
	ReInitHdlr.prototype.src='res/cjs/cmd/cmd/hdlreinit.js';
	ReInitHdlr.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	ReInitHdlr.prototype.data={};
	ReInitHdlr.prototype.exec=function(){
		this.log('exec()');
		//???recurse//try{reinit();}catch(e){};
		this.ctl.ses.hdl.reinit=true;//handled on ep/ctl/mycontroller/hdlr/home
		this.log('ep/ctl/mycontroller/hdlr/home reinitialized');
	}
	ReInitHdlr.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	ReInitHdlr.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	ReInitHdlr.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=ReInitHdlr;
}



