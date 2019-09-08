#ifndef APP_CONTROLLERS_MYCONTROLLER_H
#define APP_CONTROLLERS_MYCONTROLLER_H
#include"mongoose-cpp/Server.h"
#include"mongoose-cpp/WebController.h"
#include"app/duktape/wrappers/mongoose-cpp/Response.h"
#include"duktape/duktape.h"
#include"dukglue/dukglue.h"
namespace app::controllers{
	class MyController:public Mongoose::WebController{
		public: 
			MyController();
			~MyController();
			void home(Mongoose::Request &request, Mongoose::StreamResponse &);
			void duk(Mongoose::Request &request, Mongoose::StreamResponse &);
			void setup();
		private:
			duk_context* ctx;
	};
}
#endif



