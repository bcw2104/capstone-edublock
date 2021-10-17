package kr.ebgs.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ebgs.annotation.Auth;
import kr.ebgs.annotation.Auth.Type;
import kr.ebgs.dto.UserDTO;
import kr.ebgs.serviceImpl.LoginService;
import kr.ebgs.serviceImpl.UserService;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private LoginService loginService;

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@GetMapping("/isexist.do")
	@ResponseBody
	public String isExist(UserDTO user) throws Exception {
		user = userService.getUser(user);

		if(user != null) {
			return "true";
		}
		else {
			return "false";
		}
	}

	@PostMapping("/login.do")
	@ResponseBody
	public String login(@RequestParam("userId") String userId,
						@RequestParam("userPw") String userPw, HttpServletRequest request) throws Exception {
		UserDTO user = new UserDTO();
		user.setUserId(userId);
		user = userService.getUser(user);

		if(user != null && loginService.checkUserPassword(userPw, user.getUserPw(), user.getSalt())) {
			if(user.getUserType().equals("USER")) {

				return user.getUserEmail();
			}

			HttpSession session = request.getSession();
			session.setAttribute("user", user);
			session.setMaxInactiveInterval(1800);


			return "success";
		}

		return "fail";
	}

	@Auth(type = Type.MEMBER)
	@GetMapping("/logout.do")
	public String logout(HttpServletRequest request) {
		HttpSession session = request.getSession();

		session.invalidate();

		return "redirect:/";
	}

	@PostMapping("/signup.do")
	public String signUp(UserDTO user, Model model) throws Exception {
		userService.addUser(user);

		model.addAttribute("userEmail",user.getUserEmail());
		return "forward:/user/send.do";
	}

	@PostMapping("/send.do")
	@ResponseBody
	public String send(@RequestParam("userEmail") String userEmail) throws Exception {
		String confirmKey = userService.createConfirmKey(userEmail, System.currentTimeMillis());
		userService.changeConfirmKey(userEmail, confirmKey);
		userService.sendConfirmMail(userEmail,confirmKey);

		return "success";
	}

	@GetMapping(value = "/confirm", produces = "text/html; charset=utf8")
	@ResponseBody
	public String confirm(@RequestParam(name = "key",required = false) String confirmKey) throws Exception {
		boolean unexpire = userService.confirmUser(confirmKey);
		String msg;

		if(unexpire) msg = "인증이 완료되었습니다.";
		else msg = "만료된 페이지입니다.";

		return "<script>alert('"+msg+"'); location.href='/';</script>";
	}

	@Auth
	@GetMapping("/mypage")
	public String mypage(Model model) {


		return "mypage";
	}



}
