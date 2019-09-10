/*
 *
module.exports={
	exec:function(p){
		console.log(new Date().getTime()+" cjs/ctl/main.js:exec()...starting");
		this.db=new Database(p);
		console.log(new Date().getTime()+" cjs/ctl/main.js:exec()...ending");
	}
}
 */

var exports = {
	exec:function(p){
		console.log(new Date().getTime()+" cjs/ctl/main.js:exec()...starting");
		this.db=new Database(p);
		console.log(new Date().getTime()+" cjs/ctl/main.js:exec()...ending");
	}

};
var module = {
	  exports: exports,   /* initial value, may be replaced by user */
	  id: 'package/lib'
};
console.log(module.id);
