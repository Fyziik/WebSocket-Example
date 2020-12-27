package com.example.demo.models;

public class Message {

    private String name;
    private String content;

    public Message(String name, String content) {
        this.name = name;
        this.content = content;
    }

    public String getContent() {
        return content;
    }

    public String getName() {
        return name;
    }

    @Override
    public String toString() {
        return "Message{" +
                "name='" + name + '\'' +
                ", content='" + content + '\'' +
                '}';
    }
}
