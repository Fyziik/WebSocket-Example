$(document).ready(function () {
    let stompClient = null;
    let currentChat = null;
    let username = null;
    let loggedIn = false;

    function setLogin() {
        document.getElementById("main-content").style.display = "none"
        document.getElementById("chat-choice").style.display = "none"
        document.getElementById("login-content").style.display = "block"
    }

    function setChatchoice() {
        document.getElementById("main-content").style.display = "none"
        document.getElementById("chat-choice").style.display = "block"
        document.getElementById("login-content").style.display = "none"
    }

    function setChosenChat() {
        document.getElementById("main-content").style.display = "block"
        document.getElementById("chat-choice").style.display = "none"
        document.getElementById("login-content").style.display = "none"
    }

    setLogin();

    $(function () {
        $('#login').on("click", function () {
            stompClient = Stomp.over(new SockJS('/clbo_websocket'));
            stompClient.connect({}, function (frame) {
                setConnected(true);
                console.log('Connected: ' + frame);
                stompClient.send("/app/login", {}, JSON.stringify({
                    'username': $("#username").val(),
                    'password': $('#password').val()
                }));
                stompClient.subscribe('/topic/login', function (greeting) {
                    if (greeting.body === "true") {
                        loggedIn = true;
                        username = $('#username').val()
                        $('#usernameDisplay').append("<h3 >" + username + "</h3>")
                        setChatchoice()
                    } else {
                        disconnect()
                    }
                });
            });
        })
    })

    $(function () {
        $('#chatExit').on("click", function () {
            setChatchoice()
            if (currentChat === "catsChat") {
                stompClient.send("/app/left/cats", {}, JSON.stringify({
                    'name': username,
                    'content': " has left the chat"
                }))
                stompClient.unsubscribe("catsRoom")
            } else {
                stompClient.send("/app/left/dogs", {}, JSON.stringify({
                    'name': username,
                    'content': " has left the chat"
                }))
                stompClient.unsubscribe("dogsRoom")
            }
        })
    })

    //CATS
    $(function () {
        $('#cats-room').on("click", function () {
            setChosenChat();
            currentChat = "catsChat";
            showCatsChatWindow();
            stompClient.subscribe('/topic/cats', function (greeting) {
                showGreetingCats(JSON.parse(greeting.body).content)
            }, {
                id: "catsRoom"
            })
            stompClient.send("/app/welcome/cats", {}, JSON.stringify({
                'name': username,
                'content': " has joined The Cool Cats chatroom!"
            }))
        })
    })

    $(function () {
        $('#chatSubmit').on("click", function () {
            stompClient.send("/app/message/cats", {}, JSON.stringify({
                'name': username,
                'content': $('#message').val()
            }))
        })
    })

    //DOGS
    $(function () {
        $('#dogs-room').on("click", function () {
            setChosenChat();
            currentChat = "dogsChat";
            showDogsChatWindow();
            stompClient.subscribe('/topic/dogs', function (greeting) {
                showGreetingDogs(JSON.parse(greeting.body).content)
            }, {
                id: "dogsRoom"
            })
            stompClient.send("/app/welcome/dogs", {}, JSON.stringify({
                'name': username,
                'content': " has joined The Biting Dogs chatroom!"
            }))
        })
    })

    $(function () {
        $('#chatSubmit').on("click", function () {
            stompClient.send("/app/message/dogs", {}, JSON.stringify({
                'name': username,
                'content': $('#message').val()
            }))
        })
    })




    function setConnected(connected) {
        $("#connect").prop("disabled", connected);
        $("#disconnect").prop("disabled", !connected);
        if (connected) {
            $("#conversation").show();
        } else {
            $("#conversation").hide();
        }
        $("#greetings").html("");
    }



    function disconnect() {
        if (stompClient !== null) {
            stompClient.disconnect();
        }
        setConnected(false);
        console.log("Disconnected");
    }



    function showGreetingCats(message) {
        $("#greetingsCats").append("<tr><td>" + message + "</td></tr>");
    }

    function showGreetingDogs(message) {
        $("#greetingsDogs").append("<tr><td>" + message + "</td></tr>");
    }

    function showCatsChatWindow() {
        $("#conversation-cats").show();
        $("#conversation-dogs").hide();
    }

    function showDogsChatWindow() {
        $("#conversation-cats").hide();
        $("#conversation-dogs").show();
    }



})
