#include"app/duktape/wrappers/io.h"
namespace app::duktape::wrappers{
	void push_file_as_string(duk_context *ctx, const char *filename) {
		FILE *f;
		size_t len;
		char buf[16384];
		f=fopen(filename,"rb");
		if(f){
			len=fread((void*)buf,1,sizeof(buf),f);
			fclose(f);
			duk_push_lstring(ctx,(const char*)buf,(duk_size_t)len);
		}else{
			duk_push_undefined(ctx);
		}
	}
	duk_ret_t fileio_read_file(duk_context *ctx) {
		const char *fn;
		char *buf;
		size_t len;
		size_t off;
		int rc;
		FILE *f;

		fn = duk_require_string(ctx, 0);
		f = fopen(fn, "rb");
		if (!f) {
			(void) duk_type_error(ctx, "cannot open file %s for reading, errno %ld: %s",
					      fn, (long) errno, strerror(errno));
		}

		rc = fseek(f, 0, SEEK_END);
		if (rc < 0) {
			(void) fclose(f);
			(void) duk_type_error(ctx, "fseek() failed for %s, errno %ld: %s",
					      fn, (long) errno, strerror(errno));
		}
		len = (size_t) ftell(f);
		rc = fseek(f, 0, SEEK_SET);
		if (rc < 0) {
			(void) fclose(f);
			(void) duk_type_error(ctx, "fseek() failed for %s, errno %ld: %s",
					      fn, (long) errno, strerror(errno));
		}

		buf = (char *) duk_push_fixed_buffer(ctx, (duk_size_t) len);
		for (off = 0; off < len;) {
			size_t got;
			got = fread((void *) (buf + off), 1, len - off, f);
			if (ferror(f)) {
				(void) fclose(f);
				(void) duk_type_error(ctx, "error while reading %s", fn);
			}
			if (got == 0) {
				if (feof(f)) {
					break;
				} else {
					(void) fclose(f);
					(void) duk_type_error(ctx, "error while reading %s", fn);
				}
			}
			off += got;
		}

		if (f) {
			(void) fclose(f);
		}

		return 1;
	}
	duk_ret_t fileio_write_file(duk_context *ctx) {
		const char *fn;
		const char *buf;
		size_t len;
		size_t off;
		FILE *f;

		fn = duk_require_string(ctx, 0);
		f = fopen(fn, "wb");
		if (!f) {
			(void) duk_type_error(ctx, "cannot open file %s for writing, errno %ld: %s",
				  fn, (long) errno, strerror(errno));
		}

		len = 0;
		buf = (char *) duk_to_buffer(ctx, 1, &len);
		for (off = 0; off < len;) {
			size_t got;
			got = fwrite((const void *) (buf + off), 1, len - off, f);
			if (ferror(f)) {
				(void) fclose(f);
				(void) duk_type_error(ctx, "error while writing %s", fn);
			}
			if (got == 0) {
				(void) fclose(f);
				(void) duk_type_error(ctx, "error while writing %s", fn);
			}
			off += got;
		}

		if (f) {
			(void) fclose(f);
		}

		return 0;
	}
}
