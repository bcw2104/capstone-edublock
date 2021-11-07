package kr.ebgs.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.ebgs.dto.RankDTO;
import kr.ebgs.dto.UserDTO;
import kr.ebgs.serviceImpl.GameService;
import kr.ebgs.util.GlobalValues;
import kr.ebgs.util.JsonTool;

@Controller
@RequestMapping("/game")
public class GameController {

	@Autowired
	private GameService gameService;

	@GetMapping("/rank")
	public String rank(Model model){
		model.addAttribute("page", GlobalValues.rankPage);
		model.addAttribute("pageTitle", GlobalValues.rankTitle);
		model.addAttribute("gameType", gameService.getGameType());

		return "frame";
	}

	@GetMapping(value = "/myrank.do",produces = "application/json; charset=utf8")
	@ResponseBody
	public String myrank(@RequestParam("t") int type,HttpSession session)throws Exception {
		if(session.getAttribute("user") != null) {
			UserDTO loginUser = (UserDTO) session.getAttribute("user");
			RankDTO rank = gameService.getUserRank(loginUser.getUserId(),type);

			return JsonTool.objectToJson(rank);
		}
		else {
			return JsonTool.objectToJson(new RankDTO());
		}
	}

	@GetMapping(value = "/ranklist.do",produces = "application/json; charset=utf8")
	@ResponseBody
	public String list(@RequestParam("t") int type)throws Exception {
		ArrayList<RankDTO> rankList = gameService.getRankList(type);

		return JsonTool.arrayToJson(rankList);
	}
}
