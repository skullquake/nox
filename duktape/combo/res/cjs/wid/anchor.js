{
	var Node=require('cjs/wid/node.js?anchor');//fake copy for inheritance
	var anchor=Node;
	anchor.prototype.src='res/cjs/ses/anchor.js';
	anchor.prototype.nodename='a';
	anchor.prototype.text='';
	anchor.prototype.setText=function(t){
		this.text=t!=null?t:'';
		return this;
	};
	anchor.prototype.getText=function(){
		return this.text;
	};
	anchor.prototype.setOnClick=function(t){
		if(typeof(t)=='function'){
			this.log('setOnClick(): attaching function');
			this.onClick=t;
		}else{
			this.log('setOnClick(): not a function');
		}
		return this;
	};
	anchor.prototype.setCmd=function(c){
		this.cmd=c;//==null?'null':typeof(c)=='string':c:typeof(c)=='function':try{c()}catch(e){this.log(e)}finally{'null'};
		return this;
	}
	anchor.prototype.onClick=function(t){
		if(typeof(t)=='function'){
			this.log('onClick(): executing');
			this.onClick==null?null:this.onClick();
		}else{
			this.log('onClick(): not a function');
		}
	};
	anchor.prototype.toString=function(idx,idt){
		var ret='';
		if(!this.hidden){
			idt=idt==null?'\t':idt;
			idx=idx==null?0:idx;
			for(var i=0;i<idx;i++)ret+=idt;
			ret+='<a id="'+this.uuid+'" ';
			ret+='href="'+(this.cmd!=null?'/?cmd='+this.cmd+'&id='+this.uuid:'#')+'"';
			ret+=this.attributesToString();
			ret+='>';
			ret+='\n';
			for(var i=0;i<idx+1;i++)ret+=idt;
			ret+=this.text;
			ret+='\n';
			this._children.forEach(function(a,b){
				ret+=a.toString(idx+1,idt);
			});
			for(var i=0;i<idx;i++)ret+=idt;
			ret+='</a>';
			ret+='\n';
		}
		return ret;
	}
	module.exports=anchor;
}
