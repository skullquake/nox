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
				usrdata=this.prep();
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
								" VALUES ("+
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
			case "mgses":
				//todo - prep session data and set page state data
				usrdata.state.pagestate[cmd]={};
				usrdata.state.pagestate[cmd].data=[];
				var h=[];
				h.push("Session Id");
				h.push("Session Data");
				var BreakException = {};
				usrdata.state.pagestate[cmd].data.push(h);
				var sessions=server.getSessions().getSessions();
				try{
					Object.keys(sessions).forEach(
						function(s){
							var r=[];
							try{
								r.push(s);
								r.push(JSON.stringify(sessions[s].getValues()));
							}catch(e){
								console.log(e);
							}
							usrdata.state.pagestate[cmd].data.push(r);
						}
					);
				}catch(e){
				}
				usrdata.state.page='mgses';
				break;
			case "dbusrdel":
				this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				this.db.connect("./db/sqlite/test.db3");
				var table='test';
				this.db.exec("DELETE FROM usr");
				usrdata.data.select=this.db.select('test','SELECT * FROM usr',true);
				break;
			case "apod":
				var data;
				var db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				var sql;
				var table='apod';
				if(db!=null){
					db.connect("./db/sqlite/test.db3");
					if(db.db.tableExists(table)){
						console.log("usr.js: Table "+table+" already exists");
					}else{
						console.log("usr.js: Creating table "+table);
						db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
						console.log("usr.js: done");
					}
				}else{
					console.log("usr.js: failed to load cjs/db/db.js");
				}
				try{
					this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
					this.db.connect("./db/sqlite/test.db3");
					sql="SELECT value FROM "+table+" WHERE date BETWEEN datetime('now', 'localtime', 'start of day') AND datetime('now', 'localtime')";
					var result=this.db.db.execAndGet(sql,false);
					if(result.length==0){
						console.log("usr.js: Caching "+table+"...");
						var cpr=require('cjs/cpr/cpr.js?cachebust="'+new Date().getTime());
						var url='https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY';
						var par={};
						var hdr={};
						var ck={};
						var t=3000;
						data=JSON.parse(cpr.get(url,par,hdr,ck,t).bod);
						sql=	
							(
								"INSERT INTO <%- table %> ("+
								"	date,"+
								"	value"+
								") "+
								" VALUES ("+
								"	<%- date %>,"+
								"	<%- value %>"+
								")"
							)
							.replace(
								'<%- table %>',
								table
							)
							.replace(
								'<%- date %>',
								"datetime('now', 'localtime')"//new String(new Date().getTime())
							)
							.replace(
								'<%- value %>',
								"'"+JSON.stringify(data)+"'"
							)
						;
						db.exec(sql);
						console.log("usr.js: Done");
					}else{
						console.log("usr.js: Using Cached "+table+"...");
						data=JSON.parse(result[0]);
					}

				}catch(e){
					console.log(e);
				}
				usrdata.state.pagestate[cmd]={};
				usrdata.state.pagestate[cmd].data=data;
				usrdata.state.page='apod';
				break;
			case "insight_weather":

				var data;
				var db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				var sql;
				var table='insight_weather';
				if(db!=null){
					db.connect("./db/sqlite/test.db3");
					if(db.db.tableExists(table)){
						console.log("usr.js: Table "+table+" already exists");
					}else{
						console.log("usr.js: Creating table "+table);
						db.exec("CREATE TABLE IF NOT EXISTS "+table+"(date INTEGER, value TEXT)");
						console.log("usr.js: done");
					}
				}else{
					console.log("usr.js: failed to load cjs/db/db.js");
				}
				try{
					this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
					this.db.connect("./db/sqlite/test.db3");
					sql="SELECT value FROM "+table+" WHERE date BETWEEN datetime('now', 'localtime', 'start of day') AND datetime('now', 'localtime')";
					var result=this.db.db.execAndGet(sql,false);
					if(result.length==0){
						console.log("usr.js: Caching "+table+"...");
						var cpr=require('cjs/cpr/cpr.js?cachebust="'+new Date().getTime());
						var url='https://api.nasa.gov/insight_weather/?api_key=DEMO_KEY&feedtype=json&ver=1.0';
						var par={};
						var hdr={};
						var ck={};
						var t=3000;
						data=JSON.parse(cpr.get(url,par,hdr,ck,t).bod);
						sql=	
							(
								"INSERT INTO <%- table %> ("+
								"	date,"+
								"	value"+
								") "+
								" VALUES ("+
								"	<%- date %>,"+
								"	<%- value %>"+
								")"
							)
							.replace(
								'<%- table %>',
								table
							)
							.replace(
								'<%- date %>',
								"datetime('now', 'localtime')"//new String(new Date().getTime())
							)
							.replace(
								'<%- value %>',
								"'"+JSON.stringify(data)+"'"
							)
						;
						db.exec(sql);
						console.log("usr.js: Done");
					}else{
						console.log("usr.js: Using Cached "+table+"...");
						data=JSON.parse(result[0]);
					}

				}catch(e){
					console.log(e);
				}
				usrdata.state.pagestate[cmd]={};
				usrdata.state.pagestate[cmd].data=data;
				usrdata.state.page='insight_weather';
				break;
			case "pgcapfin":
				this.pgcapfin();
				break;
			case "capfindrop":
				console.log('case "capfindrop"');
				usrdata.state.pagestate['pgcapfin']={};
				var table="capfinlead";
				var db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				if(db!=null){
					db.connect("./db/sqlite/test.db3");
					console.log("usr.js: Dropping table "+table);
					db.exec(
						"DROP TABLE IF EXISTS "+table
					);
					console.log("usr.js: done");
					usrdata.state.pagestate['pgcapfin'].info={
						msg:"Table Dropped",
						lvl:"info"
					}
					usrdata.state.pagestate['pgcapfin'].error=false;
					usrdata.state.pagestate['pgcapfin'].data=null;
				}else{
					usrdata.state.pagestate['pgcapfin'].error=true;
					usrdata.state.pagestate['pgcapfin'].message='Failed to open database';
					console.log("usr.js: failed to load cjs/db/db.js");
				}
				usrdata.state.page="pgcapfin";
				break;
			case "capfincreate":
				console.log('case "capfincreate"');
				usrdata.state.pagestate[cmd]={};
				usrdata.state.page="pgcapfincreate";
				break;

			case "capfinsubmitlead":
				var db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
				usrdata.state.pagestate[cmd]={};
				if(db!=null){
					var arrfields={
						'name':null,
						'surname':null,
						'id_Number':null,
						'cell_Number':null,
						'email_Address':null,
						'ad_Id':null
					};
					Object.keys(arrfields).forEach(
						function(k,i){
							arrfields[k]=getQueryVariable(request.getQueryString(),k);
						}
					);
					var sqlfld=[]
					var sqlval=[]
					Object.keys(arrfields).forEach(
						function(k,i){
							sqlfld.push(k);
							sqlval.push("'"+arrfields[k]+"'");
						}
					)
					console.log(sqlfld);
					console.log(sqlval);
					var sqltpl="INSERT INTO <%- tbl -> ( <%- fld -> ) VALUES ( <%- val -> )"
					var table="capfinlead";
					var sql=sqltpl
						.replace(
							'<%- tbl ->',
							table
						)
						.replace(
							'<%- fld ->',
							sqlfld.join(',')
						)
						.replace(
							'<%- val ->',
							sqlval.join(',')
						)
					;
					console.log(sql);
					db.connect("./db/sqlite/test.db3");
					db.exec(sql);
				}else{
				}
				this.pgcapfin();
				break;
			default:
				console.log("invalid command");
		};
		//updating of Mongoose::Session kv pair test (visible in Navigation/Sessions)
		//	note not all is pushed, as this results in recursion because the native
		//	session stuff gets put in the duktape client session stuff for viz
		var nativesessiondata={};
		nativesessiondata.session=usrdata.session;
		nativesessiondata.state={};
		nativesessiondata.state.lastaction=usrdata.state.lastaction;
		nativesessiondata.state.lastaction.clearancelevel=usrdata.state.clearancelevel;
		nativesessiondata.data={};
		nativesessiondata.data.fname=usrdata.data.fname;
		nativesessiondata.data.lname=usrdata.data.lname;
		session.setValue('usrdata',JSON.stringify(nativesessiondata));
		return usrdata;
	},
	initdb:function(){
		if(this.db==null){
			this.db.connect("./db/sqlite/test.db3");
		}
		var table='test';
		db.exec("CREATE TABLE IF NOT EXISTS "+table+"(id INTEGER PRIMARY KEY, value TEXT)");
		//this.db.exec("INSERT INTO "+table+" VALUES ("+(idx+1)+",'"+Math.random()+"')");
	},
	pgcapfin:function(){
		var cmd='pgcapfin';
		var table="capfinlead";
		var db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
		usrdata.state.pagestate[cmd]={};
		if(db!=null){
			db.connect("./db/sqlite/test.db3");
			if(db.db.tableExists(table)){
				console.log("usr.js: Table "+table+" already exists");
			}else{
				console.log("usr.js: Creating table "+table);
				db.exec(
					"CREATE TABLE IF NOT EXISTS "+table+"("+
					"	name TEXT,"+
					"	surname TEXT,"+
					"	id_Number TEXT,"+
					"	cell_Number TEXT,"+
					"	email_Address TEXT,"+
					"	ad_Id TEXT"+
					")"
				);
				console.log("usr.js: done");
				usrdata.state.pagestate[cmd].info={
					msg:"Table created",
					lvl:"info"
				}
				usrdata.state.pagestate[cmd].error=false;
			}
		}else{
			usrdata.state.pagestate[cmd].error=true;
			usrdata.state.pagestate[cmd].message='Failed to open database';
			console.log("usr.js: failed to load cjs/db/db.js");
		}
		this.db=require('cjs/db/db.js?cachebust="'+new Date().getTime());
		this.db.connect("./db/sqlite/test.db3");
		usrdata.state.page='dbls';
		usrdata.state.pagestate[cmd].data=
		this.db.db.execAndGet(
			"SELECT"+
			"	*"+
			"FROM"+
			"	"+table,
			true
		);
		usrdata.state.pagestate[cmd].data.length==0?usrdata.state.pagestate[cmd].info={msg:"No Data",lvl:"info"}:usrdata.state.pagestate[cmd].info=null;

		console.log(usrdata.state.pagestate[cmd].data);
		usrdata.state.page="pgcapfin";
	}
}
