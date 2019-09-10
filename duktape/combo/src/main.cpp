//#include<windows.h>
#include<unistd.h>
#include<signal.h>
#include"mongoose-cpp/Server.h"
#include"mongoose-cpp/WebController.h"
#include"app/controllers/MyController.h"
int main(int argc,char** argv){
	app::controllers::MyController myController;
	Mongoose::Server server(8080);
	server.registerController(&myController);
	server.setOption("enable_directory_listing","yes");
	server.setOption("document_root","./pub");
	server.start(); 
	while(1){
		//Sleep(10000);
		//sleep(10000);
		sleep(1);
		//std::cout<<"main():wait..."<<std::endl;
		if(!server.isRunning())break;
	}
}
