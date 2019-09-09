#ifndef APP_DUKTAPE_WRAPPERS_CPR_RESPONSE_H
#define APP_DUKTAPE_WRAPPERS_CPR_RESPONSE_H
#include"cpr/response.h"
namespace app::duktape::wrappers::cpr{
	class Response:public ::cpr::Response{
		public:
			Response();
		private:
	};
}
#endif
