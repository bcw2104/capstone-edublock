package kr.ebgs.serviceImpl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ebgs.dto.CenterCommentDTO;
import kr.ebgs.dto.CenterPostDTO;
import kr.ebgs.mapper.CenterCommentMapper;
import kr.ebgs.mapper.CenterPostMapper;

@Service
public class CustomerCenterService {

	@Autowired
	private CenterPostMapper centerPostMapper;
	@Autowired
	private CenterCommentMapper centerCommentMapper;


	public CenterPostDTO getCenterPostById(int postId) {
		ArrayList<CenterPostDTO> postList = centerPostMapper.select(postId);

		if (postList.isEmpty())
			return null;

		CenterPostDTO centerPost = postList.get(0);

		return centerPost;
	}

	public ArrayList<CenterPostDTO> getCenterPostList(String postTitle,String postAuthor,String boardType) {
		CenterPostDTO centerPost = new CenterPostDTO();

		centerPost.setPostTitle(postTitle);
		centerPost.setPostAuthor(postAuthor);
		centerPost.setBoardType(boardType);
		return centerPostMapper.selectList(centerPost);
	}


	public void addCenterPost(CenterPostDTO centerPost) throws Exception{
		centerPostMapper.insert(centerPost);
	}

	public void modifyCenterPost(CenterPostDTO centerPost) throws Exception{
		centerPostMapper.modify(centerPost);
	}


	public void deleteCenterPost(int postId) {
		centerPostMapper.delete(postId);
	}


	public ArrayList<CenterCommentDTO> getCenterCommentList(CenterCommentDTO centerComment) {
		return centerCommentMapper.select(centerComment);
	}


	public void addCenterComment(CenterCommentDTO centerComment) throws Exception {
		centerCommentMapper.insert(centerComment);
	}

	public void deleteCenterComment(int commentId) {
		centerCommentMapper.delete(commentId);
	}

}
