package kr.ebgs.dto;

import java.util.Date;

public class GameInfoDTO {
	private int mapId;
	private int gameId;
	private String gameName;
    private String mapName;
    private String authorId;
    private String authorNickname;
    private String mapData;
    private int mapPoint;
    private Date regDate;
    private int formal;
    private int hits;
    private int like;

	public GameInfoDTO() {
		this.mapId = 0;
		this.gameId = 0;
		this.gameName = null;
		this.mapName = null;
		this.authorId = null;
		this.authorNickname = null;
		this.mapData = null;
		this.mapPoint = 0;
		this.regDate = null;
		this.formal = -1;
		this.hits = 0;
		this.like = 0;
	}

	public int getMapId() {
		return mapId;
	}

	public void setMapId(int mapId) {
		this.mapId = mapId;
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

	public String getMapName() {
		return mapName;
	}

	public void setMapName(String mapName) {
		this.mapName = mapName;
	}

	public String getAuthorId() {
		return authorId;
	}

	public void setAuthorId(String authorId) {
		this.authorId = authorId;
	}

	public String getAuthorNickname() {
		return authorNickname;
	}

	public void setAuthorNickname(String authorNickname) {
		this.authorNickname = authorNickname;
	}

	public String getMapData() {
		return mapData;
	}

	public void setMapData(String mapData) {
		this.mapData = mapData;
	}

	public int getMapPoint() {
		return mapPoint;
	}

	public void setMapPoint(int mapPoint) {
		this.mapPoint = mapPoint;
	}

	public Date getRegDate() {
		return regDate;
	}

	public void setRegDate(Date regDate) {
		this.regDate = regDate;
	}

	public int getFormal() {
		return formal;
	}

	public void setFormal(int formal) {
		this.formal = formal;
	}

	public int getHits() {
		return hits;
	}

	public void setHits(int hits) {
		this.hits = hits;
	}

	public int getLike() {
		return like;
	}

	public void setLike(int like) {
		this.like = like;
	}
}
