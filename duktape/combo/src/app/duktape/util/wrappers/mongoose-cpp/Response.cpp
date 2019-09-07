#include"app/duktape/wrappers/mongoose-cpp/Response.h"
namespace app::duktape::wrappers::mongoose_cpp{
	void writeHttpResponse(Mongoose::StreamResponse& r,std::string s){
		try{
			r<<s;
		}catch(std::exception e){
			std::cout<<"Error"<<e.what()<<std::endl;
		}
	}
}
