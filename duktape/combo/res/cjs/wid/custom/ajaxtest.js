{
	var Node=require('cjs/wid/node.js?wid/custom/ajaxtest');
	var ajaxtest=Node;
	ajaxtest.prototype.init=function(){
		this.setCtx(this);//is own root, for getting proto functions
		var Container=require('cjs/wid/container.js');
		var Anchor=require('cjs/wid/anchor.js');
		var Node=require('cjs/wid/node.js');
		var Script=require('cjs/wid/script.js');
		this.setNodeName('div');
		this.progressdata={
			min:0,
			max:100,
			cur:0,
			btns:[],
			nbtns:16
		}
		/*
		this.addChild(new Node())
			.setNodeName('script')
			.setText(
				new TextDecoder("utf-8").decode(readFile('./res/wjs/wcli.js'))
			)
		;
		*/
		this.script=
			this
			.addChild(new Script())
			.init('./res/wjs/wcli.js')
		;
		var _this=this;
		var arrbtn=[];
		var colorcontainer=
			this
			.addChild(new Container())
		;
		for(var i=0;i<96;i++){
			var color=this.HSVToRGB(i/96,1.0,1.0);
			color[0]=color[0]*255;
			color[1]=color[1]*255;
			color[2]=color[2]*255;
			var colorstring='rgba('+color.join(',')+',1.0)';
			colorcontainer.addChild(new Container())
				.addAttribute('style','width:1%;height:8px;background:'+colorstring+';');
		}
		colorcontainer.addAttribute('style','display:flex');
		var progress=
			this
			.addChild(new Node(),'progress')
			.setNodeName('div')
			.setClass('progress')
			.addChild(new Node(),'progressbar')
			.setNodeName('div')
			.setClass('progress-bar progress-bar-striped progress-bar-animated')
			.addAttribute('style','width:0%')
			.addAttribute('aria-valuenow','0')
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
				.setData('idx',i)
				.addAttribute('class','btn btn-default')
				.addAttribute('href','#')
				.setCtx(this)
				.setOnClick(
					function(){
						console.log('////////////////////////////////////////');
						try{
							for(var i=0;i<4;i++){
								console.log(this._parent.HSVToRGB(i*0.25,1.0,1.0));
							}
						}catch(e){
							console.log(e.toString());
						}
						console.log('////////////////////////////////////////');
						try{
							var _this=this;
							this.setText(this.getData('idx'));
							this._parent.progressdata.btns.forEach(
								function(b,bidx){
									var color=_this._parent.HSVToRGB(b.getData('idx')/_this._parent.progressdata.nbtns,1.0,1.0);
									color[0]=color[0]*255;
									color[1]=color[1]*255;
									color[2]=color[2]*255;
									var colorstring='rgba('+color.join(',')+',1.0)';

									b.setClass('btn '+(b.getData('idx')<_this.getData('idx')?'btn-danger':'btn-default'));
									b.addAttribute('style',b.getData('idx')<_this.getData('idx')?'background:'+colorstring:'');
									b.refresh();
								}
							);
							//this.getData('idx')==0?this._parent.getChild('progressbar').hide():this._parent.getChild('progressbar').show();
							//this._parent.getChild('progressbar').show();
							var classes=['info','warning','danger','success']
							var _class='danger';
							this.setClass('btn btn-'+_class);
							this._parent.getChild('btn0').refresh();
							this._parent.getChild('progressbar').addAttribute('style','width:'+(this.getData('idx')+1)/(this._parent.progressdata.nbtns)*100+'%;');
							this._parent.getChild('progressbar').refresh();

						//this.setText(colorstring);
						this
							._parent
							.script
							.queuecmd('$("#'+this.uuid+'").css("border",'+'2px solid #FFFFFF!important')
						this._parent.script.refresh();
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
	ajaxtest.prototype.HSVToRGB=function(h,s,v){
		var r=0;
		var g=0;
		var b=0;
		var i=0;
		var f=0;
		var p=0;
		var q=0;
		var t=0;
		i=Math.floor(h*6);
		f=h*6-i;
		p=v*(1-s);
		q=v*(1-f*s);
		t=v*(1-(1-f)*s);
		switch(i%6){
			case 0:r=v;g=t;b=p;break;
			case 1:r=q;g=v;b=p;break;
			case 2:r=p;g=v;b=t;break;
			case 3:r=p;g=q;b=v;break;
			case 4:r=t;g=p;b=v;break;
			case 5:r=v;g=p;b=q;break;
		}
		return [r,g,b];//Color(r,g,b);
	};
	module.exports=ajaxtest;
}


