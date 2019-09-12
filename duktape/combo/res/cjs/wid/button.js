{
	var button=function(p){
		this.log('Constructor()');
		this.parent=p;
		var Uuid=require('cjs/util/uuid.js');
		var uuid=new Uuid();
		this.uuid=uuid.uuidv4();
		this._children=[];
		if(p!=null){
			p._children.push(this);
		}
		this._parent=p==null?[]:p;
		this.log(this.uuid);
		this.text='';

	};
	button.prototype.src='res/cjs/ses/button.js';
	button.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	button.prototype.data={
		children:[]
	};
	button.prototype.toJson=function(){
		var ret={};
		return ret;
	};
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
		ret+='<button id="'+this.uuid+'">';
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
	button.prototype.setParent=function(c){
		this.log('setParent(): start');
		if(c!=null){
			try{
				c._children.push(c);
				this._parent=(c);
			}catch(e){
				this.log('setParent(): '+e);
			}
		}else{
			this.log('setParent(): c null');
		}
		this.log('setParent(): done');
	};
	button.prototype.addChild=function(c){
		this.log('addChild(): start');
		if(c!=null){
			this.log('a');
			try{
				c.data._parent=this;
				this._children.push(c);
				this.log('b');
			}catch(e){
				this.log('c');
				this.log('addChild(): '+e);
			}
		}else{
			this.log('addChild(): c null');
		}
		this.log('addChild(): done');
	};
	button.prototype.getParent=function(){
		return this.data._parent;
	}
	button.prototype.getChildren=function(){
		return this._children;
	};
	button.prototype.getDescendents=function(){
		var ret=[];
		if(this.data.children!=null){
			this._children.forEach(
				function(a,b){
					ret.push(a);
					var dd=a.getDescendents();
					if(dd!=null){
						dd.forEach(
							function(c,d){
								ret.push(c);
							}
						);
					}
				}
			);
		}
		return ret;
	};
	module.exports=button;
}
