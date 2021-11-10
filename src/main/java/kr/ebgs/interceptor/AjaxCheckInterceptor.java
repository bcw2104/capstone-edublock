package kr.ebgs.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import kr.ebgs.annotation.Ajax;

public class AjaxCheckInterceptor implements HandlerInterceptor {
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		if( handler instanceof HandlerMethod == false ) return true;

		HandlerMethod handlerMethod = (HandlerMethod) handler;

		Ajax ajax = handlerMethod.getMethodAnnotation(Ajax.class);

		if(ajax != null) {
			String requestedWithHeader = request.getHeader("X-Requested-With");
			if(requestedWithHeader != null && requestedWithHeader.equals("XMLHttpRequest")) return true;

			response.sendError(401);
			return false;
		}

		return true;
	}
}
