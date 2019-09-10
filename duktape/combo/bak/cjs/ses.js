try{
	//--------------------------------------------------------------------------------
	//ctl test
	//--------------------------------------------------------------------------------
	console.log("----------------------------------------");
	console.log("session test:");
	console.log("regeneration example");
	console.log("----------------------------------------");
	console.log("id:"+request.getCookie('sessid',''));
	function genData(){
		var data=[];
		for(var i=0;i<2;i++){
			data.push([]);
			for(var j=0;j<2;j++){
				data[i].push(Math.floor(Math.random()*100));
			}
		}
		session.setValue("data",JSON.stringify(data,1,' '));
	}
	var k="ts";
	if(session.hasValue(k)){
		console.log(k+":"+session.get(k,"EMPTY"));
		console.log('data'+":"+session.get('data',"EMPTY"));
		//parse timestamp
		try{
			var ts=session.get(k,"EMPTY");
			ts=new Date(parseInt(ts));
			if(new Date().getTime()-ts.getTime()>1000){
				//regen data and set new timestamp
				genData();
				session.setValue(k,new Date().getTime().toString());
			}else{
			}
		}catch(e){
			console.log(e);
			session.setValue(k,new Date().getTime().toString());
		}finally{
		}
		console.log("Unsetting value...");
		session.unsetValue(k);
		if(session.hasValue(k)){
			console.log("failed to unset cookie value");
		}else{
			console.log("cookie value unset");
		}

	}else{
		console.log("Cookie value "+k+" not set");
		session.setValue(k,new Date().getTime().toString());
	}
	console.log("----------------------------------------");
	console.log("");
}catch(e){
	console.error(e);

}













