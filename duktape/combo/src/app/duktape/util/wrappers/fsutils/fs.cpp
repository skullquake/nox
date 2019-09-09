#include"app/duktape/wrappers/fsutils/fs.h"
#include<iostream>
namespace app::duktape::wrappers::fsutils{
	Fs::Fs(){
		std::cout<<"app::duktape::utils::wrappers::fsutils::Fs()"<<std::endl;
	}
	Fs::~Fs(){
		std::cout<<"app::duktape::utils::wrappers::fsutils::~Fs()"<<std::endl;
	}
	void Fs::test(){
		std::cout<<"app::duktape::utils::wrappers::fsutils::test()"<<std::endl;
	}
}
