{
	var Home=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	Home.prototype.src='res/cjs/cmd/cmd/home.js';
	Home.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Home.prototype.data={};
	Home.prototype.exec=function(){
		this.log('exec()');
;		this.tpl_page=new TextDecoder("utf-8").decode(readFile('./res/tpl/page.html'));
		this.tpl_menu=new TextDecoder("utf-8").decode(readFile('./res/tpl/menu.html'));
		this.tpl_contents=new TextDecoder("utf-8").decode(readFile('./res/tpl/contents.html'));
		this.tpl_card=new TextDecoder("utf-8").decode(readFile('./res/tpl/card.html'));
		this._=require('cjs/lodash/lodash.js');
		this.json2html=require("cjs/json2html/json2html.js");
		var Anchor=require('cjs/wid/anchor.js');
		var Button=require('cjs/wid/button.js');
		var Container=require('cjs/wid/container.js');
		var Layout=require('cjs/wid/layout.js');
		var Menu=require('cjs/wid/menu.js');
		var Table=require('cjs/wid/table.js');
		var Text=require('cjs/wid/text.js');
		var Model=require('cjs/mod/mod.js');
		var View=require('cjs/view/view.js');
		this.links=[
			{'cmd':'hdlreinit'},
			{'cmd':'home'},
			{'cmd':'json2html'},
			{'cmd':'json2htmlajax'},
			{'cmd':'pgtst'},
		];
		this.container=new Container(null);
		for(var i=0;i<4;i++){
			var c=new Container(null);
			this.container.addChild(c);
			for(var j=0;j<4;j++){
				var d=new Container(null);
				c.addChild(d);
				for(var k=0;k<2;k++){
					var e=new Button(null);
					e.setText('btn');
					d.addChild(e);
				}
				for(var k=0;k<2;k++){
					var e=new Anchor(null);
					e.setCmd(this.ctl.data.cmd);
					e.setText('anchor');
					d.addChild(e);
				}

			}
		}
		console.log('----------------------------------------')
		console.log('this.container.getParent()');
		console.log(this.container.getParent());
		console.log('this.container.getChildren()');
		console.log(this.container.getChildren());
		console.log(this.container.getChildren().length);
		console.log('this.container.getDescendents()');
		console.log(this.container.getDescendents());
		console.log(JSON.stringify(this.container.getDescendents()));
		console.log(this.container.getDescendents().length);
		console.log('----------------------------------------')
		console.log(this.container.toString());
		console.log('----------------------------------------')
		_response.setHeader('Content-type','text/html');
		_response.write(
			this._.template(this.tpl_page)(
				{
					'contents':
					this._.template(
						'<%= msg %><br/><%= links %><br/><%= test %>'
					)(
						{
							'msg':this.ctl.ses.data.msg==null?'':this.ctl.ses.data.msg,
							'links':this.json2html.transform(this.links,{'<>':'li','html':'<a href="/?cmd=${cmd}">${cmd}</a>'}),
							'test':this.container.toString()
						}
					)
				}
			)
		);
	}
	Home.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	Home.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Home.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=Home;
}



