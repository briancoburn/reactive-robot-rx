import React, { Component } from 'react';
import * as eventBus from '../helpers/event-bus';
require('./TestComponent.css');

export default class TestComponent extends Component {

  constructor(){
    super();
    this.state = {updated:false};
  }

  componentDidMount(){
    this.setState({id:this.props.id,valueA:this.props.valueA,valueB:this.props.valueB});
    eventBus.addListener(this);
  }

  onEvent(event){
    switch(event.name){
      case 'msg':
        if(event.data.id === this.props.id){
          this.setState({updated:true,valueA:event.data.valueA,valueB:event.data.valueB,status:event.data.status, timestamp:event.data.timestamp});
          setTimeout(() => {
            this.setState({updated: false});
            }, 500);
          }
          break;
    }
  }

  render(){
    let combinedClassName = '';
    if(this.state.updated){
      if(this.state.status==='error'){
        combinedClassName = 'testComponent backgroundRed'
      }else if(this.state.status==='warning'){
        combinedClassName = 'testComponent backgroundYellow'
      }else if(this.state.status==='info'){
        combinedClassName = 'testComponent backgroundGreen'
      }
    }else{
      combinedClassName = 'testComponent backgroundBlue'
    }
    return (
      <div className={combinedClassName}>
        <span>{'valueA:'+this.state.valueA}</span>
        <span>{'valueB:'+this.state.valueB}</span>
      </div>
    );
  }
}

//export default new App();