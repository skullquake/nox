#ifndef APP_DUKTAPE_WRAPPERS_CPR_GET_H
#define APP_DUKTAPE_WRAPPERS_CPR_GET_H
#include"app/duktape/wrappers/cpr/parameters.h"
#include"cpr/response.h"
#include"cpr/api.h"
#include<map>
namespace app::duktape::wrappers::cpr{
	//todo: put in a reusable class
	std::map<std::string,std::string> Get(std::string,::app::duktape::wrappers::cpr::Parameters&);
}
#endif
