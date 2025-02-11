package kr.ebgs.controller;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.NoHandlerFoundException;

import kr.ebgs.annotation.Auth;
import kr.ebgs.annotation.Auth.Type;
import kr.ebgs.dto.UserDTO;
import kr.ebgs.serviceImpl.FileService;
import kr.ebgs.serviceImpl.LoginService;
import kr.ebgs.serviceImpl.UserService;
import kr.ebgs.util.GlobalValues;

@Controller
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private LoginService loginService;
	@Autowired
	private FileService fileService;

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

	@Auth(type = Type.MEMBER)
	@PostMapping("/check.do")
	@ResponseBody
	public String check(@RequestParam("userPw") String userPw,HttpSession session) throws Exception {
		UserDTO user = (UserDTO) session.getAttribute("user");

		if(loginService.checkUserPassword(userPw, user.getUserPw(), user.getSalt())) {
			return "success";
		}

		return "fail";
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
			session.removeAttribute("clear");
			session.setMaxInactiveInterval(1800);


			return "success";
		}

		return "fail";
	}

	@Auth(type = Type.MEMBER)
	@GetMapping("/logout.do")
	public String logout(HttpServletRequest request) {
		HttpSession session = request.getSession();

		session.removeAttribute("user");

		return "redirect:/";
	}

	@PostMapping("/signup.do")
	public String signUp(UserDTO user, Model model) throws Exception {
		if(user.getUserPw() == null) throw new Exception();

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

	@PostMapping("/find.do")
	@ResponseBody
	public String find(@RequestParam("userId") String userId) throws Exception {
		UserDTO user = new UserDTO();
		user.setUserId(userId);

		user = userService.getUser(user);

		if(user == null) return "fail";

		String confirmKey = userService.createConfirmKey(user.getUserEmail(), System.currentTimeMillis());
		userService.changeConfirmKey(user.getUserEmail(), confirmKey);
		userService.sendFindMail(user.getUserEmail(),confirmKey);

		return "success";
	}

	@GetMapping("/find")
	public String find(@RequestParam(name = "key",required = false) String confirmKey,Model model,HttpSession session) throws Exception {
		UserDTO user = userService.confirmAndGetUser(confirmKey);

		if(user != null) {
			model.addAttribute("page", GlobalValues.changePasswordPage);
			model.addAttribute("pageTitle", GlobalValues.changePasswordTitle);
			session.setAttribute("find", user.getUserId());

			return "frame";
		}

		throw new NoHandlerFoundException(null, null, null);
	}

	@PostMapping(value = "/find/change.do", produces = "text/html; charset=utf8")
	@ResponseBody
	public String find(@RequestParam("query") String query,HttpSession session) throws Exception {
		if(session.getAttribute("find") == null) throw new RuntimeException();

		String userId = session.getAttribute("find").toString();
		session.removeAttribute("find");

		UserDTO user = new UserDTO();

		user.setUserId(userId);
		user.setUserPw(query);

		userService.modifyUser(user);

		return "success";
	}

	@GetMapping(value = "/confirm", produces = "text/html; charset=utf8")
	@ResponseBody
	public String confirm(@RequestParam(name = "key",required = false) String confirmKey) throws Exception {
		UserDTO user = userService.confirmAndGetUser(confirmKey);
		String msg;

		if(user != null) {
			msg = "인증이 완료되었습니다.";
			userService.promoteUser(user.getUserId());
		}
		else msg = "만료된 페이지입니다.";

		return "<script>alert('"+msg+"'); location.href='/';</script>";
	}

	@Auth(type = Type.MEMBER)
	@GetMapping("/mypage")
	public String mypage(Model model) {
		model.addAttribute("page", GlobalValues.myPage);
		model.addAttribute("pageTitle", GlobalValues.myPageTitle);

		return "frame";
	}

	@Auth(type = Type.MEMBER)
	@PostMapping("/modify.do")
	@ResponseBody
	public String modify(UserDTO user,HttpSession session) throws Exception {
		UserDTO loginUser = (UserDTO) session.getAttribute("user");

		String userId = loginUser.getUserId();
		user.setUserId(userId);
		userService.modifyUser(user);

		user = new UserDTO();
		user.setUserId(userId);
		user = userService.getUser(user);

		session.setAttribute("user", user);

		return "success";
	}

	@Auth(type = Type.MEMBER)
	@PostMapping("/delete.do")
	@ResponseBody
	public String delete(@RequestParam("userPw") String userPw,HttpSession session) throws Exception {
		UserDTO user = (UserDTO) session.getAttribute("user");

		if(loginService.checkUserPassword(userPw, user.getUserPw(), user.getSalt())) {
			String userId = user.getUserId();
			userService.deleteUser(userId);

			String dirPath = fileService.getIdPath(userId);
			ServletContext context= session.getServletContext();
			String realPath=context.getRealPath(dirPath);

			fileService.removePath(realPath);

			session.invalidate();

			return "success";
		}

		return "fail";
	}
}
