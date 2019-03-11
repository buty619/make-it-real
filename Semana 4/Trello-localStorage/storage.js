class Storage{
  constructor(){
  }
  save(idCol,idCard,text){     
    if(this.get()){
      const data = this.get();
      data["arreglo"].push({"columna":idCol,"targeta":idCard,"texto":text});
      this.set(data)
    }else{
      const data = {"arreglo":[]};
      data["arreglo"].push({"columna":idCol,"targeta":idCard,"texto":text});
      this.set(data);      
    }       
    return data;
  }
  update(idCol,idCard){
    let objSave = this.get();
    for (let i = 0; i < objSave["arreglo"].length; i++) {      
      if(objSave["arreglo"][i]["targeta"]===idCard){
        objSave["arreglo"][i]["columna"]=idCol;
        this.set(objSave);
      }
    }    
  }
  get(){
    let objSave = JSON.parse(localStorage.getItem("objSave"));
    return  objSave;
  }
  set(objSave){
    localStorage.setItem('objSave', JSON.stringify(objSave));
  }
}

// realizar valdicacion del local storage y no en view