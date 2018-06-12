/**
 * Created by brian on 2/24/16.
 */
let rx = require('rxjs/Rx');
let Observer = rx.Subscriber;

let listeners = [];
let observer;
export function init(){
    this.observer = Observer.create(
       function next(event){//events indicating changes from model
           listeners.map(function(listener){
               if(listener && listener.onEvent){
                   listener.onEvent(event);
               }
           });
       },
       function onError(error){
           console.log('event-bus::onError()==>error:',error);
       },
       function onCompleted(finalData){
           console.log('event-bus::onCompleted()==>finalData:',finalData);
       }

    );
    return observer;

}
export function addListener(listenerIn){
    listeners.push(listenerIn);
}

export function removeListener(listenerIn){
    let index = listeners.indexOf(listenerIn);
    listeners.splice(index,1);
}
export function triggerEvent(event){
    this.observer.next(event);
}
