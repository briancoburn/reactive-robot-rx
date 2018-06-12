import React, { Component } from 'react';
import AppModel from './AppModel';
import TestView from './views/TestView';

export default class App extends Component {

    constructor(){
        super();
        this.appModel = new AppModel();
    }

    render() {
        return (
        <div className="App">
            <div className="App-header">
                <h2>Reactive Robot - testing frontend data solutions for react</h2>
                <h3>rxjs</h3>
            </div>
            <TestView/>
        </div>
    );
    }
}
