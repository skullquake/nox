module.exports={
	db:null,
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
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				var table='usr';
				var sql="SELECT COUNT(*) FROM "+table+" WHERE login LIKE '"+usrdata.data.login+"' and pass LIKE '"+usrdata.data.pass+"'";
				console.log(sql);
				var count=parseInt(this.db.select(table,sql)[0]);
				console.log(count);
				if(count>0){
					console.log('a');
					usrdata.state.clearancelevel=1;
					usrdata.state.page="home";
				}else{
					console.log('b');
					usrdata.state.clearancelevel=0;
					usrdata.state.page="login";
				}
				break;
			case "logout":
				usrdata.state.clearancelevel=0;
				break;
			case "pg_signup":
				usrdata.data.fname=getQueryVariable(request.getQueryString(),'fname')!=null?getQueryVariable(request.getQueryString(),'fname'):usrdata.data.fname;
				usrdata.data.lname=getQueryVariable(request.getQueryString(),'lname')!=null?getQueryVariable(request.getQueryString(),'lname'):usrdata.data.lname;
				usrdata.data.login=getQueryVariable(request.getQueryString(),'login')!=null?getQueryVariable(request.getQueryString(),'login'):usrdata.data.login;
				usrdata.data.pass=getQueryVariable(request.getQueryString(),'pass')!=null?getQueryVariable(request.getQueryString(),'pass'):usrdata.data.pass;
				usrdata.state.page="signup";
				break;
			case "signup":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				usrdata.data.fname=getQueryVariable(request.getQueryString(),'fname')!=null?getQueryVariable(request.getQueryString(),'fname'):usrdata.data.fname;
				usrdata.data.lname=getQueryVariable(request.getQueryString(),'lname')!=null?getQueryVariable(request.getQueryString(),'lname'):usrdata.data.lname;
				usrdata.data.login=getQueryVariable(request.getQueryString(),'login')!=null?getQueryVariable(request.getQueryString(),'login'):usrdata.data.login;
				usrdata.data.pass=getQueryVariable(request.getQueryString(),'pass')!=null?getQueryVariable(request.getQueryString(),'pass'):usrdata.data.pass;
				var table='usr';
				var sql="SELECT COUNT(*) FROM "+table+" WHERE login LIKE '"+usrdata.data.login+"'";
				console.log(sql);
				if(parseInt(this.db.select(table,sql)[0])==0){
					try{
						console.log("user does not exist: creating...");
						console.log("done");
						sql=	
							(
								"INSERT INTO <%- table %>("+
								"	fname,"+
								"	lname,"+
								"	login,"+
								"	pass"+
								") "+
								"VALUES ("+
								"	'<%- fname %>',"+
								"	'<%- lname %>',"+
								"	'<%- login %>',"+
								"	'<%- pass %>'"+
								")"
							)
							.replace(
								'<%- table %>',
								table
							)
							.replace(
								'<%- fname %>',
								usrdata.data.fname
							)
							.replace(
								'<%- lname %>',
								usrdata.data.lname
							)
							.replace(
								'<%- login %>',
								usrdata.data.login
							)
							.replace(
								'<%- pass %>',
								usrdata.data.pass
							)
						;
						console.log(sql);
						this.db.exec(sql);
						console.log("signing in...");
						usrdata.state.clearancelevel=1;
						usrdata.state.page="home";
					}catch(e){
						console.log(e);
					}
				}else{
					console.log("user exists: not creating");
				}
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
			case "dbusr":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				usrdata.state.page='dbusr';
				usrdata.data.select=this.db.select('test','SELECT * FROM usr');
				usrdata.session.modified=new Date().getTime();
				break;
			case "dbusrdel":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				var table='test';
				this.db.exec("DELETE FROM usr");
				usrdata.data.select=this.db.select('test','SELECT * FROM usr');
				break;

			default:
				console.log("invalid command");
		};
		return usrdata;
	},
	initdb:function(){
		if(this.db==null){
			this.db.connect("./db/sqlite/test.db3");
		}
		var table='test';
		db.exec("CREATE TABLE IF NOT EXISTS "+table+"(id INTEGER PRIMARY KEY, value TEXT)");
		//this.db.exec("INSERT INTO "+table+" VALUES ("+(idx+1)+",'"+Math.random()+"')");
	}
}
