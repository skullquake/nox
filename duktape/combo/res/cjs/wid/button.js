{
	var Button=function(p){
		this.log('Constructor()');
		this.parent=p;
	};
	Button.prototype.src='res/cjs/ses/Button.js';
	Button.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Button.prototype.data={
		children:[]
	};
	Button.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Button.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson,a==null?-1:a,b==null?'':b);
	}
	module.exports=Button;
}
