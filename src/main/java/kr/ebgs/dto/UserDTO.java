package kr.ebgs.dto;

import java.sql.Timestamp;

public class UserDTO {
	private String userId;
	private String userNickname;
	private String userPw;
	private String userEmail;
	private Timestamp regDate;
	private String userType;
	private String salt;

	public UserDTO() {
		this.userId = null;
		this.userNickname = null;
		this.userPw = null;
		this.userEmail = null;
		this.regDate = null;
		this.userType = null;
		this.salt = null;
	}

	public UserDTO(String userId, String userNickname, String userPw, String userEmail, Timestamp regDate,
			String userType, String salt) {
		this.userId = userId;
		this.userNickname = userNickname;
		this.userPw = userPw;
		this.userEmail = userEmail;
		this.regDate = regDate;
		this.userType = userType;
		this.salt = salt;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserNickname() {
		return userNickname;
	}

	public void setUserNickname(String userNickname) {
		this.userNickname = userNickname;
	}

	public String getUserPw() {
		return userPw;
	}

	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public Timestamp getRegDate() {
		return regDate;
	}

	public void setRegDate(Timestamp regDate) {
		this.regDate = regDate;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

	public String getSalt() {
		return salt;
	}

	public void setSalt(String salt) {
		this.salt = salt;
	}

}


