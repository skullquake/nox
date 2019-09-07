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
namespace app::duktape::util{
	void _register(duk_context* ctx){
		if(ctx!=NULL){
			try{
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

				//dukglue_push(ctx,&request);
				//duk_put_global_string(ctx,"request");
				dukglue_register_method(ctx,&::Mongoose::Request::get,"get");//fix - fallback
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

				//expose ::Mongoose::Sessions [container for sessions]
				dukglue_register_method(ctx,&::Mongoose::Sessions::getSessions,"getSessions");
				dukglue_register_method(ctx,&::Mongoose::Sessions::garbageCollect,"garbageCollect");
				       
				//expose sqlitecpp issues in namespace
				dukglue_register_constructor<::app::duktape::wrappers::SQLiteCpp::Database,const char*>(ctx,"Database");
				dukglue_register_method(ctx,static_cast<bool (app::duktape::wrappers::SQLiteCpp::Database::*)(const char*)>(&app::duktape::wrappers::SQLiteCpp::Database::tableExists),"tableExists");
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





			}catch(std::exception e){
			}

		}else{
		}
	}
}

