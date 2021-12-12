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

import kr.ebgs.annotation.Auth;
import kr.ebgs.annotation.Auth.Type;
import kr.ebgs.dto.CenterCommentDTO;
import kr.ebgs.dto.CenterPostDTO;
import kr.ebgs.dto.GameInfoDTO;
import kr.ebgs.dto.GameRecordDTO;
import kr.ebgs.dto.UserDTO;
import kr.ebgs.serviceImpl.CustomerCenterService;
import kr.ebgs.serviceImpl.GameService;
import kr.ebgs.util.GlobalValues;
import kr.ebgs.util.JsonTool;

@Controller
@RequestMapping("/community")
public class CommunityController {

	@Autowired
	private GameService gameService;
	@Autowired
	private CustomerCenterService centerService;

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
		gameInfo.setFormal(0);

		return JsonTool.arrayToJson(gameService.getGameInfoList(gameInfo));
	}

	@GetMapping(value ="/coms" ,produces = "application/json; charset=utf8")
	@ResponseBody
	public String coms(@RequestParam(name = "query", required = false) String query)throws Exception {

		if(query == null)
			query = "";

		ArrayList<CenterPostDTO> centerPostList = centerService.getCenterPostList(query,null,"com");

		return JsonTool.arrayToJson(centerPostList);
	}
	@SuppressWarnings("unchecked")
	@GetMapping("/com/{postId}")
	public String view(@PathVariable("postId") String _postId,Model model,HttpSession session)throws Exception {
		int postId = Integer.parseInt(_postId);

		CenterPostDTO centerPost = centerService.getCenterPostById(postId);

		if(centerPost == null)
			throw new NoHandlerFoundException(null, null, null);

		if(session.getAttribute("centerVisit") == null) {
			session.setAttribute("centerVisit", new ArrayList<Integer>());
		}
		ArrayList<Integer> visitList = (ArrayList<Integer>) session.getAttribute("centerVisit");
		if(centerService.isFirstVisit(visitList,postId)) {
			centerService.increasePostHits(postId);
			centerPost.setHits(centerPost.getHits()+1);
			visitList.add(postId);
		}

		model.addAttribute("centerPost", centerPost);
		model.addAttribute("page", GlobalValues.communityViewPage);
		model.addAttribute("pageTitle", GlobalValues.centerTitle);

		return "frame";
	}

	@Auth(type = Type.MEMBER)
	@GetMapping("/com/write")
	public String write(Model model)throws Exception {

		model.addAttribute("boardType", "com");
		model.addAttribute("page", GlobalValues.communityWritePage);
		model.addAttribute("pageTitle", GlobalValues.centerTitle);

		return "frame";
	}

	@Auth(type = Type.MEMBER)
	@GetMapping("/{postId}/edit")
	public String edit(@PathVariable("postId") String _postId, Model model,HttpSession session)throws Exception {

		int postId = Integer.parseInt(_postId);
		CenterPostDTO centerPost = centerService.getCenterPostById(postId);
		UserDTO loginUser = (UserDTO) session.getAttribute("user");

		if(!centerPost.getPostAuthor().equals(loginUser.getUserId())) {
			throw new RuntimeException();
		}

		model.addAttribute("centerPost", centerPost);
		model.addAttribute("page", GlobalValues.communityWritePage);
		model.addAttribute("pageTitle", GlobalValues.centerTitle);

		return "frame";
	}

	@Auth(type = Type.MEMBER)
	@PostMapping("/{postId}/modify.do")
	public String modify(@PathVariable("postId") String _postId,
						@RequestParam("postTitle") String postTitle,
						@RequestParam("postContent") String postContent,HttpSession session)throws Exception {

		int postId = Integer.parseInt(_postId);
		CenterPostDTO centerPost = centerService.getCenterPostById(postId);
		UserDTO loginUser = (UserDTO) session.getAttribute("user");

		if(centerPost == null)
			throw new NoHandlerFoundException(null, null, null);
		if(!centerPost.getPostAuthor().equals(loginUser.getUserId()))
			throw new RuntimeException();

		centerPost.setPostTitle(postTitle);
		centerPost.setPostContent(postContent);

		centerService.modifyCenterPost(centerPost);

		return "redirect:/community/"+centerPost.getBoardType()+"/"+postId;
	}

	@Auth(type = Type.MEMBER)
	@PostMapping("/{postId}/delete.do")
	@ResponseBody
	public String delete(@PathVariable("postId") String _postId,HttpSession session)throws Exception {

		int postId = Integer.parseInt(_postId);
		CenterPostDTO centerPost = centerService.getCenterPostById(postId);
		UserDTO loginUser = (UserDTO) session.getAttribute("user");

		if(centerPost == null)
			throw new NoHandlerFoundException(null, null, null);
		if(!loginUser.getUserType().equals(Auth.Type.ADMIN.name()) && !centerPost.getPostAuthor().equals(loginUser.getUserId()))
			throw new RuntimeException();

		centerService.deleteCenterPost(postId);

		return "success";
	}

	@Auth(type = Type.MEMBER)
	@PostMapping("/com/add.do")
	public String add(@RequestParam("postTitle") String postTitle,
						@RequestParam("postContent") String postContent,HttpSession session)throws Exception {

		String boardType = "com";
		UserDTO loginUser = (UserDTO) session.getAttribute("user");
		String postAuthor = loginUser.getUserId();

		CenterPostDTO centerPost = new CenterPostDTO();

		centerPost.setBoardType(boardType);
		centerPost.setPostAuthor(postAuthor);
		centerPost.setPostTitle(postTitle);
		centerPost.setPostContent(postContent);

		centerService.addCenterPost(centerPost);

		return "redirect:/community/";
	}

	@GetMapping(value="/{postId}/comment/list.do", produces="application/json;charset=utf8")
	@ResponseBody
	public String comment(@PathVariable("postId") String _postId) throws Exception {

		CenterCommentDTO centerComment = new CenterCommentDTO();

		centerComment.setPostId(Integer.parseInt(_postId));

		ArrayList<CenterCommentDTO> centerCommentList = centerService.getCenterCommentList(centerComment);
		return JsonTool.arrayToJson(centerCommentList);
	}

	@Auth(type = Type.MEMBER)
	@PostMapping("/{postId}/comment/add.do")
	@ResponseBody
	public String commentAdd(@PathVariable("postId") String _postId
						     ,CenterCommentDTO centerComment,HttpSession session) throws Exception {

		int postId = Integer.parseInt(_postId);
		UserDTO loginUser = (UserDTO) session.getAttribute("user");
		String postAuthor = loginUser.getUserId();

		centerComment.setPostId(postId);
		centerComment.setCommentAuthor(postAuthor);

		centerService.addCenterComment(centerComment);

		return "success";
	}

	@Auth(type = Type.MEMBER)
	@PostMapping("/comment/{commentId}/delete.do")
	@ResponseBody
	public String commentDelete(@PathVariable("commentId") String _commentId,HttpSession session) throws Exception {

		int commentId = Integer.parseInt(_commentId);

		centerService.deleteCenterComment(commentId);
		return "success";
	}
}


