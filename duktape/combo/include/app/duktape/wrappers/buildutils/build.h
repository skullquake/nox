/*
 * utility class for build operations
 */

#ifndef APP_DUKTAPE_WRAPPERS_BUILDUTILS_BUILD_H
#define APP_DUKTAPE_WRAPPERS_BUILDUTILS_BUILD_H
#include<string>
namespace app::duktape::wrappers::buildutils{
	class Build{
		public:
			Build();
			~Build();
			int getBuildNumber();
			std::string getBuildDate();
	};
}
#endif
