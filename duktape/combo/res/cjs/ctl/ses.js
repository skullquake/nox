{
	var CtlSes=function(ses){
		this.log('Constructor()');
		this.data.created=new Date().getTime();
		this.data.modified=this.data.created;
		var UrlUtils=require('cjs/url/urlutils.js');
		this.urlUtils=new UrlUtils();
		this.ses=ses;
		var Loader=require('cjs/cmd/loader.js');
		this.loader=new Loader(this);
		this.data.cmd='home';
		this.data.cmdmap={};
	};
	CtlSes.prototype.src='res/cjs/ctl/ses';
	CtlSes.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	CtlSes.prototype.data={};
	CtlSes.prototype.exec=function(){
		this.log('exec()');
		this.data.cmd=this.urlUtils.getQueryVariable(request.getQueryString(),'cmd');
		this.data.cmd=this.data.cmd==null?'home':this.data.cmd;
		this.err=false;
		if(this.data.cmd!=null){
			if(this.data.cmdmap[this.data.cmd]==null){
				this.log('Caching '+this.data.cmd);
				var Cmd=this.loader.load();
				if(Cmd!=null){
					var cmd=new Cmd();
					this.data.cmdmap[this.data.cmd]=cmd;
					this.data.cmdmap[this.data.cmd].ctl=this;
				}else{
					this.err=true;
					this.errmsg=this.data.cmd+' not found';
					log(this.errmsg);
				}
			}
			if(!this.err){
				try{
					this.data.cmdmap[this.data.cmd].exec(this);
				}catch(e){
					this.err=true;
					this.errmsg=this.data.cmd+' failed to execute: '+e.toString();
					log(this.errmsg);
				}
			}
		}else{
			this.err=true;
			this.errmsg='data.cmd null';
			log(this.errmsg);
		}
		if(this.err){
			this.log('Loading error handler');
			var Cmd=this.loader.load('error.js');
			var cmd=new Cmd(this);
			if(
				cmd.exec(this.errmsg)
			){
			}else{
				log('failed to execute error handler');
			}
		}
		this.update();
	}
	CtlSes.prototype.update=function(){
		this.data.modified=new Date().getTime();
		this.ses.update();
	}
	CtlSes.prototype.toJson=function(){
		var ret={};
		ret.data=this.data;
		ret.ses=this.ses.data;
		ret.loader=this.loader.data;
		return ret;
	}
	CtlSes.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=CtlSes;
}
