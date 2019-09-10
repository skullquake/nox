try{
	Duktape.modSearch=function(id){
		//res=readFile('res/'+id+'.js');//regular
		res=readFile('res/'+id.split('?')[0]);//cachebusted
		res=new TextDecoder("utf-8").decode(res);
		if(typeof res==='string')
			return res;
		new log('module not found: '+id);
	};
	var cpr=require('cjs/cpr/cpr.js');
	var res=
		JSON.parse(cpr.post(
				"http://apizadmz.capfin.co.za/oauth2/api/oauth2/token",
				//"http://httpbin.org/get",
				//"http://httpbin.org/post",
				//"http://httpbin.org/headers",
				//"http://httpbin.org/cookies",
				{
					"ak0":"av0"
				},
				{
					"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:68.0) Gecko/20100101 Firefox/68.0",
					"Accept":"*/*",
					"Accept-Language":"en-US,en;q=0.5",
					"Referer":"http://localhost:8080/capfin.html",
					"Content-Type":"application/x-www-form-urlencoded",
					"authorization":"Basic c3dhcm06b2F1dGgyLXN3YXJtLXNlY3JldA==",
					"Origin":"http://localhost:8080",
					"Connection":"keep-alive"
				},
				{
					"cookie0":"cookie1"
				},
				5000,
				"Grant_Type=client_credentials"
			).bod)
	;
	console.log(res.access_token);
	res=cpr.post(
				"http://apizadmz.capfin.co.za/api/v1/application/lead",
				//"http://apizadmz.capfin.co.za/oauth2/api/oauth2/token",
				{
				},
				{
					"Content-Type":"application/json;charset=UTF-8",
					"Authorization":"Bearer "+res.access_token
				},
				{
				},
				8000,
				JSON.stringify(
					{
						"name":"Jane",
						"surname":"Doe",
						"id_Number":"8503275121080",
						"cell_Number":"0836751200",
						"email_Address":"myemail@gmail.com",
						"ad_Id":"CF000042",
						"additional_Info":{
							"sample":"sampledata",
							"sample2":"sampledata2"
						}
					}
				)
			);
	console.log(res);
	console.log(res.bod);
	//post:function(url,par,hdr,ck,bod,t){
}catch(e){
	console.error(e);
}
