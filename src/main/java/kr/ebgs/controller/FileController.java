package kr.ebgs.controller;

import java.io.File;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.ebgs.annotation.Auth;
import kr.ebgs.annotation.Auth.Type;
import kr.ebgs.dto.UserDTO;
import kr.ebgs.serviceImpl.FileService;
import kr.ebgs.serviceImpl.UserService;

@Controller
@RequestMapping("/upload")
public class FileController {
	@Autowired
	private UserService userService;
	@Autowired
	private FileService fileService;

	@GetMapping("/profile")
	@ResponseBody
	public String getProfileImg(@RequestParam(value = "query",required = false) String query,HttpSession session)throws Exception {
		String userId = null;
		if(query != null) {
			UserDTO user = new UserDTO();
			user.setUserId(query);
			user = userService.getUser(user);
			if(user != null) userId = user.getUserId();
		}
		else if(session.getAttribute("user") != null){
			UserDTO user = (UserDTO) session.getAttribute("user");
			userId = user.getUserId();
		}

		if(userId == null) return "fail";

		String dirPath = fileService.getProfileImgPath(userId);

		ServletContext context= session.getServletContext();
		String realPath=context.getRealPath(dirPath);

		String fileName = fileService.getProfileImgName(realPath);

		//기본 프로필 이미지
		if(fileName == null) {
			dirPath = fileService.getCommonProfilePath();
			realPath=context.getRealPath(dirPath);

			fileName = fileService.getProfileImgName(realPath);
		}

		return dirPath+File.separator+fileName;
	}

	@Auth(type = Type.MEMBER)
	@PostMapping("/profile.do")
	@ResponseBody
	public String changeProfileImg(MultipartHttpServletRequest filelist,HttpSession session)throws Exception {
		UserDTO user = (UserDTO) session.getAttribute("user");
		String userId = user.getUserId();

	    MultipartFile mfile = filelist.getFile("profileImg");

	    String extension = FilenameUtils.getExtension(mfile.getOriginalFilename());

		if(fileService.isImgFile(extension)) {
			String fileName =  userId+"_profile."+ extension;
			String dirPath = fileService.getProfileImgPath(userId);

			ServletContext context= session.getServletContext();
			String realPath=context.getRealPath(dirPath);

			String path = realPath+File.separator+fileName;

			fileService.removePath(realPath);
			fileService.changeProfileImg(path,mfile);

			return "success";
		}

		return "fail";
	}
}
