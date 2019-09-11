try{
	//--------------------------------------------------------------------------------
	//extend console.log
	_console={};
	_console.log=console.log;
	console.log=function(a){
		try{
			writeHttpResponse(
				response,
				a.toString()+'\n'
			);
			_console.log(a);
		}catch(e){
			writeHttpResponse(
				response,
				JSON.stringify(a)+'\n'
			);
			_console.log(a);

		}finally{
		}
	}
	//--------------------------------------------------------------------------------
	//ctl test
	//--------------------------------------------------------------------------------
	console.log('ctl');
	console.log(typeof(controller));
	/* does not work yet */
	console.log(getSession(request,response,controller));
	//controller.dumpRoutes();//???
	//console.log(controller.session());
	//controller.setPrefix("foo","");
}catch(e){
	writeHttpResponse(
		response,
		e.toString()
	);
}
