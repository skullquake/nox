console.log('--------------------------------------------------------------------------------')
console.log('Finalizer Example:'+new Date().getTime())
console.log('--------------------------------------------------------------------------------')
console.log('JS OBJ:'+new Date().getTime())
console.log('--------------------------------------------------------------------------------')
function Socket(host,port){
	this.host=host;
	this.port=port;
	this.fd='Platform.openSocket(host,port)';
}
Duktape.fin(
	Socket.prototype,
	function(obj,bool_heapDestruction){
		console.log('Socket.prototype:finalizer()');
		console.log(obj);
		console.log(bool_heapDestruction);
		if(obj===Socket.prototype){
			return;//calledfortheprototypeitself
		}
		if(typeofobj.fd!=='number'){
			return;  // already freed
		}
		try{
			console.log('Platform.closeSocket(obj.fd);');
		}catch(e){
			print('WARNING: finalizer failed for fd ' + obj.fd + ' (ignoring): ' + e);
		}
		delete obj.fd;
	}
);
// Any Socket instances are now finalized without registering explicit
// finalizers for them:
var sock=new Socket('localhost',8080);
console.log(sock);
//sock=null;
//delete sock;
sock=null;
//console.log(Duktape.fin(Socket.prototype));
//Duktape.gc();
console.log('--------------------------------------------------------------------------------')
console.log('Native OBJ:'+new Date().getTime()) //???
console.log('--------------------------------------------------------------------------------')
try{
	Duktape.fin(
		server,
		function(obj,bool_heapDestruction){
			console.log('server:finalizer()!');
			console.log(obj);
			console.log(bool_heapDestruction);
			if(obj===server.prototype){
				return;//calledfortheprototypeitself
			}
			if(typeofobj.fd!=='number'){
				return;  // already freed
			}
			try{
				console.log('Platform.closeserver(obj.fd);');
			}catch(e){
				print('WARNING: finalizer failed for fd ' + obj.fd + ' (ignoring): ' + e);
			}
			delete obj.fd;
		}
	);
	server=null;
}catch(e){
	console.log(e);
}
console.log('--------------------------------------------------------------------------------')
console.log('Native Class example 1:'+new Date().getTime()) //???
console.log('--------------------------------------------------------------------------------')
Duktape.fin(
	cpr_req.prototype,
	function(obj,bool_heapDestruction){
		//todo: how to delete the c++ class???
		//console.log('Finalizer Called!');
		console.log('cpr_req.prototype::finalizer()!');
		console.log(obj);
		console.log(bool_heapDestruction);
		delete obj;
	}
);
var r=new cpr_req();
r=null;
console.log('--------------------------------------------------------------------------------')
console.log('Native Class example 2:'+new Date().getTime()) //???
console.log('--------------------------------------------------------------------------------')
Duktape.fin(
	Database.prototype,
	function(obj,bool_heapDestruction){
		//todo: how to delete the c++ class???
		console.log('Database.prorotype::finalizer()!');
		console.log(obj);
		console.log(bool_heapDestruction);
		delete obj;
	}
);
var db=new Database("./db/sqlite/test.db3");
db=null;
Duktape.gc()
console.log('--------------------------------------------------------------------------------')
