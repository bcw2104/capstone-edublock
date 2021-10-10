package kr.ebgs.serviceImpl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ebgs.dto.UserDTO;
import kr.ebgs.mapper.UserMapper;
import kr.ebgs.util.SecureTool;

@Service
public class UserService {

	@Autowired
	private SecureTool secureTool;
	@Autowired
	private UserMapper userMapper;

	public ArrayList<UserDTO> getUsers() {
		return userMapper.select(new UserDTO());
	}

	public UserDTO getUserById(String userId) {
		UserDTO user = new UserDTO();
		user.setUserId(userId);

		ArrayList<UserDTO> userList = userMapper.select(user);

		if (userList.isEmpty())
			return null;

		user = userList.get(0);

		return user;
	}

	public UserDTO getUserByEmail(String userEmail) {
		UserDTO user = new UserDTO();
		user.setUserEmail(userEmail);

		ArrayList<UserDTO> userList = userMapper.select(user);

		if (userList.isEmpty())
			return null;

		user = userList.get(0);

		return user;
	}

	public void addUser(UserDTO user) throws Exception{
		if(user.getUserPw() == null) throw new RuntimeException();

		String salt = secureTool.createSalt();
		user.setUserPw(secureTool.encrypt(user.getUserPw(), salt));
		user.setSalt(salt);

		userMapper.insert(user);
	}

	public void modifyUser(UserDTO user) throws Exception {
		if(user.getUserPw() != null) {
			String salt = secureTool.createSalt();
			user.setUserPw(secureTool.encrypt(user.getUserPw(), salt));
			user.setSalt(salt);
		}
		userMapper.modify(user);
	}

	public void deleteUser(String userId) {
		userMapper.delete(userId);
	}

}
