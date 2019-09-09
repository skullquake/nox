#include"app/duktape/wrappers/cpr/parameters.h"
//#include<iostream>
namespace app::duktape::wrappers::cpr{
	Parameters::Parameters(std::map<std::string,std::string> a)
		: ::cpr::Parameters()
	{
		std::map<std::string,std::string>::iterator it;
		for(it=a.begin();it!=a.end();it++){
			//std::cout<<(it->first)<<"\t"<<(it->second)<<std::endl;
			struct ::cpr::Parameter p(it->first,it->second);
			::cpr::Parameters::AddParameter(p);
		}

	}
	void Parameters::AddParameters(std::map<std::string,std::string> a){
		std::map<std::string,std::string>::iterator it;
		for(it=a.begin();it!=a.end();it++){
			//std::cout<<(it->first)<<"\t"<<(it->second)<<std::endl;
			struct ::cpr::Parameter p(it->first,it->second);
			::cpr::Parameters::AddParameter(p);
		}
	}
	std::string Parameters::getContent(){
		return this->content;
	}
			       
}
