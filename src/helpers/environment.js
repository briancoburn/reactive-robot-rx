/**
 * Created by brian on 3/15/16.
 */
import * as eventBus from '../helpers/event-bus';

export function init(){
    console.log('Environment::init()');
    eventBus.addListener(this);
    window.addEventListener('onload',onWindowLoad);
    window.addEventListener('resize',onWindowResize);

    //nope, this one doesn't work, because the components aren't there yet to hear the event
    //onWindowResize();//call initially to ensure a window:resize event goes out to the app
}
function onWindowResize(){
    eventBus.triggerEvent('window:resize',{width: window.innerWidth, height: window.innerHeight});
}
function onWindowLoad(){
    eventBus.triggerEvent('window:load',{width: window.innerWidth, height: window.innerHeight});
}
export function onEvent(eventName,data){
    console.log('environment::onEvent()==>eventName:', eventName);
    switch(eventName){
        case 'app:inited':
            onWindowResize();
            break;
    }
}