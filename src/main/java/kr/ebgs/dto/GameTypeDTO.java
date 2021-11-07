package kr.ebgs.dto;

public class GameTypeDTO {
	private int gameId;
    private String gameName;
    private String gameTitle;
    private String gameDescription;

	public GameTypeDTO() {
		this.gameId = 0;
		this.gameName = null;
		this.gameTitle = null;
		this.gameDescription = null;
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

	public String getGameTitle() {
		return gameTitle;
	}

	public void setGameTitle(String gameTitle) {
		this.gameTitle = gameTitle;
	}

	public String getGameDescription() {
		return gameDescription;
	}

	public void setGameDescription(String gameDescription) {
		this.gameDescription = gameDescription;
	}

}
