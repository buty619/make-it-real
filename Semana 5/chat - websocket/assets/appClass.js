class Chat{
  constructor(){
    this.socket = io();
    $("#nickName").keypress(this.nickName);
    $('form').submit(this.message);
    this.socket.on('chat message',this.chat.bind(this));
    this.socket.on('logIn', this.login.bind(this));
    this.socket.on('logOut', this.logout.bind(this));
  }
  nickName(e){
    var key = e.which;
    if (key == 13){
      $(".container").removeClass("hide");
      $(".modalContainer").addClass("hide");
      socket.emit("logIn",$(this).val());
    }
  }
  message(e){
    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  }
  chat(data){
    $('#messages').append("<li><span class=\"user\"><b>"+data.nickName+":</b></span><span> "+data.msg+"</span></li>");
  }
  login(nickName){
    $('#messages').append("<li><span class=\"logIn\"><b>"+nickName+"</b></span><span> se a Conectato al chat</span></li>");
    $('#users').append("<li id=\"" +nickName+"\"><span class=\"logIn\"><b>"+nickName+"</b></span></li>");
  }
  logout(nickName){
    $('#messages').append("<li><span class=\"logOut\"><b>"+nickName+"</b></span><span> se a Desconectato al chat</span></li>");
    $("#"+nickName).remove();
  }
}
chat = new Chat();