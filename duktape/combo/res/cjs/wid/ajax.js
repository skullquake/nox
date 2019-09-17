{
	var Node=require('cjs/wid/node.js?wid_ajax');
	var ajax=Node;
	ajax.prototype.init=function(){
		console.log('ajax.prototype.init=function():start');
		this
			.setNodeName('div')
		;
		this.progressdata={
			min:0,
			max:100,
			cur:0,
			btns:[],
			nbtns:16
		}
		//this.setCtx();//is own root, for getting proto functions
		var Container=require('cjs/wid/container.js');
		var Script=require('cjs/wid/script.js');
		this.tpljs=new TextDecoder('utf8').decode(readFile('./res/tpl/wcli.js'));
		//this.jstpl='qwer';//new TextDecoder("utf-8").decode(readFile('./res/tpl/page.html'))
		this.script=
			this
			.addChild(new Script())
		;
		console.log('ajax.prototype.init=function():end');
		return this;
	}
	ajax.prototype.putToken=function(k,v){
		if(typeof(this.tokens)=='undefined'){
			this.tokens={};
		}
		if(typeof(k)=='string'){
			if(typeof(v)=='undefined'){
				this.log('defaulting value to empty string');
				v='';
			}
			this.tokens[k]=v;
		}else{
			this.log('invalid key type');
		}
		return this;
	};
	ajax.prototype.getToken=function(k){
		if(typeof(this.tokens)=='undefined'){
			this.tokens={};
		}
		if(typeof(k)=='string'){
			return this.tokens[k];
		}else{
			this.log('invalid key type');
			return null;
		}
		return null;
	}
	ajax.prototype.toString=function(idx,idt){
		var ret='';
		this.log('toString(): start');
		if(typeof(this.tokens)=='undefined'){
			this.tokens={};
		}
		if(!this.hidden){
			var _this=this;
			var _text=this.tpljs;
			Object.keys(this.tokens).forEach(
				function(t,tidx){
					_text=_text.replace(
						t,
						_this.tokens[t]
					);
				}
			);
			this.script.setText(_text);

			idt=idt==null?'\t':idt;
			idx=idx==null?0:idx;
			for(var i=0;i<idx;i++)ret+=idt;
			ret+='<'+this.nodename+' id="'+this.uuid+'" '
			ret+=this.attributesToString();
			ret+='>';
			if(this.text!=null&&this.text!=''){
				ret+='\n';
				for(var i=0;i<idx+1;i++)ret+=idt;
				ret+='qwer';//_text;
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

	module.exports=ajax;
}


