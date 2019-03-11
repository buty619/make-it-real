class DomManage {
  constructor() {
    $(".buttom").on("click", this.buttomClick)
    $(".fa-times").on("click", this.underBoxCloseClick)
    $(".add").on("click", this.addCard.bind(this))
    $(document).ready(this.charge)
    const dragYdrop = new DragAndDrop;
    this.saveState = new SaveState;
  }
  buttomClick(e) {
    $(e.currentTarget).addClass("hide");
    $(e.currentTarget).next("div").removeClass("hide");
    $(e.currentTarget).before("<textarea class=\"card\"></textarea>")
  }
  underBoxCloseClick(e) {
    $(e.currentTarget).parents(".column").find(".card").remove();
    $(e.currentTarget).parents("#underBox").prev().removeClass("hide");
    $(e.currentTarget).parents("#underBox").addClass("hide");
  }
  addCard(e) {
    id = id+1;
    const text = $(e.currentTarget).parents(".column").find(".card").val();
    $(e.currentTarget).parents(".column").find(".card").remove();
    $(e.currentTarget).parents(".column").find(".buttom").before("<div id=\"newCard"+id+"\"draggable=\"true\" class=\"newCard draggable\">" + text + "</div>")
    $(e.currentTarget).parents("#underBox").prev().removeClass("hide");
    $(e.currentTarget).parents("#underBox").addClass("hide"); 
    this.saveState.save($(e.currentTarget).parents(".column").attr("id"),"newCard"+id,text);
  }
  charge(e){
    if(localStorage.getItem("objSave")){
      let objCall = JSON.parse(localStorage.getItem("objSave"));
      for (let i = 0; i < objCall["arreglo"].length; i++) {      
        let column = objCall["arreglo"][i]["columna"];
        let card =  objCall["arreglo"][i]["targeta"];
        let text = objCall["arreglo"][i]["texto"];
        $("#" + column).find(".buttom").before("<div id="+card+" draggable=\"true\" class=\"newCard draggable\">" + text + "</div>")
      }
    }    
  }
}

const dom = new DomManage;

if(localStorage.getItem("objSave")){
  let otro = JSON.parse(localStorage.getItem("objSave"));
  var id= otro["arreglo"].length +1;
}else{
  var id=0;  
} 

