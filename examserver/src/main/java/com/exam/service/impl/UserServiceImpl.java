package com.exam.service.impl;

import com.exam.model.User;
import com.exam.model.UserRole;
import com.exam.repo.RoleRepository;
import com.exam.repo.UserRepository;
import com.exam.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.config.ConfigDataResourceNotFoundException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    //creating user
    @Override
    public User createUser(User user, Set<UserRole> userRoles) throws Exception {

        User local=this.userRepository.findByUsername(user.getUsername());
        if(local!=null)
        {
            System.out.println("User is already there!!");
            throw new Exception("User already present!!");
        } else {
            //create user
            for (UserRole ur:userRoles){
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local=this.userRepository.save(user);
        }
        return local;
    }

    //getting user by username
    @Override
    public User getUser(String username) {
        return this.userRepository.findByUsername(username);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }

    @Override
    public void updateUser(User user) throws Exception {
        User temp=this.userRepository.findById(user.getId())
                .orElseThrow(()->new Exception("User not found"));
        temp.setProfile(user.getProfile());
        temp.setEmail(user.getEmail());
        temp.setPassword(user.getPassword());
        temp.setUsername(user.getUsername());
        temp.setLastName(user.getLastName());
        temp.setFirstName(user.getFirstName());
        temp.setPhone(user.getPhone());

        final User updateUser=this.userRepository.save(temp);
    }
}
