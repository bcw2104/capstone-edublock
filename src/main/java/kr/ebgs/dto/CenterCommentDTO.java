package kr.ebgs.dto;

import java.util.Date;

public class CenterCommentDTO {
	private int commentId;
	private String commentAuthor;
	private String commentAuthorNickname;
	private String commentContent;
	private Date commentDate;
	private int parentId;
	private int postId;

	public CenterCommentDTO() {
		commentId = 0;
		commentAuthor = null;
		commentAuthorNickname = null;
		commentContent = null;
		commentDate = null;
		parentId = 0;
		postId = 0;
	}

	public CenterCommentDTO(int commentId, String commentAuthor, String commentAuthorNickname, String commentContent,
			Date commentDate, int parentId, int postId) {
		this.commentId = commentId;
		this.commentAuthor = commentAuthor;
		this.commentAuthorNickname = commentAuthorNickname;
		this.commentContent = commentContent;
		this.commentDate = commentDate;
		this.parentId = parentId;
		this.postId = postId;
	}

	public int getCommentId() {
		return commentId;
	}

	public void setCommentId(int commentId) {
		this.commentId = commentId;
	}

	public String getCommentAuthor() {
		return commentAuthor;
	}

	public void setCommentAuthor(String commentAuthor) {
		this.commentAuthor = commentAuthor;
	}

	public String getCommentAuthorNickname() {
		return commentAuthorNickname;
	}

	public void setCommentAuthorNickname(String commentAuthorNickname) {
		this.commentAuthorNickname = commentAuthorNickname;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public Date getCommentDate() {
		return commentDate;
	}

	public void setCommentDate(Date commentDate) {
		this.commentDate = commentDate;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

	public int getPostId() {
		return postId;
	}

	public void setPostId(int postId) {
		this.postId = postId;
	}


}
