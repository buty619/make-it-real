import React, { Component } from 'react';
import axios from "axios";
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      list : []
    }
    this.load();
  }

  render() {
    return (
      <div className="wrapper">
        <div className="list">
          <h3>Por hacer:</h3>
          <ul className="todo">
            {this.state.list.map((data) => {
              return <li id={data._id} className={data.done ? "done":null} 
              onClick={this.handleClick.bind(this)}>{data.title}</li>
            })}            
          </ul>
          <input type="text" id="new-task" placeholder="Ingresa una tarea y oprime Enter" 
           onKeyPress={this.addTask.bind(this)}/>
        </div>
      </div>   
    );
  }

  async addTask(e){
    if(e.charCode === 13){
      await axios.post('https://taskherokuapi.herokuapp.com/todo_items', {
        title: e.target.value,
        done: false
      })
      await this.load();
      document.getElementById("new-task").value = "";
    }      
  }

  handleClick(e){
     if(e.target.hasAttribute("class")){
      e.target.removeAttribute("class");
      axios.patch('https://taskherokuapi.herokuapp.com/todo_items/'+e.target.id, {
        title: document.getElementById(e.target.id).innerHTML,
        done: false
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }else{
      e.target.setAttribute("class","done");
      axios.patch('https://taskherokuapi.herokuapp.com/todo_items/'+e.target.id, {
        title: document.getElementById(e.target.id).innerHTML,
        done: true
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
  }

  load(){
    console.log("entro");
    axios.get("https://taskherokuapi.herokuapp.com/todo_items")
    .then( res => {
      this.setState({
        list : res.data
      });
    })     
  }
}

export default App;
