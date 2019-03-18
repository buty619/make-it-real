$(function () {
  var socket = io();
  
  $('form').submit(function(e){
    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  $("#nickName").keypress(function (e) {
    var key = e.which;
    if (key == 13){
      $(".container").removeClass("hide");
      $(".modalContainer").addClass("hide");
      socket.emit("logIn",$(this).val());
    }
  });

  var TYPING_TIMER_LENGTH = 400;
  var typing = false;

  $('#m').on('keypress', () => {
    if (!typing) {
      typing = true;
      socket.emit('typing');
    }
    lastTypingTime = (new Date()).getTime();

    setTimeout(() => {
      var typingTimer = (new Date()).getTime();
      var timeDiff = typingTimer - lastTypingTime;
      if (timeDiff >= TYPING_TIMER_LENGTH && typing) {
        socket.emit('stop typing');
        typing = false;
      }
    }, TYPING_TIMER_LENGTH);
  });

  socket.on('chat message', function(data){
    $('#messages').append("<li><span class=\"user\"><b>"+data.nickName+":</b></span><span> "+data.msg+"</span></li>");
  });

  socket.on('logIn', function(nickName){
    $('#messages').append("<li><span class=\"logIn\"><b>"+nickName+"</b></span><span> se a Conectato al chat</span></li>");
    $('#users').append("<li id=\"" +nickName+"\"><span class=\"logIn\"><b>"+nickName+"</b></span></li>");
  });

  socket.on('logOut', function(nickName){
    $('#messages').append("<li><span class=\"logOut\"><b>"+nickName+"</b></span><span> se a Desconectato al chat</span></li>");
    $("#"+nickName).remove();
  });

  socket.on('typing',function(nickName){
    $('#messages').append("<li id=\"T" +nickName+"\"><span class=\"typing\">"+nickName+" is typing</span></li>");
  });

  socket.on('stop typing',function(nickName){
    $("#T"+nickName).remove()
  });
});