{
	var Table=function(p){
		this.log('Constructor()');
		this.parent=p;
	};
	Table.prototype.src='res/cjs/ses/Table.js';
	Table.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Table.prototype.data={
		children:[]
	};
	Table.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Table.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson,a==null?-1:a,b==null?'':b);
	}
	module.exports=Table;
}
