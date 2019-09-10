module.exports={
	get:function(url,par,hdr,ck,t){
		if(url!=null){
			par=typeof(par)!='undefined'?par:{};
			hdr=typeof(hdr)!='undefined'?hdr:{};
			ck=typeof(ck)!='undefined'?ck:{};
			t=typeof(t)!='undefined'?t:1000;
			var ret={
			};
			var req=new cpr_req();
			req.setRequestHeaders(hdr)
			req.setRequestUrl(url)
			req.setRequestParameters(par)
			req.setRequestMethod('GET');
			req.setRequestCookie(ck)
			req.setRequestTimeout(t);
			if(req.execRequest()){
				ret.err=false;
				ret.hdr=req.getResponseHeaders();
				ret.bod=req.getResponseBody();
				ret.cookie=req.getResponseCookie();
			}else{
				ret.err=true;
				ret.errmsg=req.getResponseErrorMessage();
			};
		}else{
		}
		return ret;
	},
	post:function(url,par,hdr,ck,t,bod){
		if(url!=null){
			par=typeof(par)!='undefined'?par:{};
			hdr=typeof(hdr)!='undefined'?hdr:{};
			ck=typeof(ck)!='undefined'?ck:{};
			t=typeof(t)!='undefined'?t:1000;
			bod=typeof(bod)!='undefined'?bod:'';
			var ret={};
			var req=new cpr_req();
			req.setRequestHeaders(hdr)
			req.setRequestUrl(url)
			req.setRequestParameters(par)
			req.setRequestMethod('POST');
			req.setRequestBody(bod);
			req.setRequestCookie(ck)
			req.setRequestTimeout(t);
			if(req.execRequest()){
				ret.err=false;
				ret.hdr=req.getResponseHeaders();
				ret.bod=req.getResponseBody();
				ret.cookie=req.getResponseCookie();
			}else{
				ret.err=true;
				ret.errmsg=req.getResponseErrorMessage();
			};
		}else{
		}
		return ret;
	}

}
