try{
	console.log('--------------------------------------------------------------------------------');
	console.log('cpr::req wrapper test ['+new Date()+']:');
	console.log('--------------------------------------------------------------------------------');
	var r=new cpr_req();
	r.setRequestHeaders({'hk0':'hv0','hk1':'hv1'});
	console.log(r.getRequestHeaders());
	r.setRequestUrl('http://httpbin.org/get')
	console.log(r.getRequestUrl());
	r.setRequestParameters({'pk0':'pv0','pk1':'pv1'});
	console.log(r.getRequestParameters());
	r.setRequestMethod('GET');
	console.log(r.getRequestMethod());
	r.setRequestCookie({'ck0':'cv0','ck1':'cv1'});
	console.log(r.getRequestCookie());
	r.setRequestTimeout(0);
	console.log(r.getRequestTimeout());
	console.log(r.execRequest());
	console.log(r.getResponseHeaders());
	console.log(r.getResponseBody());
	console.log(r.getResponseCookie());
}catch(e){
	console.error(e);
}
