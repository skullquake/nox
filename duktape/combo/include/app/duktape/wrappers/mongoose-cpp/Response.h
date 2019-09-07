#ifndef APP_DUKTAPE_WRAPPERS_MONGOOSE_CPP_RESPONSE_H
#define APP_DUKTAPE_WRAPPERS_MONGOOSE_CPP_RESPONSE_H
#include"mongoose-cpp/StreamResponse.h"
namespace app::duktape::wrappers::mongoose_cpp{
	void writeHttpResponse(::Mongoose::StreamResponse& r,std::string s);
}
#endif
