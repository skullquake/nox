/*
 * utility class for making requests
 */

#ifndef APP_DUKTAPE_WRAPPERS_CPR_REQ_H
#define APP_DUKTAPE_WRAPPERS_CPR_REQ_H
#include<string>
#include<map>
namespace app::duktape::wrappers::cpr{
	class Req{
		public:
			Req();
			~Req();

			void setRequestHeaders(std::map<std::string,std::string>);
			std::map<std::string,std::string> getRequestHeaders();
			void setRequestUrl(std::string);
			std::string getRequestUrl();
			void setRequestParameters(std::map<std::string,std::string>);
			std::map<std::string,std::string> getRequestParameters();
			void setRequestMethod(std::string);
			std::string getRequestMethod();
			void setRequestCookie(std::map<std::string,std::string>);
			std::map<std::string,std::string> getRequestCookie();
			void setRequestTimeout(int);
			int getRequestTimeout();
			bool execRequest();

			std::map<std::string,std::string> getResponseHeaders();
			std::string getResponseBody();
			std::string getResponseCookie();
			int getResponseError();
			int getResponseStatusCode();
			double getResponseElapsed();
		private:
			std::map<std::string,std::string> m_reqhdr;
			std::string m_requrl;
			std::string  m_reqm;
			std::map<std::string,std::string> m_reqp;
			std::map<std::string,std::string> m_reqck;
			std::map<std::string,std::string> m_reshdr;
			std::string m_resck;
			std::string m_resb;
			int  m_resstatus;
			int  m_reserror;
			double m_resel;
			int  m_reqt;
	};
}
#endif
