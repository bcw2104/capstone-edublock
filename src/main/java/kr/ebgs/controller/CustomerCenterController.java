package kr.ebgs.controller;

import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
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
import kr.ebgs.dto.UserDTO;
import kr.ebgs.serviceImpl.CustomerCenterService;
import kr.ebgs.serviceImpl.JsonTool;
import kr.ebgs.util.GlobalValues;

@Controller
@RequestMapping("/customer")
public class CustomerCenterController {

	@Autowired
	private CustomerCenterService centerService;

	@GetMapping(value = {"","/notice","/qna","/faq"})
	public String board(HttpServletRequest request,Model model)throws Exception {
		String[] pathParams = request.getServletPath().split("/");

		String boardType;

		boardType = (pathParams.length == 2 ? "notice" : pathParams[2]);

		model.addAttribute("boardType", boardType);
		model.addAttribute("page", GlobalValues.centerPage);
		model.addAttribute("pageTitle", GlobalValues.centerTitle);

		return "frame";
	}

	@GetMapping(value = "/{boardType}/list.do" ,produces = "application/json; charset=utf8")
	@ResponseBody
	public String list(@PathVariable(name = "boardType") String boardType
						,@RequestParam(name="query",required = false) String query
						,Model model)throws Exception {

		if(query == null)
			query = "";

		ArrayList<CenterPostDTO> centerPostList = centerService.getCenterPostList(query,null,boardType);

		return JsonTool.convertToJson(centerPostList);
	}

	@SuppressWarnings("unchecked")
	@GetMapping("/{boardType}/{postId}")
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
		model.addAttribute("page", GlobalValues.centerViewPage);
		model.addAttribute("pageTitle", GlobalValues.centerTitle);

		return "frame";
	}

	@Auth(type = Type.MEMBER)
	@GetMapping("/qna/write")
	public String write(Model model)throws Exception {

		model.addAttribute("boardType", "qna");
		model.addAttribute("page", GlobalValues.centerWritePage);
		model.addAttribute("pageTitle", GlobalValues.centerTitle);

		return "frame";
	}

	@Auth(type = Type.ADMIN)
	@GetMapping({"/faq/write","/notice/write"})
	public String write(HttpServletRequest request, Model model)throws Exception {
		String boardType = request.getServletPath().split("/")[2];

		model.addAttribute("boardType", boardType);
		model.addAttribute("page", GlobalValues.centerWritePage);
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
		model.addAttribute("page", GlobalValues.centerWritePage);
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

		return "redirect:/customer/"+centerPost.getBoardType()+"/"+postId;
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
	@PostMapping("/qna/add.do")
	public String add(@RequestParam("postTitle") String postTitle,
						@RequestParam("postContent") String postContent,HttpSession session)throws Exception {

		String boardType = "qna";
		UserDTO loginUser = (UserDTO) session.getAttribute("user");
		String postAuthor = loginUser.getUserId();

		CenterPostDTO centerPost = new CenterPostDTO();

		centerPost.setBoardType(boardType);
		centerPost.setPostAuthor(postAuthor);
		centerPost.setPostTitle(postTitle);
		centerPost.setPostContent(postContent);

		centerService.addCenterPost(centerPost);

		return "redirect:/customer/"+boardType;
	}

	@Auth(type = Type.ADMIN)
	@PostMapping(value = {"/notice/add.do","/faq/add.do"})
	public String add(@RequestParam("postTitle") String postTitle,
						@RequestParam("postContent") String postContent,HttpServletRequest request)throws Exception {

		String boardType = request.getServletPath().split("/")[2];
		UserDTO loginUser = (UserDTO) request.getSession().getAttribute("user");
		String postAuthor = loginUser.getUserId();

		CenterPostDTO centerPost = new CenterPostDTO();

		centerPost.setBoardType(boardType);
		centerPost.setPostAuthor(postAuthor);
		centerPost.setPostTitle(postTitle);
		centerPost.setPostContent(postContent);

		centerService.addCenterPost(centerPost);

		return "redirect:/customer/"+boardType;
	}

	@GetMapping(value="/{postId}/comment/list.do", produces="application/json;charset=utf8")
	@ResponseBody
	public String comment(@PathVariable("postId") String _postId) throws Exception {

		CenterCommentDTO centerComment = new CenterCommentDTO();

		centerComment.setPostId(Integer.parseInt(_postId));

		ArrayList<CenterCommentDTO> centerCommentList = centerService.getCenterCommentList(centerComment);
		return JsonTool.convertToJson(centerCommentList);
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
