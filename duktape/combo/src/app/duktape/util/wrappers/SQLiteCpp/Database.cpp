#include"app/duktape/wrappers/SQLiteCpp/Database.h"
#include<iostream>
#include<sstream>
namespace app::duktape::wrappers::SQLiteCpp{
	Database::Database(const char* c)
	: ::SQLite::Database(c,::SQLite::OPEN_READWRITE|::SQLite::OPEN_CREATE)
	{
		//std::cout<<"app::duktape::wrappers::SQLiteCpp::Database()"<<std::endl;
		this->name_=std::string(c);
	}
	Database::~Database()
	{
		//std::cout<<"app::duktape::wrappers::SQLiteCpp::~Database()"<<std::endl;
	}
	std::vector<std::vector<std::string>> Database::_execAndGet(std::string a,bool printhdr=false){
		std::vector<std::vector<std::string>> ret;
		::SQLite::Statement query(*this,a);
		int rownum=0;
		while(query.executeStep()){
			if(printhdr){
				if(rownum==0){
					std::vector<std::string> hdr;
					for(int i=0;i<query.getColumnCount();i++){
						hdr.push_back(query.getColumn(i).getName());
					}
					ret.push_back(hdr);
				}
				rownum++;
			}
			std::vector<std::string> row;
			for(int i=0;i<query.getColumnCount();i++){
				row.push_back(query.getColumn(i).getString());
			}
			ret.push_back(row);
		}
		return ret;
	}
	void Database::_exec(const char* a){
		try{
			this->exec(a);
		}catch(std::exception e){
			std::cerr<<e.what()<<std::endl;
		}
	}
	const char* Database::getName(){
		return this->name_.c_str();
	}
	bool Database::_tableExists(std::string a){
		return ::SQLite::Database::tableExists(a);
	}
}
