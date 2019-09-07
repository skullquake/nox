#ifndef APP_DUKTAPE_WRAPPERS_MONGOOSE_CPP_RESPONSE_H
#define APP_DUKTAPE_WRAPPERS_MONGOOSE_CPP_RESPONSE_H
#include"mongoose-cpp/StreamResponse.h"
namespace app::duktape::wrappers::mongoose_cpp{
	void writeHttpResponse(::Mongoose::StreamResponse& r,std::string s);
	class StreamResponse{
		public:
			StreamResponse(::Mongoose::StreamResponse*);
			~StreamResponse();
			std::string getBody();
			bool hasHeader(std::string);
			void setHeader(std::string,std::string);
			std::string getData();
			void setCookie(std::string,std::string);
			void setCode(int);
			void write(std::string);
		private:
			::Mongoose::StreamResponse* mStreamResponse;
	};
}
#endif
