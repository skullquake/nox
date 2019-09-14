{
	var _Node=require('cjs/wid/node.js?form');//fake copy for inheritance
	var form=_Node;
	form.prototype.src='res/cjs/wid/form.js';
	form.prototype.nodename='form';
	form.prototype.init=function(){
		var Node=require('cjs/wid/node.js');//fake orig
		if(this.divFields==null){
			this.divFields=this.addChild(new Node());
			this.divFields.setNodeName('div');
		}
		if(this.divButtons==null){
			this.divButtons=this.addChild(new Node());
			this.divButtons.setNodeName('div');
		}
		var a=this.divButtons.addChild(new Node());
		this.setNodeName='form';
		this.addAttribute('action','');//this.action);
		this.addAttribute('method','get');
		a.addAttribute('type','submit');
		a.addAttribute('class','btn btn-default');
		a.addAttribute('value','submit');//this.ctx==null?'':this.ctx.cmd==null?'':this.ctx.cmd);
		a.setNodeName('input');
	}
	form.prototype.setAction=function(a){
		if(this.inputAction==null){
			var Node=require('cjs/wid/node.js');//fake orig
			this.inputAction=this.addChild(new Node());
			this.inputAction.setNodeName('input');
			this.inputAction.addAttribute('type','hidden');
			this.inputAction.addAttribute('name','cmd');
		}
		if(this.inputId==null&&typeof(this.uuid)=='string'){
			var Node=require('cjs/wid/node.js');//fake orig
			this.inputId=this.addChild(new Node());
			this.inputId.setNodeName('input');
			this.inputId.addAttribute('type','hidden');
			this.inputId.addAttribute('name','id');
			this.inputId.addAttribute('value',this.uuid);
		}
		if(typeof(a)=='string'){
			this.inputAction.addAttribute('name','cmd');
			this.inputAction.addAttribute('value',a);
		}else{
			this.inputAction.addAttribute('name','cmd');
			this.inputAction.addAttribute('value','');
		}
	};
	form.prototype.addField=function(a,b,c){
		if(this.divFields==null){
			this.divFields=this.addChild(new Node());
			this.divFields.setNodeName('div');
		}

		if(typeof(a)=='string'){
			if(this.fieldmap==null){
				this.fieldmap={};
			}
			var inputName=''
			if(typeof(a)=='string'){
				inputName=a;
			}

			var inputType='text'
			if(typeof(b)=='string'){
				inputType=b;
			}
			var inputValue=''
			if(typeof(c)=='string'){
				inputValue=c;
			}
			if(this.fieldmap[a]==null){
				if(this.fieldmap[a]==null){
					this.fieldmap[inputName]={};
				}
				var Node=require('cjs/wid/node.js');//fake orig
				var span=this.divFields.addChild(new Node());
				span.setNodeName('span');
				span.setText(inputName);
				var input=this.divFields.addChild(new Node());
				input.setNodeName('input');
				input.addAttribute('type',inputType);
				input.addAttribute('class','form-control');
				input.addAttribute('name',inputName);
				input.addAttribute('value',inputValue);
				var br=this.divFields.addChild(new Node());
				br.setNodeName('br');
				this.fieldmap[inputName].span=span;
				this.fieldmap[inputName].input=input;
			}else{
				this.fieldmap[a].span.setText(inputName);
				this.fieldmap[a].input.addAttribute('type',inputType);
				this.fieldmap[a].input.addAttribute('name',inputName);
				this.fieldmap[a].input.addAttribute('value',inputValue);

			}
		}else{
			this.log('invalid field name');
		}
	};
	form.prototype.onClick=function(a){
		this._onClick(a);
	}
	module.exports=form;
}
