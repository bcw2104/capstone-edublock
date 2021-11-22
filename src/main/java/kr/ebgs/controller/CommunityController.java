package kr.ebgs.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.ebgs.serviceImpl.GameService;
import kr.ebgs.util.GlobalValues;

@Controller
@RequestMapping("/community")
public class CommunityController {

	@Autowired
	private GameService gameService;

	@GetMapping("")
	public String game(Model model)throws Exception {
		model.addAttribute("page", GlobalValues.communityPage);
		model.addAttribute("pageTitle", GlobalValues.communityTitle);

		return "frame";
	}
}
