//https://json2html.com/docs/#main-usage-native
////https://wiki.duktape.org/howtomodules
//needed to modify res/cjs/json2html/json2html.js
// there was no global export
var log=function(a){
	console.log(new Date().getTime()+" cjs/json2html/tst/tst.js:"+typeof(a)=='object'?JSON.stringify(a):a)
};
try{
	log('start');
	Duktape.modLoaded={};//empty out
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
		console.log(html);
		_response.write(html);
		console.log('--------------------------------------------------------------------------------');
	}
	{
		var transform = {'<>':'li','html':[{'<>':'span','html':'${name} (${age})'}]};
		var data = [
			{'name':'Bob','age':40},
			{'name':'Frank','age':15},
			{'name':'Bill','age':65},
			{'name':'Robert','age':24}
		];
		console.log(json2html.transform(data,transform));
		_response.write(json2html.transform(data,transform));
		console.log('--------------------------------------------------------------------------------');
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
		console.log(json2html.transform(data,transforms.parent));
		console.log('--------------------------------------------------------------------------------');
		_response.write(json2html.transform(data,transforms.parent))
	}


	log('end');
}catch(e){
	console.error(e);
}
