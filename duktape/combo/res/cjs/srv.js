try{
	console.log('srv');
	server.printStats();
	//server.poll();//stuck
	//server.stop();//makes unusable
	//server.start();//throws error
	//server.handleRequest(request);//recurses
		//live changes on mg for this is not implemented in the class yet
	//server.setOption("enable_directory_listing","no");
	//server.setOption("document_root","./pub");
	console.log(server.handles("GET","/"));
	console.log(server.handles("GET","/xas"));
		//get Mongoose::Sessions session container
	var sessions=server.getSessions();
	console.log(sessions);
		//..try log in to other browsers and run this with the curl test function
		//..it will print the sessions
	console.log(sessions.getSessions());
}catch(e){
	console.error(e);
}

