{
	var anchor=function(p){
		this.log('Constructor()');
		this.parent=p;
		var Uuid=require('cjs/util/uuid.js');
		var uuid=new Uuid();
		this.uuid=uuid.uuidv4();
		this._children=[];
		if(p!=null){
			p._children.push(this);
			//this.cmd=this.p.cmd==null?'null':this.p.cmd;
		}
		this._parent=p==null?[]:p;
		this.log(this.uuid);
		this.text='';
	};
	anchor.prototype.src='res/cjs/ses/anchor.js';
	anchor.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	anchor.prototype.data={
		children:[]
	};
	anchor.prototype.toJson=function(){
		var ret={};
		return ret;
	};
	anchor.prototype.setText=function(t){
		this.text=t!=null?t:'';
	};
	anchor.prototype.setOnClick=function(t){
		//calback
		if(typeof(t)='function'){
			this.log('setOnClick(): attaching function');
			this.onClick=t;
		}else{
			this.log('setOnClick(): not a function');
		}
	};
	anchor.prototype.onClick=function(t){
		if(typeof(t)='function'){
			this.log('onClick(): executing');
			this.onClick==null?null:this.onClick();
		}else{
			this.log('onClick(): not a function');
		}
	};
	anchor.prototype.toString=function(idx,idt){
		idt=idt==null?'\t':idt;
		idx=idx==null?0:idx;
		var ret='';
		for(var i=0;i<idx;i++)ret+=idt;
		ret+='<a id="'+this.uuid+'" href="/?cmd='+this.cmd+'&id='+this.uuid+'">';
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
		return ret;
	}
	anchor.prototype.setParent=function(c){
		this.log('setParent(): start');
		if(c!=null){
			try{
				c._children.push(c);
				//this.cmd=this.p.cmd==null?'null':this.p.cmd;
				this._parent=(c);
			}catch(e){
				this.log('setParent(): '+e);
			}
		}else{
			this.log('setParent(): c null');
		}
		this.log('setParent(): done');
	};
	anchor.prototype.addChild=function(c){
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
	anchor.prototype.getParent=function(){
		return this.data._parent;
	}
	anchor.prototype.setCmd=function(c){
		this.cmd=c;//==null?'null':typeof(c)=='string':c:typeof(c)=='function':try{c()}catch(e){this.log(e)}finally{'null'};
	}
	anchor.prototype.getChildren=function(){
		return this._children;
	};
	anchor.prototype.getDescendents=function(){
		//log('getDescendents(): start');
		var ret=[];
		if(this._children!=null){
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
		//log('getDescendents(): end');
		return ret;
	};

	module.exports=anchor;
}
