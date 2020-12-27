package com.example.demo.services;

import com.example.demo.models.Login;
import com.example.demo.models.User;
import com.example.demo.repositories.ArrayRepo;

public class LoginService {

    private ArrayRepo repo;

    public LoginService() {
        this.repo = new ArrayRepo();
    }

    public boolean checkCredentials(Login login) {
        for (User user : repo.getUsers()) {
            if (login.getUsername().equals(user.getUsername())) {
                if (login.getPassword().equals(user.getPassword())) {
                    return true;
                }
            }
        }
        return false;
    }
}
