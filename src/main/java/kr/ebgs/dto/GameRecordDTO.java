package kr.ebgs.dto;

import java.util.Date;

public class GameRecordDTO {
	private int mapId;
	private String userId;
	private Date recordDate;

	public GameRecordDTO() {
		this.mapId = 0;
		this.userId = null;
		this.recordDate = null;
	}


	public int getMapId() {
		return mapId;
	}


	public void setMapId(int mapId) {
		this.mapId = mapId;
	}


	public String getUserId() {
		return userId;
	}


	public void setUserId(String userId) {
		this.userId = userId;
	}


	public Date getRecordDate() {
		return recordDate;
	}


	public void setRecordDate(Date recordDate) {
		this.recordDate = recordDate;
	}


}
