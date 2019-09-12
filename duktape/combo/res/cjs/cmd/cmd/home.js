{
	var Home=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
		this.tpl_page=new TextDecoder("utf-8").decode(readFile('./res/tpl/page.html'));
		this.tpl_menu=new TextDecoder("utf-8").decode(readFile('./res/tpl/menu.html'));
		this.tpl_contents=new TextDecoder("utf-8").decode(readFile('./res/tpl/contents.html'));
		this.tpl_card=new TextDecoder("utf-8").decode(readFile('./res/tpl/card.html'));
		this._=require('cjs/lodash/lodash.js');
	};
	Home.prototype.src='res/cjs/cmd/cmd/home.js';
	Home.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Home.prototype.data={};
	Home.prototype.exec=function(){
		this.log('exec()');

		_response.setHeader('Content-type','text/html');
		_response.write(
			this._.template(this.tpl_page)(
				{
					'contents':
					this._.template(
'<%= msg %><br/>\
<a href="<%= url %>"><%= url %></a><br/>\
<a href="/?cmd=hdlreinit">/?cmd=hdlreinit</a><br/>\
'
					)(
						{
							"msg":this.ctl.ses.data.msg==null?'':this.ctl.ses.data.msg,
							"url":'/?cmd=json2htmlajax'
						}
					)
				}
			)
		);
/*
		_response.setHeader('Content-type','text/html');
		_response.write('Home: \n');
		this.ctl.ses.data.msg==null?'':this.ctl.ses.data.msg;
		try{
			delete this.ctl.ses.data.msg;//clear out messages
		}catch(e){
			console.log(e);
		}
		_response.write('<a href="/?cmd=json2htmlajax">json2htmlajax</a>\n');
*/
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



