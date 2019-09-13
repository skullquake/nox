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
		this.data.cmd=null;//'home';
		this.data.cmdmap={};
		this.data.cmdmap['error']=new (this.loader.load('error'))(this);
	};
	CtlSes.prototype.src='res/cjs/ctl/ses';
	CtlSes.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	CtlSes.prototype.data={};
	CtlSes.prototype._exec=function(cmd){
		var ret=true;
		var cmdqueue=[];
		this.log('exec()');
		//use old/use query arg
		var qcmd=this.urlUtils.getQueryVariable(request.getQueryString(),'cmd');
		if(this.data.cmd!=null){
			this.log('prvcmd: '+this.data.cmd);
		}else{
			this.log('prvcmd: null');
		}
		if(qcmd!=null){
			this.log('qcmd: '+qcmd);
			this.data.cmd=qcmd;
		}else{
			this.log('qcmd: null');
		}
		this.data.cmd=this.data.cmd==null?'home':this.data.cmd;
		this.log('curcmd: '+this.data.cmd);
		this.err=false;
		if(this.data.cmd!=null){
			if(this.data.cmdmap[this.data.cmd]==null){
				this.log('Caching '+this.data.cmd);
				var Cmd=this.loader.load();
				if(Cmd!=null){
					this.data.cmdmap[this.data.cmd]=new Cmd(this);
				}else{
					this.err=true;
					this.errmsg='cmd '+this.data.cmd+' not found';
					log(this.errmsg);
				}
			}
			if(!this.err){
				try{
					var nxtcmd=this.data.cmdmap[this.data.cmd].exec();
					if(nxtcmd!=null){
						switch(typeof(nxtcmd)){
							case 'string':
								cmdqueue.push(nxtcmd);
								this.log('queueing '+JSON.stringify(cmdqueue));
								break;
							case 'object':
								if(nxtcmd.length>0){
									nxtcmd.forEach(
										function(nxtcmdcmd,nxtcmdcmdidx){
											cmdqueue.push(nxtcmdcmd);
										}
									);
									this.log('queueing '+JSON.stringify(cmdqueue));
								}else{
									this.log('inv cmd ret');
								}
								break;
							default:
								this.log('inv cmd ret');
						}
					}
				}catch(e){
					this.err=true;
					this.errmsg=this.data.cmd+' failed to execute: '+e.toString();
					log(this.errmsg);
				}
			}else{
				cmdqueue=[];
				cmdqueue.push('error');
			}
		}else{
			this.err=true;
			this.errmsg='data.cmd null';
			log(this.errmsg);
			cmdqueue=[];
			cmdqueue.push('error');
		}
		ctx=this;
		//ctx.data.cmd=null;//clear important, loops
		cmdqueue.forEach(
			function(cmd,cmdidx){
				this.log('executing queue item ['+cmd+']');
				try{
					console.log(ctx.data.cmdmap);
					ctx.data.cmdmap[cmd].exec(ctx);
				}catch(e){
					this.err=true;
					this.errmsg='data.cmd null';
					log('executing queue item ['+cmd+'] failed:'+e);
				}
			}
		);
	};
	CtlSes.prototype.exec=function(cmd){
		this._exec(cmd);
		this.update();


		//redir test - now working yet [cmd prvcmd etc]
		/*
		if(
			request.getUrl()!='/'||
			request.getQueryString()!=''
		){
			this.log('redirecting to /');
			_response.setHeader('Content-type','text/html');
			_response.setHeader('Location','/');
			_response.setCode(301);
		}else{
		}
		*/
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
