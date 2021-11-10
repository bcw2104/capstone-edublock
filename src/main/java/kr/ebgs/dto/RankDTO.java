package kr.ebgs.dto;

public class RankDTO {
	private int rank;
	private String userNickname;
	private int score;
	private int clear;

	public RankDTO() {
		this.rank = 0;
		this.userNickname = null;
		this.score = 0;
		this.clear = 0;
	}

	public int getRank() {
		return rank;
	}

	public void setRank(int rank) {
		this.rank = rank;
	}

	public String getUserNickname() {
		return userNickname;
	}

	public void setUserNickname(String userNickname) {
		this.userNickname = userNickname;
	}

	public int getScore() {
		return score;
	}

	public void setScore(int score) {
		this.score = score;
	}

	public int getClear() {
		return clear;
	}

	public void setClear(int clear) {
		this.clear = clear;
	}


}
