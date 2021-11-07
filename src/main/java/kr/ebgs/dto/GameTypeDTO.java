package kr.ebgs.dto;

public class GameTypeDTO {
	private int gameId;
    private String gameName;

	public GameTypeDTO() {
		this.gameId = 0;
		this.gameName = null;
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public String getGameName() {
		return gameName;
	}

	public void setGameName(String gameName) {
		this.gameName = gameName;
	}

}
