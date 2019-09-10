#todo: filter list and cflags...
JSONCPP=OFF
YAML=OFF
CPR=ON
BUILD_NUMBER_FILE=build-number.txt
FILTER_OUT = $(foreach v,$(2),$(if $(findstring $(1),$(v)),,$(v)))
CXX=g++
CC=gcc
BUILDDIR=bin
SOURCEDIR=./src
MACHINE=$(shell $(CXX) -dumpmachine)
ifneq (,$(findstring mingw,$(MACHINE)))
	BINEXT=exe
else
	BINEXT=out
endif
#todo: filter list and cflags...
ifeq ($(JSONCPP),ON)
	SOURCES=$(shell find $(SOURCEDIR) -name "*.cpp" -o -name "*.c" )
else
	SOURCES=$(call FILTER_OUT,jsoncpp,$(shell find $(SOURCEDIR) -name "*.cpp" -o -name "*.c" ))
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
	-I./include/lua\
	-I./include/sqlite3\
	-I./include/cpr\
	-DNO_WEBSOCKET\
	-fpermissive
#todo: filter list and cflags...
ifeq ($(JSONCPP),ON)
	CXXFLAGS+=\
		-I./include/jsoncpp
else
	CXXFLAGS+=\
		-DNO_JSONCPP
endif
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
# Create an auto-incrementing build number.
BUILD_NUMBER_LDFLAGS  = -Xlinker --defsym -Xlinker __BUILD_DATE=$$(date +'%Y%m%d')
BUILD_NUMBER_LDFLAGS += -Xlinker --defsym -Xlinker __BUILD_NUMBER=$$(cat $(BUILD_NUMBER_FILE))
# Build number file.  Increment if any object file changes.
$(BUILD_NUMBER_FILE): $(OBJECTS)
	@if ! test -f $(BUILD_NUMBER_FILE); then echo 0 > $(BUILD_NUMBER_FILE); fi
	@echo $$(($$(cat $(BUILD_NUMBER_FILE)) + 1)) > $(BUILD_NUMBER_FILE)
all: $(BIN)
$(BIN): $(OBJECTS) $(BUILD_NUMBER_FILE)
	@mkdir -p $(@D)
	@printf "generating $@...\n"
	$(CXX)\
		$(CXXFLAGS)\
		$(OBJECTS)\
		$(LDFLAGS)\
		$(BUILD_NUMBER_LDFLAGS)\
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
	clean\
	test
run: $(BIN)
	$(BIN)
clean:
	rm -r $(BIN) ./bin/src
test:
	@echo $(OBJECTS)
