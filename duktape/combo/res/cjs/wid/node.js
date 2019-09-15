{
	var src='res/cjs/wid/node.js';
	var node=function(p,c){
		this.log('constructor():start');
		var Uuid=require('cjs/util/uuid.js');
		var uuid=new Uuid();
		this.uuid=uuid.uuidv4();
		this._children=[];
		if(p!=null){
			p._children.push(this);
		}
		/*
		if(c!=null){
			this.ctx=c;
		}
		*/
		this._parent=p==null?[]:p;
		this.log(this.uuid);
		this.text='';
		this.attributes={};
		this.hidden=false;
		this.log('constructor():end');
		this.depth=0;
	};
	node.prototype.src=src;
	node.prototype.log=function(a){
		//console.log(new Date().getTime()+' '+this.src+': '+a);
	}
	//node.prototype.ctx=null;
	node.prototype.data={};
	node.prototype.attributes={};
	node.prototype.hidden=false;
	node.prototype.toJson=function(){
		return {'msg':'unimplemented serializer'};
	}
	node.prototype.setNodeName=function(a){
		this.nodename=typeof(a)=='string'?a:'';
		return this;
	}
	node.prototype.setCtx=function(c){
		this.ctx=c;
		return this;
	}
	node.prototype.getCtx=function(){
		return this.ctx;
	}
	node.prototype.setText=function(a){
		this.text=typeof(a)=='string'?a:'';
		return this;
	}
	node.prototype.hide=function(){
		this.hidden=true;
		return this;
	}
	node.prototype.show=function(){
		this.hidden=false;
		return this;
	}
	node.prototype.toggleHidden=function(){
		this.hidden=!this.hidden;
		return this;
	}
	node.prototype.addAttribute=function(k,v){
		this.log('addAttribute(): start');
		if(typeof(this.attributes)=='undefined'){
			this.attributes={};
		}
		this.attributes[k]=v;
		this.log('addAttribute(): end');
		return this;
	};
	node.prototype.setClass=function(v){//not working
		if(typeof(this.attributes)=='undefined'){
			this.attributes={};
		}
		this.attributes['class']=v;
		return this;//this.setText('qwer');//this.addAttribute('class',v);
	};
	node.prototype.attributesToString=function(){
		var ret=' ';
		var _this=this;
		Object.keys(this.attributes).forEach(
			function(a,b){
				ret+=a+'="'+_this.attributes[a]+'" '
			}
		);
		return ret;

	}
	node.prototype.toString=function(idx,idt){
		this.log('toString(): start');
		var ret='';
		if(!this.hidden){
			idt=idt==null?'\t':idt;
			idx=idx==null?0:idx;
			for(var i=0;i<idx;i++)ret+=idt;
			ret+='<'+this.nodename+' id="'+this.uuid+'" '
			ret+=this.attributesToString();
			ret+='>';
			if(this.text!=null&&this.text!=''){
				ret+='\n';
				for(var i=0;i<idx+1;i++)ret+=idt;
				ret+=this.text;
			}
			ret+='\n';
			this._children.forEach(function(a,b){
				ret+=a.toString(idx+1,idt);
			});
			for(var i=0;i<idx;i++)ret+=idt;
			ret+='</'+this.nodename+'>';
			ret+='\n';
		}
		this.log('toString(): end');
		return ret;
	}
	node.prototype.setParent=function(c){
		this.log('setParent(): start');
		if(c!=null){
			try{
				c._children.push(c);
				this._parent=(c);
				this.ctx=_parent.ctx;
			}catch(e){
				this.log('setParent(): '+e);
			}
		}else{
			this.log('setParent(): c null');
		}
		this.log('setParent(): done');
		return this;
	};
	node.prototype.addChild=function(c,id){//todo: id is query spec put on hashmap
		var ret=c;//for passthrough, e.g. var foo=this.container.addChild(new Node());...
		if(c!=null){
			try{
				//c.data._parent=this;
				c._parent=this;
				c.depth=this.depth+1;
				c.ctx=this.ctx;
				if(typeof(id)=='string'){
					if(typeof(this.childrenmap)=='undefined'){
						this.childrenmap={};
					}
					this.childrenmap[id]=c;
				}
				this._children.push(c);
				var _this=this;
				this.getDescendents().forEach(
					function(a,b){
						a.ctx=_this.ctx;
					}
				);
			}catch(e){
			}
		}else{
			this.log('addChild(): c null');
		}
		return ret;
	};
	node.prototype.addSibling=function(c){//todo
	};
	node.prototype.addSiblingBefore=function(c){//todo
	};
	node.prototype.getParent=function(){
		return this.data._parent;
	}
	node.prototype.getChildren=function(){
		return this._children;
	};
	node.prototype.getChild=function(id){//get child from childrenmap via id
		if(typeof(this.childrenmap)=='undefined'){
			this.childrenmap={};
		}
		return this.childrenmap[id];
	};
	node.prototype.getDescendents=function(){
		var ret=[];
		//log('getDescendents(): start');
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
	/*
	node.prototype.onClick=function(t){
		if(typeof(t)=='function'){
			this.log('onClick(): executing');
			this.onClick==null?null:this.onClick();
		}else{
			this.log('onClick(): not a function');
		}
		return this;
	};
	*/

	module.exports=node;
}
