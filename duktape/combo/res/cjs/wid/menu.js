{
	var Menu=function(p){
		this.log('Constructor()');
		this.parent=p;
	};
	Menu.prototype.src='res/cjs/ses/Menu.js';
	Menu.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Menu.prototype.data={
		children:[]
	};
	Menu.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Menu.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson,a==null?-1:a,b==null?'':b);
	}
	module.exports=Menu;
}
