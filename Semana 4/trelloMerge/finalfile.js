"use strict";

class SaveState {
  constructor() {
    this.objSave = {
      "arreglo": []
    };
  }

  save(idCol, idCard, text) {
    if (localStorage.getItem("objSave")) {
      this.objSave = JSON.parse(localStorage.getItem("objSave"));
      this.objSave["arreglo"].push({
        "columna": idCol,
        "targeta": idCard,
        "texto": text
      });
      localStorage.setItem('objSave', JSON.stringify(this.objSave));
    } else {
      this.objSave["arreglo"].push({
        "columna": idCol,
        "targeta": idCard,
        "texto": text
      });
      localStorage.setItem('objSave', JSON.stringify(this.objSave));
    }

    return this.objSave;
  }

  update(idCol, idCard) {
    let objSave = JSON.parse(localStorage.getItem("objSave"));

    for (let i = 0; i < objSave["arreglo"].length; i++) {
      if (objSave["arreglo"][i]["targeta"] === idCard) {
        objSave["arreglo"][i]["columna"] = idCol;
        localStorage.setItem('objSave', JSON.stringify(objSave));
      }
    }
  }

}

class DomManage {
  constructor() {
    $(".buttom").on("click", this.buttomClick);
    $(".fa-times").on("click", this.underBoxCloseClick);
    $(".add").on("click", this.addCard.bind(this));
    $(document).ready(this.charge);
    const dragYdrop = new DragAndDrop();
    this.saveState = new SaveState();
  }

  buttomClick(e) {
    $(e.currentTarget).addClass("hide");
    $(e.currentTarget).next("div").removeClass("hide");
    $(e.currentTarget).before("<textarea class=\"card\"></textarea>");
  }

  underBoxCloseClick(e) {
    $(e.currentTarget).parents(".column").find(".card").remove();
    $(e.currentTarget).parents("#underBox").prev().removeClass("hide");
    $(e.currentTarget).parents("#underBox").addClass("hide");
  }

  addCard(e) {
    id = id + 1;
    const text = $(e.currentTarget).parents(".column").find(".card").val();
    $(e.currentTarget).parents(".column").find(".card").remove();
    $(e.currentTarget).parents(".column").find(".buttom").before("<div id=\"newCard" + id + "\"draggable=\"true\" class=\"newCard draggable\">" + text + "</div>");
    $(e.currentTarget).parents("#underBox").prev().removeClass("hide");
    $(e.currentTarget).parents("#underBox").addClass("hide");
    this.saveState.save($(e.currentTarget).parents(".column").attr("id"), "newCard" + id, text);
  }

  charge(e) {
    if (localStorage.getItem("objSave")) {
      let objCall = JSON.parse(localStorage.getItem("objSave"));

      for (let i = 0; i < objCall["arreglo"].length; i++) {
        let column = objCall["arreglo"][i]["columna"];
        let card = objCall["arreglo"][i]["targeta"];
        let text = objCall["arreglo"][i]["texto"];
        $("#" + column).find(".buttom").before("<div id=" + card + " draggable=\"true\" class=\"newCard draggable\">" + text + "</div>");
      }
    }
  }

}

const dom = new DomManage();

if (localStorage.getItem("objSave")) {
  let otro = JSON.parse(localStorage.getItem("objSave"));
  var id = otro["arreglo"].length + 1;
} else {
  var id = 0;
}"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SaveState =
/*#__PURE__*/
function () {
  function SaveState() {
    _classCallCheck(this, SaveState);

    this.objSave = {
      "arreglo": []
    };
  }

  _createClass(SaveState, [{
    key: "save",
    value: function save(idCol, idCard, text) {
      if (localStorage.getItem("objSave")) {
        this.objSave = JSON.parse(localStorage.getItem("objSave"));
        this.objSave["arreglo"].push({
          "columna": idCol,
          "targeta": idCard,
          "texto": text
        });
        localStorage.setItem('objSave', JSON.stringify(this.objSave));
      } else {
        this.objSave["arreglo"].push({
          "columna": idCol,
          "targeta": idCard,
          "texto": text
        });
        localStorage.setItem('objSave', JSON.stringify(this.objSave));
      }

      return this.objSave;
    }
  }, {
    key: "update",
    value: function update(idCol, idCard) {
      var objSave = JSON.parse(localStorage.getItem("objSave"));

      for (var i = 0; i < objSave["arreglo"].length; i++) {
        if (objSave["arreglo"][i]["targeta"] === idCard) {
          objSave["arreglo"][i]["columna"] = idCol;
          localStorage.setItem('objSave', JSON.stringify(objSave));
        }
      }
    }
  }]);

  return SaveState;
}();

var DomManage =
/*#__PURE__*/
function () {
  function DomManage() {
    _classCallCheck(this, DomManage);

    $(".buttom").on("click", this.buttomClick);
    $(".fa-times").on("click", this.underBoxCloseClick);
    $(".add").on("click", this.addCard.bind(this));
    $(document).ready(this.charge);
    var dragYdrop = new DragAndDrop();
    this.saveState = new SaveState();
  }

  _createClass(DomManage, [{
    key: "buttomClick",
    value: function buttomClick(e) {
      $(e.currentTarget).addClass("hide");
      $(e.currentTarget).next("div").removeClass("hide");
      $(e.currentTarget).before("<textarea class=\"card\"></textarea>");
    }
  }, {
    key: "underBoxCloseClick",
    value: function underBoxCloseClick(e) {
      $(e.currentTarget).parents(".column").find(".card").remove();
      $(e.currentTarget).parents("#underBox").prev().removeClass("hide");
      $(e.currentTarget).parents("#underBox").addClass("hide");
    }
  }, {
    key: "addCard",
    value: function addCard(e) {
      id = id + 1;
      var text = $(e.currentTarget).parents(".column").find(".card").val();
      $(e.currentTarget).parents(".column").find(".card").remove();
      $(e.currentTarget).parents(".column").find(".buttom").before("<div id=\"newCard" + id + "\"draggable=\"true\" class=\"newCard draggable\">" + text + "</div>");
      $(e.currentTarget).parents("#underBox").prev().removeClass("hide");
      $(e.currentTarget).parents("#underBox").addClass("hide");
      this.saveState.save($(e.currentTarget).parents(".column").attr("id"), "newCard" + id, text);
    }
  }, {
    key: "charge",
    value: function charge(e) {
      if (localStorage.getItem("objSave")) {
        var objCall = JSON.parse(localStorage.getItem("objSave"));

        for (var i = 0; i < objCall["arreglo"].length; i++) {
          var column = objCall["arreglo"][i]["columna"];
          var card = objCall["arreglo"][i]["targeta"];
          var text = objCall["arreglo"][i]["texto"];
          $("#" + column).find(".buttom").before("<div id=" + card + " draggable=\"true\" class=\"newCard draggable\">" + text + "</div>");
        }
      }
    }
  }]);

  return DomManage;
}();

var dom = new DomManage();

if (localStorage.getItem("objSave")) {
  var otro = JSON.parse(localStorage.getItem("objSave"));
  var id = otro["arreglo"].length + 1;
} else {
  var id = 0;
}"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SaveState =
/*#__PURE__*/
function () {
  function SaveState() {
    _classCallCheck(this, SaveState);

    this.objSave = {
      "arreglo": []
    };
  }

  _createClass(SaveState, [{
    key: "save",
    value: function save(idCol, idCard, text) {
      if (localStorage.getItem("objSave")) {
        this.objSave = JSON.parse(localStorage.getItem("objSave"));
        this.objSave["arreglo"].push({
          "columna": idCol,
          "targeta": idCard,
          "texto": text
        });
        localStorage.setItem('objSave', JSON.stringify(this.objSave));
      } else {
        this.objSave["arreglo"].push({
          "columna": idCol,
          "targeta": idCard,
          "texto": text
        });
        localStorage.setItem('objSave', JSON.stringify(this.objSave));
      }

      return this.objSave;
    }
  }, {
    key: "update",
    value: function update(idCol, idCard) {
      var objSave = JSON.parse(localStorage.getItem("objSave"));

      for (var i = 0; i < objSave["arreglo"].length; i++) {
        if (objSave["arreglo"][i]["targeta"] === idCard) {
          objSave["arreglo"][i]["columna"] = idCol;
          localStorage.setItem('objSave', JSON.stringify(objSave));
        }
      }
    }
  }]);

  return SaveState;
}();

var DomManage =
/*#__PURE__*/
function () {
  function DomManage() {
    _classCallCheck(this, DomManage);

    $(".buttom").on("click", this.buttomClick);
    $(".fa-times").on("click", this.underBoxCloseClick);
    $(".add").on("click", this.addCard.bind(this));
    $(document).ready(this.charge);
    var dragYdrop = new DragAndDrop();
    this.saveState = new SaveState();
  }

  _createClass(DomManage, [{
    key: "buttomClick",
    value: function buttomClick(e) {
      $(e.currentTarget).addClass("hide");
      $(e.currentTarget).next("div").removeClass("hide");
      $(e.currentTarget).before("<textarea class=\"card\"></textarea>");
    }
  }, {
    key: "underBoxCloseClick",
    value: function underBoxCloseClick(e) {
      $(e.currentTarget).parents(".column").find(".card").remove();
      $(e.currentTarget).parents("#underBox").prev().removeClass("hide");
      $(e.currentTarget).parents("#underBox").addClass("hide");
    }
  }, {
    key: "addCard",
    value: function addCard(e) {
      id = id + 1;
      var text = $(e.currentTarget).parents(".column").find(".card").val();
      $(e.currentTarget).parents(".column").find(".card").remove();
      $(e.currentTarget).parents(".column").find(".buttom").before("<div id=\"newCard" + id + "\"draggable=\"true\" class=\"newCard draggable\">" + text + "</div>");
      $(e.currentTarget).parents("#underBox").prev().removeClass("hide");
      $(e.currentTarget).parents("#underBox").addClass("hide");
      this.saveState.save($(e.currentTarget).parents(".column").attr("id"), "newCard" + id, text);
    }
  }, {
    key: "charge",
    value: function charge(e) {
      if (localStorage.getItem("objSave")) {
        var objCall = JSON.parse(localStorage.getItem("objSave"));

        for (var i = 0; i < objCall["arreglo"].length; i++) {
          var column = objCall["arreglo"][i]["columna"];
          var card = objCall["arreglo"][i]["targeta"];
          var text = objCall["arreglo"][i]["texto"];
          $("#" + column).find(".buttom").before("<div id=" + card + " draggable=\"true\" class=\"newCard draggable\">" + text + "</div>");
        }
      }
    }
  }]);

  return DomManage;
}();

var dom = new DomManage();

if (localStorage.getItem("objSave")) {
  var otro = JSON.parse(localStorage.getItem("objSave"));
  var id = otro["arreglo"].length + 1;
} else {
  var id = 0;
}