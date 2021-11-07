package kr.ebgs.dto;

public class GameInfoDTO {
	private int mapId;
    private String mapName;
    private String authorId;
    private String mapData;
    private int mapPoint;

	public GameInfoDTO() {
		this.mapId = 0;
		this.mapName = null;
		this.authorId = null;
		this.mapData = null;
		this.mapPoint = 0;
	}

	public int getMapId() {
		return mapId;
	}

	public void setMapId(int mapId) {
		this.mapId = mapId;
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

}
