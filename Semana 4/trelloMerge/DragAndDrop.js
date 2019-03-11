class DragAndDrop {
  constructor() {    
    $(".column").on("dragstart", ".newCard", this.onDrag);
    $(".column").on("dragover", this.onDragOver);
    $(".column").on("dragleave", this.onDragLeave);
    $(".column").on("drop", this.onDrop.bind(this));
    this.saveState = new SaveState;
  }
  onDrag(e) {
    e.originalEvent.dataTransfer.setData("text", e.currentTarget.id);    
  }
  onDragOver(e) {
    e.preventDefault();
    $(e.currentTarget).addClass("onColumn");
  }
  onDragLeave(e){
    $(e.currentTarget).removeClass("onColumn");
  }
  onDrop(e) {
    e.preventDefault();
    $(e.currentTarget).removeClass("onColumn");
    var data = e.originalEvent.dataTransfer.getData("text");
    e.currentTarget.prepend(document.getElementById(data));
    this.saveState.update($(e.currentTarget).attr("id"),$(e.currentTarget).children().attr("id"));
  }
}
