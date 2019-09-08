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
				"clearancelevel":0,
				"pagestate":{}
			},
			data:{
				value:0,
				fname:'',
				lname:'',
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
		var cmd=request.get('cmd','')
		switch(cmd){
			case "home":
				usrdata.state.page="home";
				break;
			case "pg_login":
				usrdata.data.login='';
				usrdata.data.pass='';
				usrdata.state.pagestate['login']={};
				usrdata.state.page="login";
				break;
			case "login":
				usrdata.data.login=getQueryVariable(request.getQueryString(),'login')!=null?getQueryVariable(request.getQueryString(),'login'):usrdata.data.login;
				usrdata.data.pass=getQueryVariable(request.getQueryString(),'pass')!=null?getQueryVariable(request.getQueryString(),'pass'):usrdata.data.pass;
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				var table='usr';
				var sql="SELECT COUNT(*) FROM "+table+" WHERE login LIKE '"+usrdata.data.login+"' and pass LIKE '"+usrdata.data.pass+"'";
				var count=parseInt(this.db.select(table,sql)[0]);
				usrdata.state.pagestate[cmd]={};
				if(count>0){
					var sql="SELECT * FROM "+table+" WHERE login LIKE '"+usrdata.data.login+"' and pass LIKE '"+usrdata.data.pass+"' LIMIT 1";
					var usrdatadb=this.db.select(table,sql,true);
					for(var i=0;i<usrdatadb[0].length;i++){
						usrdata.data[usrdatadb[0][i]]=usrdatadb[1][i];
					}
					console.log(usrdata);
					usrdata.state.clearancelevel=1;
					usrdata.state.page="home";
					usrdata.state.pagestate[cmd].error=false;
					usrdata.state.pagestate[cmd].message=null;
				}else{
					usrdata.state.pagestate[cmd].error=true;
					usrdata.state.pagestate[cmd].message='Invalid Credentials';
					usrdata.state.page=cmd;
					usrdata.state.clearancelevel=0;
				}
				break;
			case "logout":
				//usrdata.state.clearancelevel=0;
<<<<<<< HEAD
				usrdata=this.prep();
=======
				usrdata=this.prep(usrdata);
>>>>>>> b81c80b41a5412e99bcf71d316dcf22878d44141
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
						usrdata.state.pagestate[cmd]={};
					}catch(e){
						console.log(e);
					}
				}else{
					usrdata.state.pagestate[cmd]={};
					usrdata.state.pagestate[cmd].error=true;
					usrdata.state.pagestate[cmd].message='User already exists';
					usrdata.state.page=cmd;
					usrdata.state.clearancelevel=0;
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
			case "submit":
				//fname=&lname=
				var fname=getQueryVariable(request.getQueryString(),'fname');
				var lname=getQueryVariable(request.getQueryString(),'lname');
				if(this.db==null){
					this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
					this.db.connect("./db/sqlite/test.db3");
				}
				var table='usr';
				var sqltpl="UPDATE <%- table %> SET <%- field %> = <%- fieldvalue %> WHERE <%- key %> = <%- value %>";
				var sql=''
				sql=sqltpl
					.replace(
						'<%- table %>',
						table
					)
					.replace(
						'<%- field %>',
						'fname'
					)
					.replace(
						'<%- fieldvalue %>',
						"'"+fname+"'"
					)
					.replace(
						'<%- key %>',
						'login'
					)
					.replace(
						'<%- value %>',
						"'"+usrdata.data.login+"'"
					)
				;
				this.db.exec(sql);
				sql=sqltpl
					.replace(
						'<%- table %>',
						table
					)
					.replace(
						'<%- field %>',
						'lname'
					)
					.replace(
						'<%- fieldvalue %>',
						"'"+lname+"'"
					)
					.replace(
						'<%- key %>',
						'login'
					)
					.replace(
						'<%- value %>',
						"'"+usrdata.data.login+"'"
					)
				;
				this.db.exec(sql);

				usrdata.data.fname=fname;
				usrdata.data.lname=lname;
				usrdata.session.modified=new Date().getTime();
				break;
			case "dbls":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				usrdata.state.page='dbls';
				usrdata.data.select=
				this.db.db.execAndGet(
					"SELECT"+
					"	*"+
					"FROM"+
					"	sqlite_master",
					true
				);
				usrdata.session.modified=new Date().getTime();
				break;
			case "dbusr":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				usrdata.state.page='dbusr';
				usrdata.data.select=this.db.select('test','SELECT * FROM usr',true);
				usrdata.session.modified=new Date().getTime();
				break;
			case "dbusrdel":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				var table='test';
				this.db.exec("DELETE FROM usr");
				usrdata.data.select=this.db.select('test','SELECT * FROM usr',true);
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
