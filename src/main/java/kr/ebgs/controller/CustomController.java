package kr.ebgs.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.NoHandlerFoundException;

import kr.ebgs.dto.GameTypeDTO;
import kr.ebgs.serviceImpl.GameService;
import kr.ebgs.util.GlobalValues;

@Controller
@RequestMapping("/custom")
public class CustomController {

	@Autowired
	private GameService gameService;

	@GetMapping("")
	public String game(Model model)throws Exception {
		model.addAttribute("page", GlobalValues.customPage);
		model.addAttribute("pageTitle", GlobalValues.customTitle);

		return "frame";
	}

	@GetMapping("/create")
	public String custom(Model model,HttpSession session)throws Exception {
		model.addAttribute("page", GlobalValues.createPage);
		model.addAttribute("pageTitle", GlobalValues.createTitle);
		model.addAttribute("gameType", gameService.getGameTypeList());

		return "frame";
	}

	@GetMapping("/create/{gameName}")
	public String custom(@PathVariable("gameName") String gameName
							,Model model,HttpSession session)throws Exception {

		GameTypeDTO gameType = new GameTypeDTO();
		gameType.setGameName(gameName);

		gameType = gameService.getGameType(gameType);

		if(gameType == null) throw new NoHandlerFoundException(null, null, null);

		model.addAttribute("page", "/WEB-INF/views/game/"+gameType.getGameName()+"/custom.jsp");
		model.addAttribute("pageTitle", GlobalValues.customTitle);
		model.addAttribute("gameType", gameType);

		return "frame";
	}
}
