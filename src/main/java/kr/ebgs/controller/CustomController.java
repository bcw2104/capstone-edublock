package kr.ebgs.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.NoHandlerFoundException;

import kr.ebgs.annotation.Auth;
import kr.ebgs.annotation.Auth.Type;
import kr.ebgs.dto.GameInfoDTO;
import kr.ebgs.dto.GameTypeDTO;
import kr.ebgs.dto.RankDTO;
import kr.ebgs.dto.UserDTO;
import kr.ebgs.serviceImpl.GameService;
import kr.ebgs.util.GlobalValues;
import kr.ebgs.util.JsonTool;

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

	@Auth(type = Type.MEMBER)
	@GetMapping("/create")
	public String custom(Model model,HttpSession session)throws Exception {
		model.addAttribute("page", GlobalValues.createPage);
		model.addAttribute("pageTitle", GlobalValues.createTitle);
		model.addAttribute("gameType", gameService.getGameTypeList());

		return "frame";
	}

	@Auth(type = Type.MEMBER)
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

	@Auth(type = Type.MEMBER)
	@PostMapping("/create/save.do")
	@ResponseBody
	public String save(GameInfoDTO gameInfo ,Model model,HttpSession session)throws Exception {
		UserDTO loginUser = (UserDTO) session.getAttribute("user");

		gameInfo.setAuthorId(loginUser.getUserId());
		gameInfo.setFormal(1);
		gameService.addGameContent(gameInfo);

		return "success";
	}
}
