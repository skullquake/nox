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
	//node.prototype.data={};
	node.prototype.setData=function(a,b){
		if(typeof(this.data)=='undefined')
			this.data={};
		this.data[a]=b;
		return this;
	};//for chaining
	node.prototype.getData=function(a){
		if(typeof(this.data)=='undefined')
			this.data={};
		return this.data[a];
	}
	node.prototype.attributes={};
	node.prototype.hidden=false;
	node.prototype.toJson=function(){
		var attr={};
		var _this=this;
		Object.keys(this.attributes).forEach(
			function(a,b){
				if(a!='style'){
					attr[a]=_this.attributes[a]
				}
			}
		);
		if(typeof(this.attributes['style']=='string'))
			attr["style"]=(this.attributes['style']!=null?this.attributes['style']+';':'')+this.styleAttributesToString();
		return {
			'id':this.uuid,
			'refresh':this.refresh,
			'attr':attr,//this.attributes,
			'onClick':this.hasOnClick,
			'text':this.text
		};
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
		//this.addAttribute('hidden','true');
		return this;
	}
	node.prototype.show=function(){
		this.hidden=false;
		//this.addAttribute('hidden','false');
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
		if(typeof(v)=='undefined'){
			v='';
		}
		this.attributes[k]=v;
		this.log('addAttribute(): end');
		return this;
	};
	node.prototype.addStyleAttribute=function(k,v){
		this.log('addStyleAttribute(): start');
		if(typeof(this.styleattributes)=='undefined'){
			this.styleattributes={};
		}
		if(typeof(v)=='undefined'){
			v='';
		}
		this.styleattributes[k]=v;
		this.log('addStyleAttribute(): end');
		return this;
	};
	node.prototype.getStyleAttribute=function(k){
		this.log('getStyleAttribute(): start');
		if(typeof(this.styleattributes)=='undefined'){
			this.styleattributes={};
		}
		return this.styleattributes[k];
	};

	node.prototype.remAttribute=function(k,v){
		this.log('remAttribute(): start');
		if(typeof(this.attributes)=='undefined'){
			this.attributes={};
		}
		delete this.attributes[k];//=v;
		this.log('remAttribute(): end');
		return this;
	};
	node.prototype.setClass=function(v){//not working
		if(typeof(this.attributes)=='undefined'){
			this.attributes={};
		}
		this.attributes['class']=v;
		return this;//this.setText('qwer');//this.addAttribute('class',v);
	};
	node.prototype.styleAttributesToString=function(){
		var ret='';
		if(typeof(this.styleattributes)=='undefined'){
			this.styleattributes={};
		}
		try{
			var _this=this;
			Object.keys(this.styleattributes).forEach(
				function(a,b){
					ret+=a+':'+_this.styleattributes[a]+';'
				}
			);
		}catch(e){
			console.log(e.toString());
		}
		return ret;

	}

	node.prototype.attributesToString=function(){
		var ret=' ';
		if(typeof(this.attributes['style']=='string'))
			ret+='style="'+(this.attributes['style']!=null?this.attributes['style']:'')+this.styleAttributesToString()+'" ';
		var _this=this;
		Object.keys(this.attributes).forEach(
			function(a,b){
				if(a!='style'){
					ret+=a+'="'+_this.attributes[a]+'" ';
				}
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
				this.ctx==null?this.ctx==_parent.ctx:null;
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
				if(c.ctx==null)c.ctx=this.ctx;//??how to deal
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
						if(a.ctx==null)a.ctx=_this.ctx;
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
	node.prototype.getChild=function(id){//get child from childrenmap via id, recursive, still needs testing
		if(typeof(this.childrenmap)=='undefined'){
			this.childrenmap={};
		}
		var ret=this.childrenmap[id];
		if(typeof(ret)=='undefined'){
			console.log('> NOT FOUND')
			var d=this.getChildren();
			for(var i=0;i<d.length;i++){
				try{
				ret=d[i].getChild(id);
				if(typeof(ret)!='undefined')break;
				}catch(e){
				}
			}
		}else{
			console.log('> FOUND')
		}
		return ret;
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
	node.prototype.hasOnClick=false;
	node.prototype.setOnClick=function(t){
		if(typeof(t)=='function'){
			this.log('setOnClick(): attaching function');
			this.onClick=t;
			this.hasOnClick=true;
			//this.addAttribute('data','true');
			this.addAttribute('data-srvact',true);
			      
		}else{
			this.log('setOnClick(): not a function');
			this.hasOnClick=false;
			this.addAttribute('data-srvact',false);
		}
		console.log(this.attributesToString());
		return this;
	};
	node.prototype.setCmd=function(c){
		this.cmd=c;//==null?'null':typeof(c)=='string':c:typeof(c)=='function':try{c()}catch(e){this.log(e)}finally{'null'};
		return this;
	}
	node.prototype.onClick=function(t){
		if(typeof(t)=='function'){
			this.log('onClick(): executing');
			this.onClick==null?null:this.onClick();
		}else{
			this.log('onClick(): not a function');
		}
	};
	node.prototype.refresh=function(){
		this._refresh=true;//this._refresh==null?false:true;
		this.getDescendents().forEach(
			function(o,oidx){
				o.refresh();
			}
		);
	}
	module.exports=node;
}
