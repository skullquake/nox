try{
	/*
	console.log(response.hasHeader);
	console.log(response.setHeader);
	console.log(response.getData);
	console.log(response.getBody);
	console.log(response.getCookie);
	console.log(response.setCode);
	console.log(response.getBody());
	*/
	var nrow=8;
	var ncol=8;
	writeHttpResponse(response,'\
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
		writeHttpResponse(response,"\
					<td>\n\
						Col"+i+"\n\
					</td>\n\
"
		);
	}
		writeHttpResponse(response,"\
			</tr>\n\
"
		);
	for(var i=0;i<nrow;i++){
		writeHttpResponse(response,"\
			<tr>\n\
"
		);
		for(var j=0;j<ncol;j++){
			writeHttpResponse(response,"\
					<td>\n\
						"+i*ncol+j+"\n\
					</td>\n\
"
			);
		}
		writeHttpResponse(response,"\
			</tr>\n\
"
		);
	}
	writeHttpResponse(response,"\
		</table>\n\
	</body>\n\
</html>\n\
"
	);
}catch(e){
	console.error(e);
}
