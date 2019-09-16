{
	var Node=require('cjs/wid/node.js?wid/custom/ajaxtest');
	var ajaxtest=Node;
	ajaxtest.prototype.init=function(){
		var Container=require('cjs/wid/container.js');
		var Anchor=require('cjs/wid/anchor.js');
		var Node=require('cjs/wid/node.js');
		this.setNodeName('div');
		this.progressdata={
			min:0,
			max:100,
			cur:0,
			btns:[],
			nbtns:8
		}
		this.addChild(new Node())
			.setNodeName('script')
			.setText(
				new TextDecoder("utf-8").decode(readFile('./res/wjs/wcli.js'))
			)
		;
		var _this=this;
		var arrbtn=[];
		var progress=
			this
			.addChild(new Node(),'progress')
			.setNodeName('div')
			.setClass('progress')
			.addChild(new Node(),'progressbar')
			.setNodeName('div')
			.setClass('progress-bar progress-bar-striped progress-bar-animated')
			.addAttribute('style','width:25%')
			.addAttribute('aria-valuenow','25')
			.addAttribute('aria-valuemin','0')
			.addAttribute('aria-valuemax','100')
		;
		for(var i=0;i<this.progressdata.nbtns;i++){
			var asdf=i;
			var btn=
			this
			.addChild(new Anchor(),'btn'+i)
				.setCmd(null)
				.setText(i)
				//.setData('idx',''+i)//asdf)//(function(){var ii=i;return i;})())
				.setData('idx',i)//asdf)//(function(){var ii=i;return i;})())
				.addAttribute('class','btn btn-default')
				.addAttribute('href','#')
				.setCtx(this)
				.setOnClick(
					function(){
						try{
							var _this=this;
							this.setText(this.getData('idx'));
							this._parent.progressdata.btns.forEach(
								function(b,bidx){
									b.setClass('btn '+(b.getData('idx')<_this.getData('idx')?'btn-danger':'btn-default'));
									b.refresh();
								}
							);
							var classes=['info','warning','danger','success']
							var _class='danger';
							this.setClass('btn btn-'+_class);
							this._parent.getChild('btn0').refresh();
							this._parent.getChild('progressbar').addAttribute('style','width:'+this.getData('idx')*10+'%;');
							this._parent.getChild('progressbar').refresh();
						}catch(e){
							console.log(e.toString());
						}
					}
				)
			;
			this.progressdata.btns.push(btn);
		}
		return this;
	}
	module.exports=ajaxtest;
}

