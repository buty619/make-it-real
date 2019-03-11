class SaveState{
  constructor(){
    this.objSave = {"arreglo":[]};
  }
  save(idCol,idCard,text){     
    if(localStorage.getItem("objSave")){
      this.objSave = JSON.parse(localStorage.getItem("objSave"));
      this.objSave["arreglo"].push({"columna":idCol,"targeta":idCard,"texto":text});
      localStorage.setItem('objSave', JSON.stringify(this.objSave));
    }else{
      this.objSave["arreglo"].push({"columna":idCol,"targeta":idCard,"texto":text});
      localStorage.setItem('objSave', JSON.stringify(this.objSave));      
    } 
       
    return this.objSave;
  }
  update(idCol,idCard){
    let objSave = JSON.parse(localStorage.getItem("objSave"));
    for (let i = 0; i < objSave["arreglo"].length; i++) {      
      if(objSave["arreglo"][i]["targeta"]===idCard){
        objSave["arreglo"][i]["columna"]=idCol;
        localStorage.setItem('objSave', JSON.stringify(objSave));
      }
    }    
  }
}