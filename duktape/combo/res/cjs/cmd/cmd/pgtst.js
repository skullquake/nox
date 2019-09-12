{
	var pgtst=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	pgtst.prototype.src='res/cjs/cmd/cmd/pgtst.js';
	pgtst.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	pgtst.prototype.data={};
	pgtst.prototype.exec=function(){
		this.log('exec()');
		var View=require('cjs/view/view.js');
		var Page=require('cjs/pg/pg.js');
		var Button=require('cjs/wid/button.js');
		var Container=require('cjs/wid/container.js');
		var Layout=require('cjs/wid/layout.js');
		var Menu=require('cjs/wid/menu.js');
		var Table=require('cjs/wid/table.js');
		var Text=require('cjs/wid/text.js');
	}
	pgtst.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	pgtst.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	pgtst.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=pgtst;
}



