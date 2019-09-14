{
	var Default=function(ctlP){
		this.ctl=ctlP;
		this.log('Constructor()');
	};
	Default.prototype.src='res/cjs/cmd/cmd/error.js';
	Default.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Default.prototype.data={};
	Default.prototype.exec=function(){
		this.log('exec()');
		var ret=false;
		try{
			this.ctl.data.cmd=null;//ses.data.msg='Invalid command';
			this.ctl.ses.data.msg="Invalid command";//function(){ses.data.msg;return 'Invalid command';)};
			/*
			_response.setHeader('Content-type','text/html');
			_response.setHeader('Location','/');
			_response.setCode(301);
			*/
			var ret=true;
			return 'home';
		}catch(e){
			ret=false;
		}
		return ret;
	}
	Default.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	Default.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Default.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=Default;
}
