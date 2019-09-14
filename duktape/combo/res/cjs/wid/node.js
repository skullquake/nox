{
	var src='res/cjs/wid/node.js';
	/*
	var node=function(p,c){
		this.log('var node=function(p,c);
		for(var i=0;i<this._constructors.length;i++){
			this._constructors[i](p,c,this);
		}
	}
	node.prototype._constructor=function(p,c,_this){
		console.log(new Date().getTime()+': '+src+' test Constructor()');
		var Uuid=require('cjs/util/uuid.js');
		var uuid=new Uuid();
		_this.uuid=uuid.uuidv4();
		_this._children=[];
		if(p!=null){
			p._children.push(_this);
		}
		if(c!=null){
			_this.ctx=c;
		}
		_this._parent=p==null?[]:p;
		_this.log(_this.uuid);
		_this.text='';
		_this.attributes={};
		_this.hidden=false;
		//console.log('ctx: '+_this.src+":"+(_this.ctx!=null));
	};
	node.prototype._constructors=[];
	node.prototype._constructors.push(node.prototype._constructor);
	*/
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
		//var ret=this.data;//{};
		//return ret;
		return {'msg':'unimplemented serializer'};
	}
	node.prototype.setNodeName=function(a){
		this.nodename=typeof(a)=='string'?a:'';
	}
	node.prototype.setCtx=function(c){
		this.ctx=c;
	}
	node.prototype.getCtx=function(){
		return this.ctx;
	}
	node.prototype.setText=function(a){
		this.text=typeof(a)=='string'?a:'';
	}
	node.prototype.hide=function(){
		this.hidden=true;
	}
	node.prototype.show=function(){
		this.hidden=false;
	}
	node.prototype.toggleHidden=function(){
		this.hidden=!this.hidden;
	}
	node.prototype.addAttribute=function(k,v){
		this.log('addAttribute(): start');
		if(typeof(this.attributes)=='undefined'){
			this.attributes={};
		}
		this.attributes[k]=v;
		this.log('addAttribute(): end');
	}
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
	};
	node.prototype.addChild=function(c){
		var ret=c;//for passthrough, e.g. var foo=this.container.addChild(new Node());...
		if(c!=null){
			try{
				c.data._parent=this;
				c.depth=this.depth+1;
				c.ctx=this.ctx;
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
	node.prototype.getParent=function(){
		return this.data._parent;
	}
	node.prototype.getChildren=function(){
		return this._children;
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
	module.exports=node;
}
