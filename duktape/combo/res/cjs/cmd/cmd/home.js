{
	var Home=function(){
		this.log('Constructor()');
	};
	Home.prototype.src='res/cjs/cmd/cmd/home.js';
	Home.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Home.prototype.data={};
	Home.prototype.exec=function(){
		this.log('exec()');
		console.log('----------------------------------------');
		this.log(this.ctl.src);
		this.log(this.ctl.ses.src);
		this.log(this.ctl.ses.hdl.src);
		_response.setHeader('Content-type','text/html');
		_response.write('Home'+this.ctl.ses.data.msg);
		console.log('----------------------------------------');
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



