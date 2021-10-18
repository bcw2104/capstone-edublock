package kr.ebgs.util;

import java.io.File;

import org.springframework.web.multipart.MultipartFile;

public class FileTool {

	public File findFile(String dirpath,String fileName) {
		File file = null;

		if(fileName != null) {
			file = new File(dirpath+File.separator+fileName);
		}else {
			file = new File(dirpath);

			if(file.isDirectory() && file.listFiles().length > 0) {
				file = file.listFiles()[0];
			}
			else {
				file = null;
			}
		}

		return file;
	}

	public void createFile(String path,MultipartFile multipartFile) throws Exception {
		File file = new File(path);
		if(!file.exists()) {
			file.mkdirs();
		}

		multipartFile.transferTo(file);
	}

	private void clearDirectory(File[] files) {
		 for (int i = 0; i < files.length; i++) {
			 if(files[i].isDirectory()) {
				 clearDirectory(files[i].listFiles());
			}
			 files[i].delete();
		 }
	}

	public void removeFile(String path,String fileName) {
		File file = null;

		if(fileName != null) {
			file = new File(path+File.separator+fileName);
		}else {
			file = new File(path);
		}
		if(file.exists()) {
			if(file.isDirectory()) {
				clearDirectory(file.listFiles());
			}
			file.delete();
		}
	}
}
