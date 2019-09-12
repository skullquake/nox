#include"app/duktape/wrappers/buildutils/build.h"
#include<iostream>
extern char   __BUILD_DATE;
extern char   __BUILD_NUMBER;
extern char   __CJS_BUILD_DATE;
extern char   __CJS_BUILD_NUMBER;
namespace app::duktape::wrappers::buildutils{
	Build::Build(){
	}
	Build::~Build(){
	}
	int Build::getBuildNumber(){
		//return (unsigned long) &__BUILD_NUMBER;
		return (unsigned long) &__BUILD_NUMBER;

	}
	std::string Build::getBuildDate(){
		return std::to_string((unsigned long) &__BUILD_DATE);
	}
	int Build::getBuildNumberCjs(){
		//return (unsigned long) &__BUILD_NUMBER;
		return (unsigned long) &__CJS_BUILD_NUMBER;

	}
	std::string Build::getBuildDateCjs(){
		return std::to_string((unsigned long) &__CJS_BUILD_DATE);
	}

}
