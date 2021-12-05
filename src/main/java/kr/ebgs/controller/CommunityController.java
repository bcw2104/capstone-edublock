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

import kr.ebgs.dto.GameInfoDTO;
import kr.ebgs.dto.GameRecordDTO;
import kr.ebgs.dto.UserDTO;
import kr.ebgs.serviceImpl.GameService;
import kr.ebgs.util.GlobalValues;
import kr.ebgs.util.JsonTool;

@Controller
@RequestMapping("/community")
public class CommunityController {

	@Autowired
	private GameService gameService;

	@GetMapping("")
	public String game(Model model)throws Exception {
		model.addAttribute("page", GlobalValues.communityPage);
		model.addAttribute("pageTitle", GlobalValues.communityTitle);
		model.addAttribute("gameType", gameService.getGameTypeList());

		return "frame";
	}

	@GetMapping(value ="/maps" ,produces = "application/json; charset=utf8")
	@ResponseBody
	public String gameType(@RequestParam(name="gt",defaultValue = "0") String _type
							,@RequestParam(name = "query", required = false) String query
							,HttpSession session)throws Exception {

		int type = Integer.parseInt(_type);

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

		GameInfoDTO gameInfo = new GameInfoDTO();

		if(query != null)
			gameInfo.setMapName(query);

		gameInfo.setGameId(type);
		gameInfo.setFormal(1);

		return JsonTool.arrayToJson(gameService.getGameInfoList(gameInfo));
	}

	@GetMapping(value ="/coms" ,produces = "application/json; charset=utf8")
	@ResponseBody
	public String coms(@RequestParam(name = "query", required = false) String query)throws Exception {

		return "ss";
	}
}


