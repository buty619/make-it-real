import Storage from "./storage";
module.exports = View();

class View {
  constructor() {
    this.id = 0;
    this.storage = new Storage;    
    $(document).ready(this.load.bind(this))
    $(".buttom").on("click", this.buttomClick)
    $(".fa-times").on("click", this.underBoxCloseClick)
    $(".add").on("click", this.addCard.bind(this))
    $(".column").on("dragstart", ".newCard", this.onDrag);
    $(".column").on("dragover", this.onDragOver);
    $(".column").on("dragleave", this.onDragLeave);
    $(".column").on("drop", this.onDrop.bind(this));
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
    this.id = this.id + 1;
    const text = $(e.currentTarget).parents(".column").find(".card").val();
    $(e.currentTarget).parents(".column").find(".card").remove();
    $(e.currentTarget).parents(".column").find(".buttom").before("<div id=\"newCard" + this.id + "\"draggable=\"true\" class=\"newCard draggable\">" + text + "</div>")
    $(e.currentTarget).parents("#underBox").prev().removeClass("hide");
    $(e.currentTarget).parents("#underBox").addClass("hide");
    this.storage.save($(e.currentTarget).parents(".column").attr("id"), "newCard" + this.id, text);
  }
  load(e) {
    let otro = this.storage.get();
    this.id = otro["arreglo"].length;
    let objCall = this.storage.get();
    for (let i = 0; i < objCall["arreglo"].length; i++) {
      let column = objCall["arreglo"][i]["columna"];
      let card = objCall["arreglo"][i]["targeta"];
      let text = objCall["arreglo"][i]["texto"];
      $("#" + column).find(".buttom").before("<div id=" + card + " draggable=\"true\" class=\"newCard draggable\">" + text + "</div>")
    }
  }
  onDrag(e) {
    e.originalEvent.dataTransfer.setData("text", e.currentTarget.id);
  }
  onDragOver(e) {
    e.preventDefault();
    $(e.currentTarget).addClass("onColumn");
  }
  onDragLeave(e) {
    $(e.currentTarget).removeClass("onColumn");
  }
  onDrop(e) {
    e.preventDefault();
    $(e.currentTarget).removeClass("onColumn");
    var data = e.originalEvent.dataTransfer.getData("text");
    e.currentTarget.prepend(document.getElementById(data));
    this.storage.update($(e.currentTarget).attr("id"), $(e.currentTarget).children().attr("id"));
  }
}


