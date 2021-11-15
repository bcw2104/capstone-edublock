package kr.ebgs.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import kr.ebgs.serviceImpl.GameService;
import kr.ebgs.util.GlobalValues;

@Controller
public class HomeController {
	@Autowired
	private GameService gameService;

	@GetMapping("/")
	public String home(HttpServletRequest request, Model model) {
		model.addAttribute("page", GlobalValues.homePage);
		model.addAttribute("pageTitle", GlobalValues.homeTitle);

		model.addAttribute("hotMapList", gameService.getHotGameInfoList());
		model.addAttribute("newMapList", gameService.getNewGameInfoList());
		return "frame";
	}

}
