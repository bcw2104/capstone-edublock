package kr.ebgs.serviceImpl;

import java.io.File;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.ebgs.util.FileTool;

@Service
public class FileService {
	@Autowired
	private FileTool fileTool;

	public boolean isImgFile(String extension) {

		return (extension.equals("jpg") || extension.equals("jpeg") || extension.equals("png") || extension.equals("bmp") || extension.equals("svg"));
	}

	public String getCommonProfilePath() {
		return "/resources/images/profile";
	}

	public String getProfileImgPath(String userId) {
		return "/resources/upload/"+userId+"/profile";
	}

	public String getProfileImgName(String path) {
		File file = fileTool.findFile(path, null);

		if(file == null) {
			return null;
		}
		return file.getName();
	}

	public void changeProfileImg(String path, MultipartFile mfile) throws Exception {
		fileTool.createFile(path , mfile);
	}

	public void removeProfileImg(String dirPath) {
		fileTool.removeFile(dirPath, null);
	}
}
