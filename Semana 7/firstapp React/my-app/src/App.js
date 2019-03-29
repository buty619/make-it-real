import React, { Component } from 'react';
import './App.css';
import Welcome from './Title.js'



// class App extends Component {
//   render() {
//     const names = ["pedro","cristian","Juan"];
//     return (
//       <div>
//         <h1>HOLA MUNDO</h1>
//         <ul>
//           {names.map(name =>
//             <li>< Welcome name={name} /></li>
//           )}
//         </ul>
        
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor(){
    super();
    this.state = {
      title: "Hola mundo desde Estado"
    }
    this.changeTitle=this.changeTitle.bind(this);
  }
  render() {
    return (
      <div>
        <h1>{this.state.title}</h1>
        <button onClick={this.changeTitle}>Cambiar el titulo</button>
      </div>
    );
  }  
  changeTitle(){
    this.setState({
      title: "Nuevo titulo"
    });
  }  
}

export default App;
