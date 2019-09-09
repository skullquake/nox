#ifndef APP_DUKTAPE_WRAPPERS_CPR_PARAMETERS_H
#define APP_DUKTAPE_WRAPPERS_CPR_PARAMETERS_H
#include"cpr/parameters.h"
#include<map>
namespace app::duktape::wrappers::cpr{
	class Parameters:public ::cpr::Parameters{
		public:
			Parameters(std::map<std::string,std::string>);
			void AddParameters(std::map<std::string,std::string>);
			std::string getContent();
		private:
	};
}
#endif
