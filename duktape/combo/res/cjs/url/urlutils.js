{
	var UrlUtils=function(){
		this.log('Constructor()');
	};
	UrlUtils.prototype.src='res/cjs/url/urlutils.js';
	UrlUtils.prototype.log=function(a){
		//console.log(new Date().getTime()+" "+this.src+": "+a);
	}
	UrlUtils.prototype.getQueryVariable=function(query,variable){
		var vars=query.split('&');
		for(var i=0;i<vars.length;i++){
			var pair=vars[i].split('=');
			if(decodeURIComponent(pair[0])==variable){
				return decodeURIComponent(pair[1]);
			}
		}
		return null;
	}
	module.exports=UrlUtils;
}
