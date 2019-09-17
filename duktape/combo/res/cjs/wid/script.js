{
	var Node=require('cjs/wid/node.js?script');
	var script=Node;
	//script.prototype._cmdqueue=[];
	script.prototype.cmdqueue=[];
	script.prototype.queuecmd=function(c){//,a){
		if(typeof(this._queuecmd)=='undefined'){
			this._cmdqueue=[];
		}
		this._cmdqueue.push(c);
		//send function name and args
		//for exec
		return this;
	}
	script.prototype.addLine=function(a){
		this.text=this.text+'\n'+a+'\n';
		return this;
	};
	script.prototype.prependLine=function(a){
		this.text=a+'\n'+this.text;
		return this;
	};
	script.prototype.init=function(src,cmd){
		this.addAttribute('foo','bar');
		this.setNodeName('script');
		this.setText(
			new TextDecoder('utf8')
			.decode(
				readFile(src)
			)
		)
		return this;
	}
	script.prototype.toJson=function(){
		console.log('>>script');
		var ret={
			'id':this.uuid,
			'refresh':this.refresh,
			'attr':this.attributes,
			'wjs':this._cmdqueue
		};
		this._cmdqueue=[];
		return ret;
	}
	module.exports=script;
}
