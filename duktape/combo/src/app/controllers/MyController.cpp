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
#include <chrono>


#ifndef NO_JSONCPP
#include"jsoncpp/json.h"
#endif
using namespace Mongoose;
namespace app::controllers{
	MyController::MyController()
	             : ::Mongoose::WebController()
	{
		this->ctx=NULL;
		//initialization scripts
		std::string src="./res/cjs/ep/ctl/mycontroller/init.js";
		if(src.length()>0){
			try{
				duk_context* ctx=NULL;
				if(
					this->ctx==NULL
				){
					std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: creating controller root context..."<<std::endl;
					this->ctx=duk_create_heap_default();
					ctx=this->ctx;
					dukglue_push(ctx,&(*this));
					duk_put_global_string(ctx,"controller");
					dukglue_push(ctx,this->getServer());
					duk_put_global_string(ctx,"server");
					app::duktape::util::_register(ctx);
					std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: done"<<std::endl;
				}else{
					ctx=this->ctx;
				}	
				std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: executing startup scripts..."<<std::endl;
				app::duktape::wrappers::push_file_as_string(ctx,src.c_str());
				if(duk_peval(ctx)!=0){
					std::cerr<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: error: "<<std::string(duk_safe_to_string(ctx,-1))<<std::endl;
				}
				duk_pop(ctx);
				duk_destroy_heap(ctx);
				this->ctx=NULL;
				std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: done"<<std::endl;
			}catch(std::exception e){
				std::cerr<<e.what()<<std::endl;
			}
		}else{
		}
	}
	MyController::~MyController(){
		this->ctx=NULL;
		//initialization scripts
		std::string src="./res/cjs/ep/ctl/mycontroller/deinit.js";
		if(src.length()>0){
			try{
				duk_context* ctx=NULL;
				if(
					this->ctx==NULL
				){
					std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: creating controller root context..."<<std::endl;
					this->ctx=duk_create_heap_default();
					ctx=this->ctx;
					dukglue_push(ctx,&(*this));
					duk_put_global_string(ctx,"controller");
					dukglue_push(ctx,this->getServer());
					duk_put_global_string(ctx,"server");
					app::duktape::util::_register(ctx);
					std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: done"<<std::endl;
				}else{
					ctx=this->ctx;
				}
				std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: executing server shutdown scripts...";
				app::duktape::wrappers::push_file_as_string(ctx,src.c_str());
				if(duk_peval(ctx)!=0){
					std::cerr<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: error: "<<std::string(duk_safe_to_string(ctx,-1))<<std::endl;
				}
				duk_pop(ctx);
				duk_destroy_heap(ctx);
				this->ctx=NULL;
				std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" done"<<std::endl;
			}catch(std::exception e){
				std::cerr<<e.what()<<std::endl;
			}
		}else{
		}

	}
	void MyController::setup(){
		std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: setting up endpoints..."<<std::endl;
		addRoute("GET","/",MyController,home);
		addRoute("GET","/duk",MyController,duk);
		addRoute("POST","/duk",MyController,duk);
		addRoute("PUT","/duk",MyController,duk);
		addRoute("GET","/xas",MyController,xas);
		addRoute("POST","/xas",MyController,xas);
		addRoute("PUT","/xas",MyController,xas);
		addRoute("POST","/log",MyController,log);
		std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: done"<<std::endl;
	}
	void MyController::home(::Mongoose::Request &request, ::Mongoose::StreamResponse &response){
		std::string src="./res/cjs/ep/ctl/mycontroller/hdlr/home.js";
		if(src.length()>0){
			try{
				Mongoose::Session* session=this->getSessions()->getPtr(request,response);
				duk_context* ctx=NULL;
				if(
					session->getCtx()==NULL
				){
					std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: init ses root ctx: start"<<std::endl;
					session->setCtx(duk_create_heap_default());
					ctx=session->ctx;
					dukglue_push(ctx,&(*this));
					duk_put_global_string(ctx,"controller");
					dukglue_push(ctx,&(this->getSession(request,response)));
					duk_put_global_string(ctx,"session");
					dukglue_push(ctx,this->getServer());
					duk_put_global_string(ctx,"server");
					app::duktape::util::_register(ctx);
					//session gctx init script
					app::duktape::wrappers::push_file_as_string(ctx,"./res/cjs/ep/ctl/mycontroller/ses/init.js");
					if(duk_peval(ctx)!=0){
						std::cerr<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: init ses root ctx: error: "<<std::string(duk_safe_to_string(ctx,-1))<<std::endl;
					}else{
						std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: init ses root ctx: done"<<std::endl;
					}
				}else{
					ctx=session->getCtx();
				}
				// new ctx 
				/*
				*/
				duk_context *new_ctx;
				duk_push_thread(ctx);
				//duk_push_thread_new_globalenv(ctx);
				new_ctx=duk_get_context(ctx,-1);
				dukglue_push(new_ctx,&response);
				duk_put_global_string(new_ctx,"response");

				//build and push proxy
				app::duktape::wrappers::mongoose_cpp::StreamResponse responseProxy(&response);
				dukglue_push(new_ctx,&responseProxy);
				duk_put_global_string(new_ctx,"_response");

				dukglue_push(new_ctx,&request);
				duk_put_global_string(new_ctx,"request");
				std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: "<<src<<": start"<<std::endl;
				app::duktape::wrappers::push_file_as_string(new_ctx,src.c_str());
				if(duk_peval(new_ctx)!=0){
					std::cerr<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: "<<src<<" error: "<<std::string(duk_safe_to_string(new_ctx,-1))<<std::endl;
				}else{
					std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: "<<src<<": done"<<std::endl;
				}
				duk_pop(ctx);
				//duk_destroy_heap(new_ctx);


				//old ctx
				/*
				std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: creating session child context..."<<std::endl;
				duk_context *new_ctx=ctx;
				std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: done"<<std::endl;
				app::duktape::wrappers::push_file_as_string(new_ctx,src.c_str());
				if(duk_peval(new_ctx)!=0){
					std::cerr<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: error: "<<std::string(duk_safe_to_string(new_ctx,-1))<<std::endl;
				
				}
				*/
			}catch(std::exception e){
				std::cerr<<e.what()<<std::endl;
			}
		}else{
			response.setCode(400);
			response<<"No Script Specified"<<std::endl;
		}

	}
	void MyController::duk(::Mongoose::Request &request, ::Mongoose::StreamResponse &response){
		//std::cout<<"void MyController::duk(::Mongoose::Request &request, ::Mongoose::StreamResponse &response)"<<std::endl;
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
					//session gctx native objects
					dukglue_push(ctx,&(*this));
					duk_put_global_string(ctx,"controller");
					dukglue_push(ctx,&(this->getSession(request,response)));
					duk_put_global_string(ctx,"session");
					dukglue_push(ctx,this->getServer());
					duk_put_global_string(ctx,"server");
					app::duktape::util::_register(ctx);
					//session gctx init script
					app::duktape::wrappers::push_file_as_string(ctx,"./res/cjs/ep/ctl/mycontroller/ses/init.js");
					if(duk_peval(ctx)!=0){
						std::cerr<<"./res/cjs/ep/ctl/mycontroller/ses/init.js: error: "<<std::string(duk_safe_to_string(ctx,-1))<<std::endl;
					}

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
				std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" "<<src<<": "<<":starting ..."<<std::endl;
				if(duk_peval(new_ctx)!=0){
					std::cerr<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" "<<src<<": error: "<<std::string(duk_safe_to_string(new_ctx,-1))<<std::endl;
				}else{
					std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" "<<src<<": "<<":done"<<std::endl;
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
#ifdef NO_JSONCPP
	void MyController::xas(::Mongoose::Request &request, ::Mongoose::StreamResponse &response){
		response<<"XAS[JSONCPP:OFF]";
	}
#else
	void r(Json::Value&,std::vector<std::string>,int);
	void MyController::xas(::Mongoose::Request &request, ::Mongoose::StreamResponse &response){
		response<<"XAS[JSONCPP:ON]";
		std::vector<std::string> v{"foo","bar","baz","qux","klutz"}; 
		Json::Value j;
		r(j,v,10);
		Json::StyledWriter styledWriter;
		response<<styledWriter.write(j);
	}
	void r(Json::Value& j,std::vector<std::string> v,int i){
		if(i<0){
			for(std::string x:v) 
				j[x]=x;
			return;
		}else{
			for(std::string x:v){
				j[x]=Json::Value();
				r(j[x],v,--i);
			}
		}

	}
#endif
	void MyController::log(::Mongoose::Request &request, ::Mongoose::StreamResponse &response){
		std::cout<<std::chrono::duration_cast<std::chrono::milliseconds>(std::chrono::system_clock::now().time_since_epoch()).count()<<" ctl: log: "<<request.getData()<<std::endl;
	}
}

