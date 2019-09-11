try{
	console.log("_response.hasHeader(\"foo\"):");
	console.log(_response.hasHeader("foo"));
	_response.setHeader("bar","baz");
	console.log("getData():");
	//console.log(_response.getData());//breaks on get: todo: handler
	_response.setCookie("qux","klutz");

	//now using _response.write()...
	var nrow=8;
	var ncol=8;
	_response.write('\
<!DOCTYPE html>\n\
<html>\n\
	<head>\n\
		<title>\n\
			CJS Mongoose::Response Test\n\
		</title>\n\
	</head>\n\
	<body>\n\
		<h3>\n\
			Table\n\
		</h3>\n\
		<table>\n\
			<tr>\n\
				<th>\n\
'
	);
	for(var i=0;i<ncol;i++){
		_response.write("\
					<td>\n\
						Col"+i+"\n\
					</td>\n\
"
		);
	}
		_response.write("\
			</tr>\n\
"
		);
	for(var i=0;i<nrow;i++){
		_response.write("\
			<tr>\n\
"
		);
		for(var j=0;j<ncol;j++){
			_response.write("\
					<td>\n\
						"+i*ncol+j+"\n\
					</td>\n\
"
			);
		}
		_response.write("\
			</tr>\n\
"
		);
	}
	_response.write("\
		</table>\n\
	</body>\n\
</html>\n\
"
	);

}catch(e){
	console.error(e);
}
