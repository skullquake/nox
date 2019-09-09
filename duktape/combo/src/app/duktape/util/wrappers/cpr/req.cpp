#include"app/duktape/wrappers/cpr/req.h"
#include"cpr/cpr.h"
#include<iostream>
namespace app::duktape::wrappers::cpr{
	Req::Req(){
		std::cout<<"app::duktape::wrappers::cpr::Req()"<<std::endl;
	}
	Req::~Req(){
		std::cout<<"app::duktape::wrappers::cpr::Req()"<<std::endl;
	}

void Req::setRequestHeaders(std::map<std::string,std::string> a){
	std::cout<<"app::duktape::wrappers::cpr::setRequestHeaders()"<<std::endl;
	this->m_reqhdr=a;
	return;
}
std::map<std::string,std::string> Req::getRequestHeaders(){
	std::cout<<"app::duktape::wrappers::cpr::getRequestHeaders()"<<std::endl;
	return this->m_reqhdr;
}
void Req::setRequestUrl(std::string a){
	std::cout<<"app::duktape::wrappers::cpr::setRequestUrl()"<<std::endl;
	this->m_requrl=a;
	return;
}
std::string Req::getRequestUrl(){
	std::cout<<"app::duktape::wrappers::cpr::getRequestUrl()"<<std::endl;
	return this->m_requrl;
}

void Req::setRequestParameters(std::map<std::string,std::string> a){
	std::cout<<"app::duktape::wrappers::cpr::setRequestParameters()"<<std::endl;
	this->m_reqp=a;
	return;
}
std::map<std::string,std::string> Req::getRequestParameters(){
	std::cout<<"app::duktape::wrappers::cpr::getRequestParameters()"<<std::endl;
	return this->m_reqp;
}
void Req::setRequestMethod(std::string a){
	std::cout<<"app::duktape::wrappers::cpr::setRequestMethod()"<<std::endl;
	this->m_reqm=a;
	return;
}
std::string Req::getRequestMethod(){
	std::cout<<"app::duktape::wrappers::cpr::getRequestMethod()"<<std::endl;
	return this->m_reqm;
}
void Req::setRequestCookie(std::map<std::string,std::string> a){
	std::cout<<"app::duktape::wrappers::cpr::setRequestCookie()"<<std::endl;
	this->m_reqck=a;
	return;
}
std::map<std::string,std::string> Req::getRequestCookie(){
	std::cout<<"app::duktape::wrappers::cpr::getRequestCookie()"<<std::endl;
	return this->m_reqck;
}
void Req::setRequestTimeout(int a){
	std::cout<<"app::duktape::wrappers::cpr::setRequestTimeout()"<<std::endl;
	this->m_reqt=a;
}
int Req::getRequestTimeout(){
	std::cout<<"app::duktape::wrappers::cpr::getRequestTimeout()"<<std::endl;
	return this->m_reqt;
}
bool Req::execRequest(){
	std::cout<<"app::duktape::wrappers::cpr::execRequest()"<<std::endl;
	try{
		auto r=::cpr::Get(
			::cpr::Url{this->m_requrl},
			::cpr::Timeout{this->m_reqt}
		);
		//this->m_reshdr=r.header;
		std::map<std::string,std::string>::iterator it;
		for(auto it=r.header.begin();it!=r.header.end();it++){
			this->m_reshdr[it->first]=it->second;
		}
		this->m_resb=r.text;
		this->m_resck=r.cookies.GetEncoded();
		//for(auto it=r.cookies.begin();it!=r.cookies.end();it++){
		//	this->m_resck[it->first]=it->second;
		//}
		switch(r.error.code){
			case ::cpr::ErrorCode::OK:
				//this->m_resstatus=r.status_code;
				break;
			case ::cpr::ErrorCode::CONNECTION_FAILURE:
				break;
			case ::cpr::ErrorCode::EMPTY_RESPONSE:
				break;
			case ::cpr::ErrorCode::HOST_RESOLUTION_FAILURE:
				break;
			case ::cpr::ErrorCode::INTERNAL_ERROR:
				break;
			case ::cpr::ErrorCode::INVALID_URL_FORMAT:
				break;
			case ::cpr::ErrorCode::NETWORK_RECEIVE_ERROR:
				break;
			case ::cpr::ErrorCode::NETWORK_SEND_FAILURE:
				break;
			case ::cpr::ErrorCode::OPERATION_TIMEDOUT:
				break;
			case ::cpr::ErrorCode::PROXY_RESOLUTION_FAILURE:
				break;
			case ::cpr::ErrorCode::SSL_CONNECT_ERROR:
				break;
			case ::cpr::ErrorCode::SSL_LOCAL_CERTIFICATE_ERROR:
				break;
			case ::cpr::ErrorCode::SSL_REMOTE_CERTIFICATE_ERROR:
				break;
			case ::cpr::ErrorCode::SSL_CACERT_ERROR:
				break;
			case ::cpr::ErrorCode::GENERIC_SSL_ERROR:
				break;
			default:
				break;
			}
		return true;
	}catch(std::exception e){
		std::cerr<<e.what()<<std::endl;
		return false;
	}
}

std::map<std::string,std::string> Req::getResponseHeaders(){
	std::cout<<"app::duktape::wrappers::cpr::getResponseHeaders()"<<std::endl;
	return this->m_reshdr;
}
std::string Req::getResponseBody(){
	std::cout<<"app::duktape::wrappers::cpr::getResponseBody()"<<std::endl;
	return this->m_resb;
}
std::string Req::getResponseCookie(){
	std::cout<<"app::duktape::wrappers::cpr::getResponseCookie()"<<std::endl;
	return this->m_resck;
}
int Req::getResponseError(){
	std::cout<<"app::duktape::wrappers::cpr::getResponseError()"<<std::endl;
	return this->m_reserror;
}
int Req::getResponseStatusCode(){
	std::cout<<"app::duktape::wrappers::cpr::getResponseStatusCode()"<<std::endl;
	return this->m_resstatus;
}
double Req::getResponseElapsed(){
	std::cout<<"app::duktape::wrappers::cpr::getResponseElapsed()"<<std::endl;
	return this->m_resel;
}
/*
private:
std::map<std::string,std::string> m_reqhdr;
std::string m_requrl;
std::map<std::string,std::string> m_reqp;
std::map<std::string,std::string> m_reqck;
std::map<std::string,std::string> m_reshdr;
std::map<std::string,std::string> m_resck;
std::string m_resb;
int m_timeout;
*/

}
