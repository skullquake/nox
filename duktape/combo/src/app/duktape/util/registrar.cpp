#include"app/duktape/util/registrar.h"
#include"dukglue/dukglue.h"
#include"duktape/extras/print-alert/duk_print_alert.h"
#include"duktape/extras/console/duk_console.h"
#include"duktape/extras/module-duktape/duk_module_duktape.h"
#include"mongoose-cpp/WebController.h"
#include"mongoose-cpp/StreamResponse.h"
#include"mongoose-cpp/Request.h"
#include"mongoose-cpp/Server.h"
#include"mongoose-cpp/Session.h"
#include"mongoose-cpp/Sessions.h"
#include"app/duktape/wrappers/io.h"
#include"app/duktape/wrappers/mongoose-cpp/Response.h"
#include"app/duktape/wrappers/SQLiteCpp/Database.h"
#include"app/duktape/wrappers/cpr/parameters.h"
#include"app/duktape/wrappers/cpr/get.h"
#include"app/duktape/wrappers/cpr/req.h"
//#include"cpr/response.h"
#include"app/duktape/wrappers/fsutils/fs.h"
#include"app/duktape/wrappers/buildutils/build.h"
#include<vector>
#include<iostream>
namespace app::duktape::util{
	void test(std::vector<unsigned char> v,::Mongoose::StreamResponse &r){
		for(auto t=v.begin(); t!=v.end(); ++t){
			r<<*t;
		}
	}
	//add String.fromBufferRaw (see duk cli);[todo move to utils]
	static duk_ret_t string_frombufferraw(duk_context *ctx) {
		duk_buffer_to_string(ctx, 0);
		return 1;
	}
	void _register(duk_context* ctx){
		if(ctx!=NULL){
			try{
				//add String.fromBufferRaw (see duk cli);[todo move to utils]
				duk_eval_string(ctx,"(function(v){if (typeof String === 'undefined') { String = {}; }Object.defineProperty(String, 'fromBufferRaw', {value:v, configurable:true});})");
				duk_push_c_function(ctx, string_frombufferraw, 1 /*nargs*/);
				(void) duk_pcall(ctx, 1);
				duk_pop(ctx);

				dukglue_register_function(ctx,&test,"test");

				duk_push_c_function(ctx,::app::duktape::wrappers::fileio_read_file,1);
				duk_put_global_string(ctx,"readFile");
				duk_push_c_function(ctx,::app::duktape::wrappers::fileio_write_file,2);
				duk_put_global_string(ctx,"writeFile");
				duk_module_duktape_init(ctx);
				duk_console_init(ctx,DUK_CONSOLE_PROXY_WRAPPER|DUK_CONSOLE_FLUSH );
				duk_print_alert_init(ctx,0);
				dukglue_register_method(ctx,&::Mongoose::WebController::dumpRoutes,"dumpRoutes");
				dukglue_register_method(ctx,&::Mongoose::WebController::preProcess,"preProcess");
				dukglue_register_method(ctx,&::Mongoose::WebController::process,"process");
				dukglue_register_method(ctx,&::Mongoose::WebController::handleRequest,"handleRequest");
				dukglue_register_method(ctx,&::Mongoose::WebController::webSocketReady,"webSocketReady");
				dukglue_register_method(ctx,&::Mongoose::WebController::webSocketData,"webSocketData");
				dukglue_register_method(ctx,&::Mongoose::WebController::registerRoute,"registerRoute");
				dukglue_register_method(ctx,&::Mongoose::WebController::setup,"setup");
				dukglue_register_method(ctx,&::Mongoose::WebController::serverInternalError,"serverInternalError");
				//dukglue_register_method(ctx,&::Mongoose::WebController::getSession,"getSession");
				//dukglue_register_method(ctx,&::Mongoose::WebController::setSessions,"setSession");
				dukglue_register_method(ctx,&::Mongoose::WebController::handles,"handles");

				//dukglue_push(ctx,&response);
				//duk_put_global_string(ctx,"response");
				dukglue_register_method(ctx,&::Mongoose::StreamResponse::hasHeader,"hasHeader");
				dukglue_register_method(ctx,&::Mongoose::StreamResponse::setHeader,"setHeader");
				dukglue_register_method(ctx,&::Mongoose::StreamResponse::getData,"getData");
				dukglue_register_method(ctx,&::Mongoose::StreamResponse::getBody,"getBody");
				dukglue_register_method(ctx,&::Mongoose::StreamResponse::setCookie,"setCookie");
				dukglue_register_method(ctx,&::Mongoose::StreamResponse::setCode,"setCode");

				//proxy
				//

				dukglue_register_constructor<::app::duktape::wrappers::mongoose_cpp::StreamResponse,::Mongoose::StreamResponse*>(ctx,"_StreamResponse");
				dukglue_register_method(ctx,&::app::duktape::wrappers::mongoose_cpp::StreamResponse::hasHeader,"hasHeader");
				dukglue_register_method(ctx,&::app::duktape::wrappers::mongoose_cpp::StreamResponse::setHeader,"setHeader");
				dukglue_register_method(ctx,&::app::duktape::wrappers::mongoose_cpp::StreamResponse::getData,"getData");
				dukglue_register_method(ctx,&::app::duktape::wrappers::mongoose_cpp::StreamResponse::getBody,"getBody");
				dukglue_register_method(ctx,&::app::duktape::wrappers::mongoose_cpp::StreamResponse::setCookie,"setCookie");
				dukglue_register_method(ctx,&::app::duktape::wrappers::mongoose_cpp::StreamResponse::setCode,"setCode");
				dukglue_register_method(ctx,&::app::duktape::wrappers::mongoose_cpp::StreamResponse::write,"write");

				//dukglue_push(ctx,&request);
				//duk_put_global_string(ctx,"request");
				dukglue_register_method(ctx,&::Mongoose::Request::get,"get");//fix - fallback
				dukglue_register_method(ctx,&::Mongoose::Request::getQueryString,"getQueryString");
				dukglue_register_method(ctx,&::Mongoose::Request::getAllVariable,"getAllVariable");//fix - completely not working in js
				dukglue_register_method(ctx,&::Mongoose::Request::hasCookie,"hasCookie");
				dukglue_register_method(ctx,&::Mongoose::Request::getHeaderKeyValue,"getHeaderKeyValue");
				dukglue_register_method(ctx,&::Mongoose::Request::getUrl,"getUrl");
				dukglue_register_method(ctx,&::Mongoose::Request::getMethod,"getMethod");
				dukglue_register_method(ctx,&::Mongoose::Request::getData,"getData");
				//dukglue_register_method(ctx,&::Mongoose::Request::readVariable,"readVariable");
				//dukglue_register_method(ctx,&::Mongoose::Request::uploadFiles,"uploadFiles");
				dukglue_register_method(ctx,&::Mongoose::Request::getCookie,"getCookie");
				dukglue_register_method(ctx,&::Mongoose::Request::writeResponse,"writeResponse");
				dukglue_register_function(ctx,&::app::duktape::wrappers::mongoose_cpp::writeHttpResponse,"writeHttpResponse");
				//auto glambda = [](auto a, auto&& b) { return a < b; };
				//dukglue_register_function(ctx,&getSession,"getSession");

				//expose ::Mongoose::Session instance to scripting language	
				//dukglue_push(ctx,&controller->getSession(request,response));
				//duk_put_global_string(ctx,"session");
				dukglue_register_method(ctx,&::Mongoose::Session::setValue,"setValue");
				dukglue_register_method(ctx,&::Mongoose::Session::unsetValue,"unsetValue");
				dukglue_register_method(ctx,&::Mongoose::Session::hasValue,"hasValue");
				dukglue_register_method(ctx,&::Mongoose::Session::get,"get");
				dukglue_register_method(ctx,&::Mongoose::Session::getValues,"getValues");
				dukglue_register_method(ctx,&::Mongoose::Session::ping,"ping");
				dukglue_register_method(ctx,&::Mongoose::Session::getAge,"getAge");

				//expose ::Mongoose::Server
				dukglue_register_method(ctx,&::Mongoose::Server::start,"start");
				dukglue_register_method(ctx,&::Mongoose::Server::stop,"stop");
				dukglue_register_method(ctx,&::Mongoose::Server::registerController,"registerController");
				dukglue_register_method(ctx,&::Mongoose::Server::handleRequest,"handleRequest");
				dukglue_register_method(ctx,&::Mongoose::Server::setOption,"setOption");
				//dukglue_register_method(ctx,&::Mongoose::Server::getWebSockets,"getWebSockets");
				dukglue_register_method(ctx,&::Mongoose::Server::printStats,"printStats");
				dukglue_register_method(ctx,&::Mongoose::Server::poll,"poll");
				dukglue_register_method(ctx,&::Mongoose::Server::handles,"handles");
				dukglue_register_method(ctx,&::Mongoose::Server::getSessions,"getSessions");
				dukglue_register_method(ctx,&::Mongoose::Server::isRunning,"running");

				//expose ::Mongoose::Sessions [container for sessions]
				dukglue_register_method(ctx,&::Mongoose::Sessions::getSessions,"getSessions");
				dukglue_register_method(ctx,&::Mongoose::Sessions::garbageCollect,"garbageCollect");
				       
				//expose sqlitecpp issues in namespace
				dukglue_register_constructor<::app::duktape::wrappers::SQLiteCpp::Database,const char*>(ctx,"Database");
				//dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::~Database,"~Database");
				//dukglue_register_method(ctx,static_cast<bool (app::duktape::wrappers::SQLiteCpp::Database::*)(const char*)>(&app::duktape::wrappers::SQLiteCpp::Database::tableExists),"tableExists");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::_tableExists,"tableExists");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::_execAndGet,"execAndGet");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::_exec,"exec");
				//dukglue_register_method(ctx,&SQLiteCpp::Database::getLastInsertRowid,"getLastInsertRowid");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::getTotalChanges,"getTotalChanges");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::getErrorCode,"getErrorCode");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::getExtendedErrorCode,"getExtendedErrorCode");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::getErrorMsg,"getErrorMsg");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::getFilename,"getFilename");
				//dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::getHandle,"getHandle");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::loadExtension,"loadExension");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::key,"key");
				dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::rekey,"rekey");
				//dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::isUnencrypted,"isUnencrypted");
				//dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::backup,"backup");
				//dukglue_register_method(ctx,&app::duktape::wrappers::SQLiteCpp::Database::,"");
		
				//dukglue_register_method(ctx,&Mongoose::Server::start,"start");

				//cpr
				//dukglue_register_type<::cpr::Parameter>(ctx,"cpr_parameter");
				dukglue_register_constructor<::app::duktape::wrappers::cpr::Parameters,std::map<std::string,std::string>>(ctx,"cpr_parameters");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Parameters::AddParameter,"AddParameter");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Parameters::getContent,"getContent");
				//dukglue_register_property(ctx,&::app::duktape::wrappers::cpr::Parameters::getContent,"content");
				//dukglue_register_constructor<::app::duktape::wrappers::cpr::Url>(ctx,"cpr_url");
				//
				//cpr::Get
				dukglue_register_function(ctx,&::app::duktape::wrappers::cpr::Get,"cpr_Get");
				//dukglue_register_function(ctx,&test,"test");
				//cpr::Response
				dukglue_register_constructor<::cpr::Response>(ctx,"cpr_response");
				//request utility wrapper
				dukglue_register_constructor<::app::duktape::wrappers::cpr::Req>(ctx,"cpr_req");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::setRequestHeaders,"setRequestHeaders");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getRequestHeaders,"getRequestHeaders");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::setRequestUrl,"setRequestUrl");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getRequestUrl,"getRequestUrl");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::setRequestParameters,"setRequestParameters");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getRequestParameters,"getRequestParameters");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::setRequestMethod,"setRequestMethod");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getRequestMethod,"getRequestMethod");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::setRequestCookie,"setRequestCookie");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getRequestCookie,"getRequestCookie");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::setRequestTimeout,"setRequestTimeout");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getRequestTimeout,"getRequestTimeout");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::setRequestBody,"setRequestBody");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getRequestBody,"getRequestBody");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::execRequest,"execRequest");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getResponseHeaders,"getResponseHeaders");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getResponseBody,"getResponseBody");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getResponseCookie,"getResponseCookie");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getResponseError,"getResponseError");
				dukglue_register_method(ctx,&::app::duktape::wrappers::cpr::Req::getResponseErrorMessage,"getResponseErrorMessage");
				//fsutils
				dukglue_register_constructor<::app::duktape::wrappers::fsutils::Fs>(ctx,"fsutils_fs");
				dukglue_register_method(ctx,&::app::duktape::wrappers::fsutils::Fs::test,"test");
				//buildutils
				dukglue_register_constructor<::app::duktape::wrappers::buildutils::Build>(ctx,"buildutils_build");
				dukglue_register_method(ctx,&::app::duktape::wrappers::buildutils::Build::getBuildNumber,"getBuildNumber");
				dukglue_register_method(ctx,&::app::duktape::wrappers::buildutils::Build::getBuildDate,"getBuildDate");
				dukglue_register_method(ctx,&::app::duktape::wrappers::buildutils::Build::getBuildNumberCjs,"getBuildNumberCjs");
				dukglue_register_method(ctx,&::app::duktape::wrappers::buildutils::Build::getBuildDateCjs,"getBuildDateCjs");




			}catch(std::exception e){
			}

		}else{
		}
	}
}

