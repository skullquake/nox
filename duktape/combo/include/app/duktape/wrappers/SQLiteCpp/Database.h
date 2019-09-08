#ifndef APP_DUKTAPE_WRAPPERS_SQLITECPP_DATABASE_H
#define APP_DUKTAPE_WRAPPERS_SQLITECPP_DATABASE_H
#include"SQLiteCpp/SQLiteCpp.h"
#include"SQLiteCpp/VariadicBind.h"
#include<vector>
#include<map>
#include<string>
namespace app::duktape::wrappers::SQLiteCpp{
	class Database:public ::SQLite::Database{
		public:
			Database(const char*);
			std::vector<std::vector<std::string>> _execAndGet(std::string);
			void _exec(const char*);
			const char* getName();
			bool _tableExists(std::string);
		private:
			std::string name_;
	};
}
#endif
