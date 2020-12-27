package com.example.demo.controllers;

import com.example.demo.models.Greeting;
import com.example.demo.models.HelloMessage;
import com.example.demo.models.Login;
import com.example.demo.models.Message;
import com.example.demo.services.LoginService;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class GreetingController {

    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(HelloMessage message) {
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }

    @MessageMapping("/login")
    @SendTo("/topic/login")
    public boolean checkCredentials(Login login) {
        LoginService loginService = new LoginService();
        return loginService.checkCredentials(login);
    }

    @MessageMapping("/message/cats")
    @SendTo("/topic/cats")
    public Greeting catsChat(Message message) {
        return new Greeting(HtmlUtils.htmlEscape(message.getName() + ": " + message.getContent()));
    }

    @MessageMapping("/welcome/cats")
    @SendTo("/topic/cats")
    public Greeting catsChatWelcome(Message message) {
        return new Greeting(HtmlUtils.htmlEscape(message.getName() + " " + message.getContent()));
    }

    @MessageMapping("/left/cats")
    @SendTo("/topic/cats")
    public Greeting catsChatLeft(Message message) {
        return new Greeting(HtmlUtils.htmlEscape(message.getName() + " " + message.getContent()));
    }

    @MessageMapping("/message/dogs")
    @SendTo("/topic/dogs")
    public Greeting dogsChat(Message message) {
        return new Greeting(HtmlUtils.htmlEscape(message.getName() + ": " + message.getContent()));
    }

    @MessageMapping("/welcome/dogs")
    @SendTo("/topic/dogs")
    public Greeting dogsChatWelcome(Message message) {
        return new Greeting(HtmlUtils.htmlEscape(message.getName() + " " + message.getContent()));
    }

    @MessageMapping("/left/dogs")
    @SendTo("/topic/dogs")
    public Greeting dogsChatLeft(Message message) {
        return new Greeting(HtmlUtils.htmlEscape(message.getName() + " " + message.getContent()));
    }

}
