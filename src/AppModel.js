import * as eventBus from './helpers/event-bus';
let rx = require('rxjs/Rx');
import { throttle } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

export default class AppModel{
  constructor(){


    eventBus.init();
    eventBus.addListener(this);
    this.generateComponentsAndEvents();
    this.setupClickHandler();
  }

  generateComponentsAndEvents(){

    let numItems = 1000;
    let updateDelta = 33;
    let items = [];
    let itemCounter=0;
    let backwardsCounter = numItems-1;
    let statusOptions = ['info','warning','error'];
    let item = null;
    let updateObj = {};
    for(let i=0;i<numItems;i+=1){
      item = {
        id: Math.random(),
        valueA: 0,
        valueB: 0
      };
      updateObj[item.id] = item;
      items.push(item)

    }
    setTimeout(()=>{
      eventBus.triggerEvent({name:'config',data:updateObj});
    },100);

    let counter = 0;
    let limit = 2;
    let testInterval1 = setInterval(function(){
      switch(counter){// only send one update per interval
        case 0:// update a random item within the array
          let randomCounter = Math.floor(Math.random()*items.length);
          item = items[randomCounter];
          item.status = statusOptions[Math.floor(Math.random() * statusOptions.length)]
          item.valueA = Math.floor(Math.random()*100);
          item.valueB = Math.floor(Math.random()*100);
          item.timestamp = Date.now();
          // console.log(item.id+' '+item.valueA+' '+item.valueB);
          eventBus.triggerEvent({name:'realtime:update', data: item});
          break;
        case 1:// cycle thru array forward
          if(itemCounter > items.length-1){
            itemCounter = 0;
          }
          item = items[itemCounter];
          item.valueA = Math.floor(Math.random()*100);
          item.valueB = Math.floor(Math.random()*100);
          item.status = 'error';
          item.timestamp = Date.now();
          // console.log(item.id+' '+item.valueA+' '+item.valueB);
          eventBus.triggerEvent({name:'realtime:update', data: item});
          itemCounter += 1;
          break;
        case 2:// cycle thru array backwards
          if(backwardsCounter <= 0){
            backwardsCounter = items.length-1;
          }
          item = items[backwardsCounter];
          item.valueA = Math.floor(Math.random()*100);
          item.valueB = Math.floor(Math.random()*100);
          item.status = 'info';
          item.timestamp = Date.now();
          // console.log(item.id+' '+item.valueA+' '+item.valueB);
          eventBus.triggerEvent({name:'realtime:update', data: item});
          backwardsCounter -= 1;
          break;
      }
      counter += 1;
      if(counter > limit){
        counter = 0;
      }
    },updateDelta);
  }

  setupClickHandler(){
    document.addEventListener('click', ()=>{
      console.log('document was clicked');
    })
    const clicks$ = rx.Observable.fromEvent(document,'click');
    const example = clicks$.pipe(throttle(val => interval(2000)));
    const subscribe = example.subscribe((val) => {
      console.log('rx let a mouse click through, val:',val);
      // send something on the eventBus if you want to
      // eventBus.triggerEvent('document:click', val);
    });

  }

  onEvent(data){
    // console.log('AppModel::onEvent()==>data:', data);
  }
}