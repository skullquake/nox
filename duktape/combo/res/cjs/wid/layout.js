{
	var Layout=function(p){
		this.log('Constructor()');
		this.parent=p;
	};
	Layout.prototype.src='res/cjs/ses/Layout.js';
	Layout.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Layout.prototype.data={
		children:[]
	};
	Layout.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Layout.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson,a==null?-1:a,b==null?'':b);
	}
	module.exports=Layout;
}
