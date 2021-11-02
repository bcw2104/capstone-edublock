package kr.ebgs.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ebgs.util.GlobalValues;

@Controller
@RequestMapping("/game")
public class GameController {

	@GetMapping("/rank")
	public String rank(HttpServletRequest request,Model model)throws Exception {

		model.addAttribute("page", GlobalValues.rankPage);
		model.addAttribute("pageTitle", GlobalValues.rankTitle);

		return "frame";
	}
}
