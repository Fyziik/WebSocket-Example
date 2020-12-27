package com.example.demo.repositories;

import com.example.demo.models.User;

import java.util.ArrayList;

public class ArrayRepo {

    private ArrayList<User> users;

    public ArrayRepo() {
        this.users = new ArrayList<>();
        users.add(new User("Fyziik", "123"));
        users.add(new User("Test", "Test"));
    }

    public ArrayList<User> getUsers() {
        return users;
    }
}
