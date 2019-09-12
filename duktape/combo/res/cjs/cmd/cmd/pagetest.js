{
	var PageTest=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	PageTest.prototype.src='res/cjs/cmd/cmd/foo.js';
	PageTest.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	PageTest.prototype.data={};
	PageTest.prototype.exec=function(){
		this.log('exec()');
		//this.log(this.ctl.src);
		//this.log(this.ctl.ses.src);
		//this.log(this.ctl.ses.hdl.src);
		var Button=require('cjs/wid/button.js');
		var Container=require('cjs/wid/container.js');
		var Layout=require('cjs/wid/layout.js');
		var Menu=require('cjs/wid/menu.js');
		var Table=require('cjs/wid/table.js');
		var Text=require('cjs/wid/text.js');
		var c=new Container(null);
		new Container(c);
		console.log(c);
		console.log(c.toJson());
		console.log(c.toString());

		_response.setHeader('Content-type','text/html');
		_response.write('test');//c.toString());
	}
	PageTest.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	PageTest.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	PageTest.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=PageTest;
}



