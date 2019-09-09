CXX=g++
CC=gcc
BUILDDIR=bin
SOURCEDIR=./src
SOURCES:=$(shell find $(SOURCEDIR) -name "*.cpp" -o -name "*.c" )
MACHINE=$(shell $(CXX) -dumpmachine)
ifneq (,$(findstring mingw,$(MACHINE)))
	BINEXT=exe
else
	BINEXT=out
endif
OBJECTS=$(addprefix $(BUILDDIR)/,$(patsubst %.c,%.o ,$(patsubst %.cpp,%.o,$(SOURCES))))
CXXFLAGS=\
	-I./include\
	-I./include/duktape\
	-I./include/duktape/extras/console\
	-I./include/duktape/extras/print-alert\
	-I./include/duktape/extras/module-duktape\
	-I./include/mongoose-cpp\
	-I./include/mongoose\
	-I./include/jsoncpp\
	-I./include/lua\
	-I./include/sqlite3\
	-I./include/cpr\
	-DNO_WEBSOCKET
CFLAGS=$(CXXFLAGS)
LDFLAGS=\
	-lcurl

ifneq (,$(findstring mingw,$(MACHINE)))
LDFLAGS+=\
	-ldl\
	-lws2_32\
	-lstdc++
else
LDFLAGS+=\
	-lpthread\
	-lc\
	-ldl
endif

BIN=./bin/a.$(BINEXT)
all: $(BIN)
$(BIN): $(OBJECTS)
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	$(CXX)\
		$(CXXFLAGS)\
		$(OBJECTS)\
		$(LDFLAGS)\
		-o $(BIN)
$(BUILDDIR)/%.o: %.cpp
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	$(CXX)\
		$(CXXFLAGS)\
		-I$(HEADERDIR)\
		-I$(dir $<)\
		-c $<\
		-o $@
$(BUILDDIR)/%.o: %.c
	@printf "generating $@...\n"
	@mkdir -p $(@D)
	$(CC)\
		$(CFLAGS)\
		-I$(HEADERDIR)\
		-I$(dir $<)\
		-c $<\
		-o $@

.phony:\
	run\
	clean
run: $(BIN)
	$(BIN)
clean:
	rm -r $(BIN) ./bin/src
