{
	var Foo=function(ctlP){
		this.log('Constructor()');
		this.ctl=ctlP;
	};
	Foo.prototype.src='res/cjs/cmd/cmd/foo.js';
	Foo.prototype.log=function(a){
		console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	Foo.prototype.data={};
	Foo.prototype.exec=function(){
		this.log('exec()');
		this.log(this.ctl.src);
		this.log(this.ctl.ses.src);
		this.log(this.ctl.ses.hdl.src);
		_response.setHeader('Content-type','text/html');
		_response.write('test');
		try{
			this.log('start');
			var json2html=require(
				"cjs/json2html/json2html.js"
			);
			{
				var t={'<>':'div','html':'${title} ${year}'};
				var d=[
					{"title":"Heat","year":"1995"},
					{"title":"Snatch","year":"2000"},
					{"title":"Up","year":"2009"},
					{"title":"Unforgiven","year":"1992"},
					{"title":"Amadeus","year":"1984"}
				];
				var html=json2html.transform(d,t);
				_response.write(html);
			}
			{
				var transform = {'<>':'li','html':[{'<>':'span','html':'${name} (${age})'}]};
				var data = [
					{'name':'Bob','age':40},
					{'name':'Frank','age':15},
					{'name':'Bill','age':65},
					{'name':'Robert','age':24}
				];
				_response.write(json2html.transform(data,transform));
			}
			{
				var data = [
					{'id':'100','children':[
						{'name':'this'},
						{'name':'is'},
						{'name':'great!'}
					]},
					{'id':'101','children':[
						{'name':'this'},
						{'name':'is'},
						{'name':'amazing!'}
						]}
				];
				var transforms={
					'parent': {
						'<>':'div',
						'id':'${id}',
						'html':function(){
							return json2html.transform(this.children,transforms.child);
						}
					},
					'child':{'<>':'span','html':'${name}'}
				};
				_response.write(json2html.transform(data,transforms.parent))
			}


			this.log('end');
		}catch(e){
			this.log(e.toString());
		}

	}
	Foo.prototype.update=function(){
		this.data.modified=new Date().getTime();
	}
	Foo.prototype.toJson=function(){
		var ret={};
		return ret;
	}
	Foo.prototype.toString=function(a,b){
		return JSON.stringify(this.toJson(),a==null?-1:a,b==null?'':b);
	}
	module.exports=Foo;
}



