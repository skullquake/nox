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
				"url":"/",
				"page":"home",
				"lastaction":{
				},
				"clearancelevel":0
			},
			data:{
				value:0,
				fname:'Jarmaine',
				lname:'Doe',
				login:'',
				pass:''
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
				usrdata.data.login=getQueryVariable(request.getQueryString(),'login')!=null?getQueryVariable(request.getQueryString(),'login'):usrdata.data.login;
				usrdata.data.pass=getQueryVariable(request.getQueryString(),'pass')!=null?getQueryVariable(request.getQueryString(),'pass'):usrdata.data.pass;
				if(usrdata.data.pass=="1234"){
					usrdata.state.clearancelevel=1;
					usrdata.state.page="home";
				}else{
				}

				break;
			case "logout":
				usrdata.state.clearancelevel=0;
				break;
			case "usr":
				usrdata.state.page="usr";
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
				usrdata.data.fname=fname;
				usrdata.data.lname=lname;
				usrdata.session.modified=new Date().getTime();
				break;
			case "dbls":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				usrdata.state.page='dbls';
				usrdata.data.select=this.db.select('test','SELECT * FROM test LIMIT 32');
				usrdata.session.modified=new Date().getTime();
				break;
			case "dbdel":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				var table='test';
				this.db.exec("DELETE FROM test");
				usrdata.data.select=this.db.select('test','SELECT * FROM test LIMIT 32');
				usrdata.session.modified=new Date().getTime();
				//_response.setHeader("Content-Location","/xas?cmd=dbhtml");
				//_response.setHeader("Location","/");
				break;

			case "dbins":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				var table='test';
				var idx=parseInt(this.db.select('test','SELECT COUNT(*) FROM test')[0]);
				idx++;
				this.db.exec("INSERT INTO "+table+" VALUES ("+(idx+1)+",'"+Math.random()+"')");
				usrdata.data.select=this.db.select('test','SELECT * FROM test LIMIT 32');
				usrdata.session.modified=new Date().getTime();
				//_response.setHeader("Content-Location","/xas?cmd=dbhtml");
				//_response.setHeader("Location","/");
				break;
			default:
				console.log("invalid command");
		};
		return usrdata;
	},
	db:null

}
