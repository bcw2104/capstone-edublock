package kr.ebgs.serviceImpl;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.ebgs.dto.UserDTO;
import kr.ebgs.mapper.UserMapper;
import kr.ebgs.util.MailTool;
import kr.ebgs.util.SecureTool;

@Service
public class UserService {

	@Autowired
	private MailTool mailTool;
	@Autowired
	private SecureTool secureTool;
	@Autowired
	private UserMapper userMapper;


	public String createConfirmKey(String email,long date) throws Exception {
		return secureTool.hashGenerator(email+date);
	}

	public ArrayList<UserDTO> getUsers() {
		return userMapper.select(new UserDTO());
	}

	public UserDTO getUser(UserDTO user) {
		ArrayList<UserDTO> userList = userMapper.select(user);

		if (userList.isEmpty())
			return null;

		user = userList.get(0);

		return user;
	}

	public void changeConfirmKey(String userEmail,String confirmKey) throws Exception{
		UserDTO user = new UserDTO();
		user.setConfirmKey(confirmKey);
		user.setUserEmail(userEmail);

		userMapper.changeConfirmKey(user);
	}

	public void addUser(UserDTO user) throws Exception{
		String salt = secureTool.createSalt();
		user.setUserPw(secureTool.encrypt(user.getUserPw(), salt));
		user.setSalt(salt);

		userMapper.insert(user);
	}

	public void sendConfirmMail(String userEmail,String confirmKey) throws Exception{
		mailTool.sendConfirmMail(userEmail, confirmKey);
	}

	public boolean confirmUser(String confirmKey) throws Exception{
		UserDTO user = new UserDTO();
		user.setConfirmKey(confirmKey);

		user = getUser(user);
		if(user != null) {
			userMapper.confirm(confirmKey);
			return true;
		}

		return false;
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
