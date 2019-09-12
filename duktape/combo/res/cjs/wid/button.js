{
	var Node=require('cjs/wid/node.js?button');
	var button=Node;
	//button.prototype.src='res/cjs/ses/button.js';
	//var _ctor=Node.constructor;
	//button.constructor=function(){console.log('xxxxxxxxxxxxxxxxxxxxx');};
	button.prototype.text='';
	button.prototype.src='res/cjs/ses/button.js';
	button.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	button.prototype.setText=function(t){
		this.text=t!=null?t:'';
	};
	button.prototype.setOnClick=function(t){
		//calback
		if(typeof(t)='function'){
			this.log('setOnClick(): attaching function');
			this.onClick=t;
		}else{
			this.log('setOnClick(): not a function');
		}
	};
	button.prototype.onClick=function(t){
		if(typeof(t)='function'){
			this.log('onClick(): executing');
			this.onClick==null?null:this.onClick();
		}else{
			this.log('onClick(): not a function');
		}
	};
	button.prototype.toString=function(idx,idt){
		idt=idt==null?'\t':idt;
		idx=idx==null?0:idx;
		var ret='';
		for(var i=0;i<idx;i++)ret+=idt;
		ret+='<button class="btn btn-default" id="'+this.uuid+'">';
		ret+='\n';
		for(var i=0;i<idx+1;i++)ret+=idt;
		ret+=this.text;
		ret+='\n';
		this._children.forEach(function(a,b){
			ret+=a.toString(idx+1,idt);
		});
		for(var i=0;i<idx;i++)ret+=idt;
		ret+='</button>';
		ret+='\n';
		return ret;
	}

	module.exports=button;
}
