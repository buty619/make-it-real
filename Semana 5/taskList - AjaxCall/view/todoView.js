class View{
  constructor(){
    this.todoStore = new todoStore;
    this.init();
    $("#new-task").keypress(this._onEnterPress.bind(this));
    $("ul").on("click","li",this._done.bind(this));
  }
  init(){
    this.todoStore.findAll().then(todos =>{
      for(const t of todos){
        if(! t.done){
          $(".todo").append("<li id="+t.id+">"+t.title+"</li>");
        }
        else{
          $(".todo").append("<li id="+t.id+" class = \"done\">"+t.title+"</li>");
        }
        
      }
    });
  }
  _onEnterPress(e){    
    if(e.which == 13){
      this.todoStore.create({ title: $("#new-task").val()}).then( todo =>{
        $(".todo").append("<li>"+$("#new-task").val()+"</li>");
        $("#new-task").val("");
      });      
    }
  }
  _done(e){
    let clase = $(e.currentTarget).attr('class');
    let id = $(e.currentTarget).attr('id');
    if( clase === "done"){
      this.todoStore.update(id,{ done: "false"}).then( todo =>{
        $(e.currentTarget).toggleClass("done");
      });
    }else{
      this.todoStore.update(id,{ done: "true"}).then( todo =>{
        $(e.currentTarget).toggleClass("done");
      });    
    }
  }
}

let view = new View();
