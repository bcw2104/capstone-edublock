package kr.ebgs.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ebgs.dto.GameInfoDTO;
import kr.ebgs.dto.GameRecordDTO;
import kr.ebgs.dto.GameTypeDTO;
import kr.ebgs.dto.RankDTO;
import kr.ebgs.mapper.GameMapper;
import kr.ebgs.mapper.RankMapper;

@Service
public class GameService {
	@Autowired
	private RankMapper rankMapper;
	@Autowired
	private GameMapper gameMapper;

	public ArrayList<RankDTO> getRankList(int type){
		return rankMapper.selectAll(type);
	}

	public RankDTO getUserRank(String userId,int type){
		HashMap<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("userId", userId);
		hashMap.put("gameId",type);

		ArrayList<RankDTO> list = rankMapper.select(hashMap);

		if(list.isEmpty()) return null;

		return list.get(0);
	}

	public GameTypeDTO getGameType(GameTypeDTO gameType){
		ArrayList<GameTypeDTO> list = gameMapper.selectGameType(gameType);

		if(list.isEmpty()) return null;

		return list.get(0);
	}

	public ArrayList<GameTypeDTO> getGameTypeList(){
		return gameMapper.selectGameType(new GameTypeDTO());
	}

	public GameInfoDTO getGameInfoById(int mapId){
		GameInfoDTO gameInfo = new GameInfoDTO();
		gameInfo.setMapId(mapId);

		ArrayList<GameInfoDTO> list = gameMapper.selectGameInfo(gameInfo);

		if(list.isEmpty()) return null;

		return list.get(0);
	}

	public ArrayList<GameInfoDTO> getGameInfoList(GameInfoDTO gameInfo){
		return gameMapper.selectGameInfo(gameInfo);
	}

	public ArrayList<GameInfoDTO> getHotGameInfoList(){
		return gameMapper.selectHotGameInfo();
	}

	public ArrayList<GameInfoDTO> getNewGameInfoList(){
		return gameMapper.selectNewGameInfo();
	}

	public GameRecordDTO getGameRecordByPK(String userId, int mapId){
		GameRecordDTO gameRecord = new GameRecordDTO();
		gameRecord.setMapId(mapId);
		gameRecord.setUserId(userId);

		ArrayList<GameRecordDTO> list = gameMapper.selectGameRecord(gameRecord);

		if(list.isEmpty()) return null;

		return list.get(0);
	}

	public ArrayList<GameRecordDTO> getGameRecordList(GameRecordDTO gameRecord){
		return gameMapper.selectGameRecord(gameRecord);
	}

	public void addGameContent(GameInfoDTO gameInfo){
		gameMapper.addGameContent(gameInfo);
	}

	public void addGameClearRecord(String userId,int mapId){
		GameRecordDTO gameRecord = new GameRecordDTO();
		gameRecord.setMapId(mapId);
		gameRecord.setUserId(userId);

		gameMapper.addGameRecord(gameRecord);
	}
}
