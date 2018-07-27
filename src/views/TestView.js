import React, { Component } from 'react';
import * as eventBus from '../helpers/event-bus';
import TestComponent from '../components/TestComponent';
require('./TestView.css');

export default class TestView extends Component {

    constructor(){
      super();
      this.state = {items:[]};
    }

    componentDidMount(){
      eventBus.addListener(this);
    }

    onEvent(event){

      switch(event.name){
        case 'config':
          console.log('TestView::onEvent()==>got config, event.data:', event.data);
          this.setState({items:event.data});
          break;
      }
    }

    renderTestComponents(){
      let components = [];
      for(var j in this.state.items){
        let item = this.state.items[j];
        components.push(<TestComponent key={j} id={item.id} valueA={item.valueA} valueB={item.valueB}/>)
      }
      return components;
    }

    render() {
      // console.log('TestView::render()');
      return (
        <div className="App">
          <div className="App-header">
          </div>
          <div className={'componentContainer'}>
            {this.renderTestComponents()}
          </div>
        </div>
      );
    }
}
