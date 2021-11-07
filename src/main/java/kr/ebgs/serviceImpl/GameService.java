package kr.ebgs.serviceImpl;

import java.util.ArrayList;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
	public ArrayList<GameTypeDTO> getGameType(){
		return gameMapper.selectGameType();
	}
}
