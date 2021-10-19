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
import kr.ebgs.dto.UserDTO;

public class AuthCheckInterceptor implements HandlerInterceptor {
	private static final Logger logger = LoggerFactory.getLogger(AuthCheckInterceptor.class);

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {

		if( handler instanceof HandlerMethod == false ) return true;

		HandlerMethod handlerMethod = (HandlerMethod) handler;

		logger.info("handler method : " + handlerMethod.getMethod().getName());

		Auth auth = handlerMethod.getMethodAnnotation(Auth.class);

		// 권한이 필요없는 경우
		if(auth == null) return true;

		HttpSession session = request.getSession();

		if(session.getAttribute("user") == null ) {
			response.sendError(401);
			return false;
		}

		UserDTO user = (UserDTO) session.getAttribute("user");

		// 관리자 권한이 필요한 경우
		if(auth.type().compareTo(Type.ADMIN) == 0) {

			if(user.getUserType().equals(Auth.Type.ADMIN.name())) return true;

			response.sendError(401);
			return false;
		}

		// 회원 권한이 필요한 경우
		if(auth.type().compareTo(Type.MEMBER) == 0) {
			if(user.getUserType().equals(Auth.Type.MEMBER.name()) || user.getUserType().equals(Auth.Type.ADMIN.name())) return true;

			response.sendError(401);
			return false;
		}


		return true;
	}
}
