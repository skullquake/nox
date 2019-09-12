{
	var Text=function(p){
		this.log('Constructor()');
		this.parent=p;
	};
	Text.prototype.src='res/cjs/ses/Text.js';
	Text.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Text.prototype.data={
		children:[]
	};
	Text.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Text.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson,a==null?-1:a,b==null?'':b);
	}
	module.exports=Text;
}
