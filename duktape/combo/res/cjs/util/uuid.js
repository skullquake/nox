{
	var Uuid=function(p){
		this.log('Constructor()');
	};
	Uuid.prototype.src='res/cjs/util/Uuid.js';
	Uuid.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Uuid.prototype.data={
		lastuuid:null
	};
	Uuid.prototype.uuidv4=function(){
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	};
	Uuid.prototype.toJson=function(){
		var ret=data;
		return ret;
	}
	Uuid.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson,a==null?-1:a,b==null?'':b);
	}
	module.exports=Uuid;
}
