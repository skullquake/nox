#ifndef APP_CONTROLLERS_MYCONTROLLER_H
#define APP_CONTROLLERS_MYCONTROLLER_H
#include"mongoose-cpp/Server.h"
#include"mongoose-cpp/WebController.h"
namespace app::controllers{
	class MyController:public Mongoose::WebController{
		public: 
			MyController();
			~MyController();
			void hello(Mongoose::Request &request, Mongoose::StreamResponse &);
			void duk(Mongoose::Request &request, Mongoose::StreamResponse &);
			void setup();
		private:
	};
}
#endif

