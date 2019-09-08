module.exports={
	prep:function(usrdata){
		return {
			session:{
				username:'foo',
				created:new Date().getTime(),
				modified:new Date().getTime()
			},
			state:{
				url:"/",
				page:"home",
				lastaction:{}
			},
			data:{
				value:0,
				fname:'foo',
				lname:'bar'
			}
		};
	},
	proc:function(usrdata){
		function getQueryVariable(query,variable){
			var vars=query.split('&');
			for(var i=0;i<vars.length;i++){
				var pair=vars[i].split('=');
				if(decodeURIComponent(pair[0])==variable){
					return decodeURIComponent(pair[1]);
				}
			}
			return null;
		}
		usrdata.state.lastaction.url=request.getUrl();
		usrdata.state.lastaction.method=request.getMethod();
		usrdata.state.lastaction.cmd=request.get('cmd','');
		usrdata.state.lastaction.querystring=request.getQueryString();
		switch(request.get('cmd','')){
			case "home":
				usrdata.state.page="home";
				break;
			case "login":
				usrdata.state.page="login";
				break;
			case "increment":
				usrdata.data.value=usrdata.data.value+1;
				usrdata.session.modified=new Date().getTime();
				break;
			case "decrement":
				usrdata.data.value=usrdata.data.value-1;
				usrdata.session.modified=new Date().getTime();
				break;
			case "submit":
				//fname=&lname=
				var fname=getQueryVariable(request.getQueryString(),'fname');
				var lname=getQueryVariable(request.getQueryString(),'lname');
				console.log(fname);
				console.log(lname);
				usrdata.data.fname=fname;
				usrdata.data.lname=lname;
				usrdata.session.modified=new Date().getTime();
				usrdata.state.page="login";
				break;
			default:
				console.log("invalid command");
		};
		return usrdata;
	}

}
