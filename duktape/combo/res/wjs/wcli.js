
$(document).ready(function(){
	window.srvlog=function(a){
		$.post(
			'/log',
			JSON.stringify(a)
		);
	};
	$(window).on('click',function(a){
		if($(a.target).attr('data-srvact')=='true'){
			var url='/?cmd=login&id='+a.target.id+'&ajax=true';
			window.srvlog(url);
			$.get(
				url
			).then(
				function(r){
					//window.srvlog(r.toString());
					/*$(a.target).replaceWith(r);*/
					if(r!=null){
						try{
							r=JSON.parse(r);
							var arrobj=[];
							if(typeof(r.length)=='undefined'){
								arrobj.push(r);
							}else{
								arrobj=r;
							}
							arrobj.forEach(
								function(obj,objidx){
									console.log(obj);
									//obj.id!=null?$(a.target).attr('id',obj.id):null;
									Object.keys(obj.attr).forEach(
										function(attr,attridx){
											obj.attr[attr]!=null
												?
												$('#'+obj.id).attr(attr,obj.attr[attr])
												:
												$('#'+obj.id).removeAttr(attr);
										}
									);
									$('#'+obj.id).text(obj.text)

								}

							);
						}catch(e){
							console.error(e);
						}
					}else{
					}
					/*$(a.target).replaceWith(r);*/
					/*$(a.target).css('background','red');*/
				}
			);

		}else{
		}
	});
});
