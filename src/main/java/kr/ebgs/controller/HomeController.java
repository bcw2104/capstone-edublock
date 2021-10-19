package kr.ebgs.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import kr.ebgs.util.GlobalValues;

@Controller
public class HomeController {

	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);

	@GetMapping("/")
	public String home(HttpServletRequest request, Model model) {
		model.addAttribute("page", GlobalValues.homePage);
		model.addAttribute("pageTitle", GlobalValues.homeTitle);
		return "frame";
	}

}
