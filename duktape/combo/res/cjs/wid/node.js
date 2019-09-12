{
	var node=function(p){
		this.log('Constructor()');
		var Uuid=require('cjs/util/uuid.js');
		var uuid=new Uuid();
		this.uuid=uuid.uuidv4();
		this._children=[];
		if(p!=null){
			p._children.push(this);
		}
		this._parent=p==null?[]:p;
		this.log(this.uuid);
		this.attributes=[];
	};
	node.prototype.src='res/cjs/wid/node.js';
	node.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	node.prototype.data={
	};
	node.prototype.toJson=function(){
		//var ret=this.data;//{};
		//return ret;
		return {'msg':'unimplemented serializer'};
	}
	node.prototype.addAttribute=function(k,v){
		this.attributes.push(
			{
				'k':k,
				'v':v
			}
		);
	}
	node.prototype.toString=function(idx,idt){
		idt=idt==null?'\t':idt;
		idx=idx==null?0:idx;
		var ret='';
		for(var i=0;i<idx;i++)ret+=idt;
		ret+='<'+this.nodename+' id="'+this.uuid+'"'
		this.attributes.forEach(
			function(a,b){
				ret+=a.k+'="'+a.v+'" '
			}
		);
		ret+='>';
		ret+='\n';
		this._children.forEach(function(a,b){
			ret+=a.toString(idx+1,idt);
		});
		for(var i=0;i<idx;i++)ret+=idt;
		ret+='</'+this.nodename+'>';
		ret+='\n';
		return ret;
	}
	node.prototype.setParent=function(c){
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
	node.prototype.addChild=function(c){
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
	node.prototype.getParent=function(){
		return this.data._parent;
	}
	node.prototype.getChildren=function(){
		return this._children;
	};
	node.prototype.getDescendents=function(){
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
	module.exports=node;
}
