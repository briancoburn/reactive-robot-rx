import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import * as eventBus from './helpers/event-bus';
// import * as appModel from './app-model';
import App from './App';
import ReactDOM from 'react-dom';
console.log('hello')
ReactDOM.render(<App/>, document.getElementById('app'));
// class App extends Component {
//
//     constructor(){
//         super();
//         console.log('index');
//     }
//
//     componentDidMount(){
//         console.log('App::componentDidMount()==>appModel:', appModel);
//         // let observer = eventBus.init();
//
//         // appModel.init(observer);pp
//     }
//
//     render() {
//         console.log('index::render()');
//         return (
//             <div className="App">
//             <div className="App-header">
//             <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//             To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//         </div>
//     );
//     }
// }
//
// export default new App();
