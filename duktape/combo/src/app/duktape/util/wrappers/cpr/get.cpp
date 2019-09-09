#include"app/duktape/wrappers/cpr/get.h"
#include"cpr/cprtypes.h"
#include<iostream>
namespace app::duktape::wrappers::cpr{
	//todo: put in a reuasable class
	std::map<std::string,std::string> Get(std::string url,::app::duktape::wrappers::cpr::Parameters& par){
		std::cout<<"A"<<std::endl;
		auto response=::cpr::Get(::cpr::Url(url),par);
		std::cout<<"B"<<std::endl;
		std::map<std::string,std::string> r;
		r["status_code"]=std::to_string(response.status_code);
		r["text"]=response.text;
		r["url"]=response.url;
		r["elapsed"]=std::to_string(response.elapsed);
		r["headers"]="test";
		std::string headers;
		std::map<std::string,std::string>::iterator it;
		for(auto it=response.header.begin();it!=response.header.end();it++){
			std::cout<<it->first<<std::endl;
			std::cout<<it->second<<std::endl;
		}
		r["cookies"]=response.cookies.GetEncoded();
		return r;
	}
}
