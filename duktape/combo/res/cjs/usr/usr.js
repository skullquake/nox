module.exports={
	prep:function(usrdata){
		//todo: update and not recreate
		return {
			session:{
				created:new Date().getTime(),
				modified:new Date().getTime(),
				nativeid:request.getCookie('sessid','')//from native session
			},
			state:{
				url:"/",
				page:"home",
				lastaction:{}
			},
			data:{
				value:0,
				fname:'Jarmaine',
				lname:'Doe'
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
			case "test":
				usrdata.state.page="test";
				break;
			case "usrrst":
				//reset user session data
				var lastpage=usrdata.state.page;
				usrdata=this.prep(usrdata);
				usrdata.state.page=lastpage;
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
				break;
			case "dbls":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				usrdata.state.page='dbls';
				usrdata.data.select=this.db.select('test','SELECT * FROM test LIMIT 8');
				usrdata.session.modified=new Date().getTime();
				break;
			default:
				console.log("invalid command");
		};
		return usrdata;
	},
	db:null

}
