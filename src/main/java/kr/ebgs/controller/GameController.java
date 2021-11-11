package kr.ebgs.controller;

import java.util.ArrayList;

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

import kr.ebgs.annotation.Ajax;
import kr.ebgs.dto.GameInfoDTO;
import kr.ebgs.dto.GameRecordDTO;
import kr.ebgs.dto.GameTypeDTO;
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

	@GetMapping("")
	public String game(Model model)throws Exception {
		model.addAttribute("page", GlobalValues.categoryPage);
		model.addAttribute("pageTitle", GlobalValues.categoryTitle);
		model.addAttribute("gameType", gameService.getGameTypeList());

		return "frame";
	}

	@GetMapping("/rank")
	public String rank(Model model){
		model.addAttribute("page", GlobalValues.rankPage);
		model.addAttribute("pageTitle", GlobalValues.rankTitle);
		model.addAttribute("gameType", gameService.getGameTypeList());

		return "frame";
	}

	@GetMapping(value = "/myrank.do",produces = "application/json; charset=utf8")
	@ResponseBody
	public String myRank(@RequestParam("t") int type,HttpSession session)throws Exception {
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

	@GetMapping("/{gameName}")
	public String gameType(@PathVariable("gameName") String gameName,Model model,HttpSession session)throws Exception {
		StringBuffer clearList = new StringBuffer("_");

		if(session.getAttribute("user") != null) {
			UserDTO loginUser = (UserDTO) session.getAttribute("user");

			GameRecordDTO recordDTO = new GameRecordDTO();
			recordDTO.setUserId(loginUser.getUserId());

			ArrayList<GameRecordDTO> recordList = gameService.getGameRecordList(recordDTO);

			for(GameRecordDTO e : recordList) {
				clearList.append(e.getMapId()+"_");
			}
		}
		else if(session.getAttribute("clear") != null) {
			clearList = (StringBuffer) session.getAttribute("clear");
		}

		GameTypeDTO gameType = new GameTypeDTO();
		gameType.setGameName(gameName);

		gameType = gameService.getGameType(gameType);

		if(gameType == null) throw new NoHandlerFoundException(null, null, null);

		GameInfoDTO gameInfo = new GameInfoDTO();
		gameInfo.setGameId(gameType.getGameId());

		model.addAttribute("page", GlobalValues.rankPage);
		model.addAttribute("pageTitle", GlobalValues.rankTitle);
		model.addAttribute("gameType", gameType);
		model.addAttribute("mapList", gameService.getGameInfoList(gameInfo));
		model.addAttribute("clearList", clearList);
		return "frame";
	}

	@GetMapping("/{gameName}/{mapId}")
	public String gamePlay(@PathVariable("gameName") String gameName
							,@PathVariable("mapId") int mapId
							,Model model,HttpSession session)throws Exception {

		boolean clear = false;
		if(session.getAttribute("user") != null) {
			UserDTO loginUser = (UserDTO) session.getAttribute("user");
			if(gameService.getGameRecordByPK(loginUser.getUserId(), mapId) != null) {
				clear = true;
			}
		}
		else if(session.getAttribute("clear") != null) {
			StringBuffer clearList = (StringBuffer) session.getAttribute("clear");
			if(!clearList.toString().contains(Integer.toString(mapId)+"_")) {
				clear = true;
			}
		}

		GameInfoDTO gameInfo = new GameInfoDTO();
		GameTypeDTO gameType = new GameTypeDTO();
		gameType.setGameName(gameName);

		gameType = gameService.getGameType(gameType);
		gameInfo = gameService.getGameInfoById(mapId);

		if(gameType == null || gameInfo == null) throw new NoHandlerFoundException(null, null, null);

		model.addAttribute("page", GlobalValues.rankPage);
		model.addAttribute("pageTitle", GlobalValues.rankTitle);
		model.addAttribute("gameType", gameType);
		model.addAttribute("gameInfo",gameInfo);
		model.addAttribute("clear",clear);
		return "frame";
	}

	@GetMapping(value = "/game.do",produces = "application/json; charset=utf8")
	@ResponseBody
	public String gameInfo(@RequestParam("id") int id)throws Exception {
		GameInfoDTO gameInfo = gameService.getGameInfoById(id);

		return JsonTool.objectToJson(gameInfo);
	}

	@Ajax
	@PostMapping("/clear.do")
	public void clear(@RequestParam("mid") int mapId,HttpSession session)throws Exception {
		if(session.getAttribute("user") != null) {
			UserDTO loginUser = (UserDTO) session.getAttribute("user");
			if(gameService.getGameRecordByPK(loginUser.getUserId(), mapId) == null) {
				gameService.addGameClearRecord(loginUser.getUserId(), mapId);
			}
		}
		else {
			if(session.getAttribute("clear") == null) {
				session.setAttribute("clear", new StringBuffer("_"));
			}
			StringBuffer clearList = (StringBuffer) session.getAttribute("clear");
			if(!clearList.toString().contains(Integer.toString(mapId))) {
				clearList.append(Integer.toString(mapId)+"_");
			}
		}
	}
}
