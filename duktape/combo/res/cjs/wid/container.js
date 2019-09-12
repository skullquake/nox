{
	var Container=function(p){
		this.log('Constructor()');
		var Uuid=require('cjs/util/uuid.js');
		this.uuid=new Uuid();
		this.data.id=this.uuid.uuidv4();
		this.data._children=[];
		if(p!=null){
			p.data._children.push(this);
		}
		this.data._parent=p==null?[]:p;
	};
	Container.prototype.src='res/cjs/ses/Container.js';
	Container.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Container.prototype.data={
		_children:[]
	};
	Container.prototype.toJson=function(){
		var ret=this.data;//{};
		return ret;
	}
	Container.prototype.toString=function(){
		var ret='';
		ret+='<div id="'+this.data.id+'">\n';
		this.data._children.forEach(function(a,b){
			//console.log(a.data._children);
			//ret+='\t'+a.toString()+'\n';
		});
		ret+='</div>';
		return ret;
		/*
		return JSON.toString(this.toJson());//ret;
		*/
	}
	module.exports=Container;
}
