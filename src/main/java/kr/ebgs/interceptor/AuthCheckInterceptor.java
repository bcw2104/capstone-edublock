package kr.ebgs.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import kr.ebgs.annotation.Auth;
import kr.ebgs.annotation.Auth.Type;
import kr.ebgs.controller.HomeController;
import kr.ebgs.dto.UserDTO;

public class AuthCheckInterceptor implements HandlerInterceptor {
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	@SuppressWarnings("unlikely-arg-type")
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		logger.info("AuthCheckInterceptor");
		if( handler instanceof HandlerMethod == false ) return true;

		HandlerMethod handlerMethod = (HandlerMethod) handler;

		Auth auth = handlerMethod.getMethodAnnotation(Auth.class);

		if(auth == null) return true;

		HttpSession session = request.getSession();

		if(session == null) {
			response.sendRedirect("�α��� page");
			return false;
		}

		UserDTO user = (UserDTO) session.getAttribute("user");

		if(user == null) {
			response.sendRedirect("�α��� page");
			return false;
		}

		//������ üũ
		if(auth.type().compareTo(Type.ADMIN) == 0) {
			return user.getUserType().equals(Auth.Type.ADMIN);
		}

		return true;
	}
}
