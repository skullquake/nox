{
	var json2html=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
		this.json2html=require("cjs/json2html/json2html.js");
		this._=require("cjs/lodash/lodash.js");
		this.name='json2html'
		this.d=
			[
				{"id":0,"title":"Heat","year":"1995"},
				{"id":1,"title":"Snatch","year":"2000"},
				{"id":2,"title":"Up","year":"2009"},
				{"id":3,"title":"Unforgiven","year":"1992"},
				{"id":4,"title":"Amadeus","year":"1984"}
			]
		;
		this.t={
			'<>':'a',
			'html':'${title} ${year}',
			'href':'/?cmd='+this.name+"&id=${id}",
			'class':'alert alert-danger'
		};
		this.tpl_page=new TextDecoder("utf-8").decode(readFile('./res/tpl/page.html'));
		this.tpl_menu=new TextDecoder("utf-8").decode(readFile('./res/tpl/menu.html'));
		this.tpl_contents=new TextDecoder("utf-8").decode(readFile('./res/tpl/contents.html'));
		this.tpl_card=new TextDecoder("utf-8").decode(readFile('./res/tpl/card.html'));
	};
	json2html.prototype.src='res/cjs/cmd/cmd/json2html.js';
	json2html.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	json2html.prototype.data={};
	json2html.prototype.exec=function(){

		this.log('exec()');
		this.ctl.data.cmd=this.name;
		console.log(this.ctl.data);
		console.log(this.ctl.ses.data);
		console.log(this.ctl.ses.hdl.data);
		var UrlUtils=require('cjs/url/urlutils.js');
		this.urlUtils=new UrlUtils();
		this.data.selected=this.urlUtils.getQueryVariable(request.getQueryString(),'id');
		//console.log('----------------------------------------');
		//console.log(this.data);
		//console.log('----------------------------------------');
		_response.setHeader('Content-type','text/html');
		try{
			this.log('start');
			{
				//console.log('#################');
				var _this=this;
				var o=this._.find(this.d, function(o) { return o.id==_this.data.selected;});
				//console.log(o);
				if(o!=null)o.year="0";
				//console.log('#################');
				var scr='alert("'+Math.random()+'");';
				_response.write(this._.template(this.tpl_page)({'contents':this.json2html.transform(this.d,this.t),'script':scr}));
			}
			this.log('end');
		}catch(e){
			this.log(e.toString());
		}

	}
	json2html.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	json2html.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	json2html.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=json2html;
}



