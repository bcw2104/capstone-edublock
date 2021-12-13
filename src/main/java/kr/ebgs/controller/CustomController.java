package kr.ebgs.controller;

import java.io.File;
import java.util.UUID;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.NoHandlerFoundException;

import kr.ebgs.annotation.Auth;
import kr.ebgs.annotation.Auth.Type;
import kr.ebgs.dto.GameInfoDTO;
import kr.ebgs.dto.GameTypeDTO;
import kr.ebgs.dto.UserDTO;
import kr.ebgs.serviceImpl.FileService;
import kr.ebgs.serviceImpl.GameService;
import kr.ebgs.util.GlobalValues;

@Controller
@RequestMapping("/custom")
public class CustomController {

	@Autowired
	private FileService fileService;
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
	public String save(GameInfoDTO gameInfo ,MultipartHttpServletRequest filelist, Model model,HttpSession session)throws Exception {
		UserDTO loginUser = (UserDTO) session.getAttribute("user");
		MultipartFile mfile = filelist.getFile("thumbnailData");

		String uuid = UUID.randomUUID().toString();
		String fileName = uuid+".png";
		String dirPath = fileService.getThumbnailPath();

		ServletContext context= session.getServletContext();
		String realPath=context.getRealPath(dirPath);

		String path = realPath+File.separator+fileName;

		fileService.uploadFile(path, mfile);

		gameInfo.setThumbnail(fileName);
		gameInfo.setAuthorId(loginUser.getUserId());
		if(loginUser.getUserType().equals(Auth.Type.ADMIN.name()))
			gameInfo.setFormal(1);
		else
			gameInfo.setFormal(0);

		gameService.addGameContent(gameInfo);

		return "success";
	}
}
