{
	var view=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	view.prototype.src='res/cjs/cmd/cmd/view.js';
	view.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	view.prototype.data={};
	view.prototype.exec=function(){
		this.log('exec()');
	}
	view.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	view.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	view.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=view;
}



