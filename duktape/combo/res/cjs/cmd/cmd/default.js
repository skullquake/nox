{
	var Error=function(){
		this.log('Constructor()');
	};
	Error.prototype.src='res/cjs/cmd/cmd/error.js';
	Error.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Error.prototype.data={};
	Error.prototype.exec=function(){
		this.log('exec()');
		_response.setHeader('Content-type','text/html');
		_response.write('Error');
	}
	Error.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	Error.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Error.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=Error;
}
