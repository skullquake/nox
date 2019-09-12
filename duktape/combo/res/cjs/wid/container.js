{
	var container=function(p){
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
	};
	container.prototype.src='res/cjs/ses/container.js';
	container.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	container.prototype.data={
	};
	container.prototype.toJson=function(){
		//var ret=this.data;//{};
		//return ret;
		return {'msg':'unimplemented serializer'};
	}
	container.prototype.toString=function(idx,idt){
		idt=idt==null?'\t':idt;
		idx=idx==null?0:idx;
		var ret='';
		for(var i=0;i<idx;i++)ret+=idt;
		ret+='<div id="'+this.uuid+'">';
		ret+='\n';
		this._children.forEach(function(a,b){
			ret+=a.toString(idx+1,idt);
		});
		for(var i=0;i<idx;i++)ret+=idt;
		ret+='</div>';
		ret+='\n';
		return ret;
	}
	container.prototype.setParent=function(c){
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
	container.prototype.addChild=function(c){
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
	container.prototype.getParent=function(){
		return this.data._parent;
	}
	container.prototype.getChildren=function(){
		return this._children;
	};
	container.prototype.getDescendents=function(){
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
	module.exports=container;
}
