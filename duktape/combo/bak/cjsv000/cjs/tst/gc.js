try{
	var sessions=server.getSessions();
	console.log(
		'Dropping '+
		Object.keys(sessions.getSessions()).length+
		' sessions'
	);
	sessions.garbageCollect(0);
}catch(e){
	console.error(e);
}

