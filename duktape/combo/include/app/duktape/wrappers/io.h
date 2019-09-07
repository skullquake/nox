#ifndef APP_DUKTAPE_WRAPPERS_IO_H
#define APP_DUKTAPE_WRAPPERS_IO_H
#include"duktape/duktape.h"
namespace app::duktape::wrappers{
	void push_file_as_string(duk_context*,const char*);
	duk_ret_t fileio_read_file(duk_context*);
	duk_ret_t fileio_write_file(duk_context*);
}
#endif
