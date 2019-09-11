{
	var Default=function(){
		this.log('Constructor()');
	};
	Default.prototype.src='res/cjs/cmd/cmd/default.js';
	Default.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Default.prototype.data={};
	Default.prototype.exec=function(m){
		this.log('exec()');
		var ret=false;
		try{
			_response.setHeader('Content-type','text/html');
			_response.write('Error: '+m);
			var ret=true;
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
