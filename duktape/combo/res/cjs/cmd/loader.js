{
	var Loader=function(ctl,pfx){
		this.log('Constructor()');
		this.ctl=ctl;
		this.data.pfx=pfx==null?'cjs/cmd/cmd/':pfx;
		this.data.cmd=this.getPath();
	};
	Loader.prototype.src='res/cjs/cmd/loader.js';
	Loader.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Loader.prototype.data={
	};
	Loader.prototype.update=function(){
		this.data.modified=new Date().getTime();
	};
	Loader.prototype.getPath=function(s){
		this.log('getPath');
		var p=s!=null?s:this.ctl.data.cmd;
		p=p==null?null:(p.lastIndexOf(".")>0?p.substring(0,p.lastIndexOf(".")):p)+'.js';
		return p;
	};
	Loader.prototype.load=function(s){
		this.log('load()');
		this.data.cmd=this.getPath(s!=null?s:null);
		if(this.data.cmd!=null){
			try{
				return require(this.data.pfx+this.data.cmd);
			}catch(e){
				log(e.toString());
			}finally{
			}
		}else{
			log('cmd null');
			return null;
		}
	}
	Loader.prototype.toJson=function(){
		var ret=this.data;
		return ret;
	}
	Loader.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson,a==null?-1:a,b==null?'':b);
	}
	module.exports=Loader;
}
