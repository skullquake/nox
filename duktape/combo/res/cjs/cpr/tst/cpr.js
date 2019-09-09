try{
	console.log('--------------------------------------------------------------------------------');
	console.log('cpr::Parameters test ['+new Date()+']:');
	console.log('--------------------------------------------------------------------------------');
	var jsonp={}
	var arrv=["foo","bar","baz","qux"];
	for(var i=0;i<4;i++){
		jsonp["k_"+i]=arrv[i%arrv.length]+" "+arrv[i%arrv.length];
	}
	jsonp["Set-Cookie"]="k0=v0; k1=v1";
	var p=new cpr_parameters(jsonp);
	console.log(jsonp);
	console.log(p.getContent());
	console.log(typeof(cpr_Get));
	//https://stackoverflow.com/questions/5725430/http-test-server-accepting-get-post-requests
	//http://httpbin.org/get
	var res=cpr_Get("http://httpbin.org/get",p);//http://www.google.com",p)
		//response body
	/*
	console.log(typeof(res));
	var plain_ptr = Duktape.Pointer(res);
	console.log(plain_ptr.toString());
	console.log(plain_ptr.valueOf());
	*/
	console.log(JSON.stringify(JSON.parse(res.text),0,' '));
		//cookies
	var res=cpr_Get("http://httpbin.org/cookies",p);//http://www.google.com",p)
	console.log(res.cookies);
	console.log('--------------------------------------------------------------------------------');
}catch(e){
	console.error(e);
}
