try{
	console.log('--------------------------------------------------------------------------------');
	console.log('cpr::Parameters test ['+new Date()+']:');
	console.log('--------------------------------------------------------------------------------');
	var jsonp={}
	var arrv=["foo","bar","baz","qux"];
	for(var i=0;i<8;i++){
		jsonp["k_"+i]=arrv[i%arrv.length]+" "+arrv[i%arrv.length];
	}
	var p=new cpr_parameters(jsonp);
	console.log(jsonp);
	console.log(p.getContent());
	console.log('--------------------------------------------------------------------------------');
}catch(e){
	console.error(e);
}
