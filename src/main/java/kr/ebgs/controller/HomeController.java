package kr.ebgs.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ebgs.dto.UserDTO;
import kr.ebgs.serviceImpl.LoginService;
import kr.ebgs.serviceImpl.UserService;

@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	@Autowired
	private UserService userService;
	@Autowired
	private LoginService loginService;

	@GetMapping("/")
	public String home(Model model) {
		return "home";
	}

	@GetMapping("/login")
	public String login(Model model) throws Exception {
		return "login";
	}

	@PostMapping("/login.do")
	@ResponseBody
	public String login(@RequestParam("id") String id,
						@RequestParam("pw") String pw, HttpServletRequest request) throws Exception {

		UserDTO user = userService.getUserById(id);

		if(user != null && loginService.checkUserPassword(pw, user.getUserPw(), user.getSalt())) {
			HttpSession session = request.getSession();
			session.setAttribute("user", user);
			session.setMaxInactiveInterval(1800);

			return "success";
		}

		return "fail";
	}

	@GetMapping("/logout.do")
	public String logout(HttpServletRequest request) {
		HttpSession session = request.getSession();

		session.invalidate();

		return "home";
	}

}
