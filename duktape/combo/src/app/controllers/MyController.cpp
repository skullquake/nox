#include"app/controllers/MyController.h"
#include"mongoose-cpp/Session.h"
#include"mongoose-cpp/Sessions.h"
#include"mongoose-cpp/Request.h"
#include"mongoose-cpp/RequestHandler.h"
#include"mongoose-cpp/Response.h"
#include"mongoose-cpp/StreamResponse.h"
#include"app/duktape/util/registrar.h"
#include"duktape/duktape.h"
#include"dukglue/dukglue.h"
#include<iostream>
#include"app/duktape/wrappers/io.h"
#include"app/duktape/wrappers/mongoose-cpp/Response.h"
using namespace Mongoose;
namespace app::controllers{
	MyController::MyController()
	             : ::Mongoose::WebController()
	{
	}
	MyController::~MyController(){
	}
	void MyController::setup(){
		addRoute("GET","/",MyController,home);
		addRoute("GET","/duk",MyController,duk);
		addRoute("POST","/duk",MyController,duk);
		addRoute("PUT","/duk",MyController,duk);
	}
	void MyController::home(::Mongoose::Request &request, ::Mongoose::StreamResponse &response){
		std::string src="./res/cjs/hdl/root.js";
		if(src.length()>0){
			try{
				Mongoose::Session* session=this->getSessions()->getPtr(request,response);
				duk_context* ctx=NULL;
				if(
					session->getCtx()==NULL
				){
					std::cout<<"Creating root context...";
					session->setCtx(duk_create_heap_default());
					ctx=session->ctx;
					dukglue_push(ctx,&(*this));
					duk_put_global_string(ctx,"controller");
					dukglue_push(ctx,&(this->getSession(request,response)));
					duk_put_global_string(ctx,"session");
					dukglue_push(ctx,this->getServer());
					duk_put_global_string(ctx,"server");
					app::duktape::util::_register(ctx);
					std::cout<<"done"<<std::endl;
				}else{
					ctx=session->getCtx();
				}
				/* new ctx */
				std::cout<<"Creating child context...";
				duk_context *new_ctx;
				duk_push_thread(ctx);
				new_ctx=duk_get_context(ctx,-1);
				dukglue_push(new_ctx,&response);
				duk_put_global_string(new_ctx,"response");

				//build and push proxy
				app::duktape::wrappers::mongoose_cpp::StreamResponse responseProxy(&response);
				dukglue_push(new_ctx,&responseProxy);
				duk_put_global_string(new_ctx,"_response");


				dukglue_push(new_ctx,&request);
				duk_put_global_string(new_ctx,"request");
				std::cout<<"done"<<std::endl;
				app::duktape::wrappers::push_file_as_string(new_ctx,src.c_str());
				if(duk_peval(new_ctx)!=0){
					std::cerr<<"Error: "<<std::string(duk_safe_to_string(new_ctx,-1))<<std::endl;
				}
				duk_pop(ctx);
				//duk_destroy_heap(ctx);
			}catch(std::exception e){
				std::cerr<<e.what()<<std::endl;
			}
		}else{
			response.setCode(400);
			response<<"No Script Specified"<<std::endl;
		}

	}
	void MyController::duk(::Mongoose::Request &request, ::Mongoose::StreamResponse &response){
		//extract pars
		std::string src=request.get("src");
		if(src.length()>0){
			try{
				Mongoose::Session* session=this->getSessions()->getPtr(request,response);
				duk_context* ctx=NULL;
				if(
					session->getCtx()==NULL
				){
					session->setCtx(duk_create_heap_default());
					ctx=session->ctx;
					dukglue_push(ctx,&(*this));
					duk_put_global_string(ctx,"controller");
					dukglue_push(ctx,&(this->getSession(request,response)));
					duk_put_global_string(ctx,"session");
					dukglue_push(ctx,this->getServer());
					duk_put_global_string(ctx,"server");
					app::duktape::util::_register(ctx);
				}else{
					ctx=session->getCtx();
				}
				/* new ctx */
				duk_context *new_ctx;
				duk_push_thread(ctx);
				new_ctx=duk_get_context(ctx,-1);
				dukglue_push(new_ctx,&response);
				duk_put_global_string(new_ctx,"response");

				//build and push proxy
				app::duktape::wrappers::mongoose_cpp::StreamResponse responseProxy(&response);
				dukglue_push(new_ctx,&responseProxy);
				duk_put_global_string(new_ctx,"_response");


				dukglue_push(new_ctx,&request);
				duk_put_global_string(new_ctx,"request");
				app::duktape::wrappers::push_file_as_string(new_ctx,src.c_str());
				if(duk_peval(new_ctx)!=0){
					std::cerr<<"Error: "<<std::string(duk_safe_to_string(new_ctx,-1))<<std::endl;
				}
				duk_pop(ctx);
				//duk_destroy_heap(ctx);
			}catch(std::exception e){
				std::cerr<<e.what()<<std::endl;
			}
		}else{
			response.setCode(400);
			response<<"No Script Specified"<<std::endl;
		}


	}
}
