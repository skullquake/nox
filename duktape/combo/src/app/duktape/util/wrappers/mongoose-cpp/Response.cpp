#include"app/duktape/wrappers/mongoose-cpp/Response.h"
#include"mongoose-cpp/StreamResponse.h"
namespace app::duktape::wrappers::mongoose_cpp{
	void writeHttpResponse(::Mongoose::StreamResponse& r,std::string s){
		try{
			r<<s;
		}catch(std::exception e){
			std::cout<<"Error"<<e.what()<<std::endl;
		}
	}
	StreamResponse::StreamResponse(::Mongoose::StreamResponse* streamResponseP){
		this->mStreamResponse=streamResponseP;
	}
	StreamResponse::~StreamResponse(){
	}
	std::string StreamResponse::getBody(){
		return this->mStreamResponse->getBody();
	}
	bool StreamResponse::hasHeader(std::string a){
		return this->mStreamResponse->hasHeader(a);
	}
	void StreamResponse::setHeader(std::string a,std::string b){
		this->mStreamResponse->setHeader(a,b);
	}
	std::string StreamResponse::getData(){
		return this->mStreamResponse->getData();
	}
	void StreamResponse::setCookie(std::string a,std::string b){
		this->mStreamResponse->setCookie(a,b);
	}
	void StreamResponse::setCode(int a){
		this->mStreamResponse->setCode(a);
	}
	void StreamResponse::write(std::string a){
		*(this->mStreamResponse)<<a;
	}
}
