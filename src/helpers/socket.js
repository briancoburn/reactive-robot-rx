/**
 * Created by brian on 3/15/16.
 */
import * as eventBus from '../helpers/event-bus';
let io = require('socket.io-client');
let socket = null;
export function init(options){

    if(options && options.socket_address){
        socket = io.connect(options.socket_address);
    }else{
        socket = io.connect('http://localhost:8080');
    }



    //socket sends 'msg' and receives 'evt'
    socket.on('connect', onSocketConnect);
    socket.on('evt', onSocketMessageReceived);

    eventBus.addListener(this);
}
function onSocketConnect(evt){
    console.log('onSocketConnect()==>evt:', evt);
    socket.emit('msg', {message: 'robot:start'});
}
function onSocketMessageReceived(evt){
    console.log('onSocketMessageReceived()==>evt:', evt);
}
export function onEvent(evt, data){
    console.log('socket::onEvent()==>evt:'+evt+', data:', data);
    switch(evt){
        case 'socket:send':
            console.log('socket::I got socket:send==>',data.message);
            socket.emit('msg', {message: data.message, value:data.value});
            break;
        case 'robot-start-click':
            console.log('socket::I got robot-start-click==>',data.message);
            break;
        case 'move:right-grip':
        case 'move:right-thumb':
        case 'move:right-index':
        case 'move:right-middle':
        case 'move:right-ring':
        case 'move:right-pinky':
            socket.emit('msg', {message: evt, value:data.value});
            break;
    }
}
