package kr.ebgs.dto;

import java.util.Date;

public class CenterPostDTO {
	private int postId;
	private String postAuthor;
	private String postAuthorNickname;
	private String postTitle;
	private String postContent;
	private Date postDate;
	private int hits;
	private String boardType;


	public CenterPostDTO() {
		this.postId = 0;
		this.postAuthor = null;
		this.postAuthorNickname = null;
		this.postTitle = null;
		this.postContent = null;
		this.postDate = null;
		this.hits = 0;
		this.boardType = null;
	}

	public CenterPostDTO(int postId, String postAuthor,String postAuthorNickname, String postTitle, String postContent, Date postDate, int hits,String boardType) {
		super();
		this.postId = postId;
		this.postAuthor = postAuthor;
		this.postAuthorNickname = postAuthorNickname;
		this.postTitle = postTitle;
		this.postContent = postContent;
		this.postDate = postDate;
		this.hits = hits;
		this.boardType = boardType;
	}


	public int getPostId() {
		return postId;
	}


	public void setPostId(int postId) {
		this.postId = postId;
	}


	public String getPostAuthor() {
		return postAuthor;
	}


	public void setPostAuthor(String postAuthor) {
		this.postAuthor = postAuthor;
	}

	public String getPostAuthorNickname() {
		return postAuthorNickname;
	}

	public void setPostAuthorNickname(String postAuthorNickname) {
		this.postAuthorNickname = postAuthorNickname;
	}

	public String getPostTitle() {
		return postTitle;
	}


	public void setPostTitle(String postTitle) {
		this.postTitle = postTitle;
	}


	public String getPostContent() {
		return postContent;
	}


	public void setPostContent(String postContent) {
		this.postContent = postContent;
	}


	public Date getPostDate() {
		return postDate;
	}


	public void setPostDate(Date postDate) {
		this.postDate = postDate;
	}


	public int getHits() {
		return hits;
	}


	public void setHits(int hits) {
		this.hits = hits;
	}

	public String getBoardType() {
		return boardType;
	}

	public void setBoardType(String boardType) {
		this.boardType = boardType;
	}

}
