class Storage{
  constructor(){
    this.init();
  }
  init() {
    this.database = firebase.database().ref("arreglo");
  }
  save(idCol,text){    
    return this.database.push({"columna":idCol,"texto":text}).key;  
  }
  update(idCol,idCard){
    this.database.child(idCard).update({"columna":idCol});
  }
  get(){    
    return this.database.once("value")  
  }
}