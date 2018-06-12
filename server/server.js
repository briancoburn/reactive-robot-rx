var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var numItems = 500;
var updateDelta = 100;
var items = [];
var itemCounter=0;
var backwardsCounter = numItems-1;
var statusOptions = ['info','warning','error'];

function setupSocket(){

    for(var i=0;i<numItems;i+=1){
        var item = {
            id: Math.random(),
            valueA: 0,
            valueB: 0
        };
        items.push(item)

    }

    app.get('/', function(req, res){
        res.sendFile(__dirname + '../dist/index.html');
    });

    io.on('connection', function(socket){
        console.log('a user connected');

        console.log('sending config:', items);
        socket.emit('config', items);
            var testInterval1 = setInterval(function(){

                var randomCounter = Math.floor(Math.random()*items.length);
                item = items[randomCounter];
                item.status = statusOptions[Math.floor(Math.random() * statusOptions.length)]
                item.valueA = Math.floor(Math.random()*100);
                item.valueB = Math.floor(Math.random()*100);
                console.log(item.id+' '+item.valueA+' '+item.valueB);
                socket.emit('msg', item);


                if(itemCounter > items.length-1){
                    itemCounter = 0;
                }
                item = items[itemCounter];
                item.valueA = Math.floor(Math.random()*100);
                item.valueB = Math.floor(Math.random()*100);
                item.status = 'error';
                console.log(item.id+' '+item.valueA+' '+item.valueB);
                socket.emit('msg', item);
                itemCounter += 1;

                if(backwardsCounter <= 0){
                    backwardsCounter = items.length-1;
                }
                item = items[backwardsCounter];
                item.valueA = Math.floor(Math.random()*100);
                item.valueB = Math.floor(Math.random()*100);
                item.status = 'info';
                console.log(item.id+' '+item.valueA+' '+item.valueB);
                socket.emit('msg', item);
                backwardsCounter -= 1;
            },updateDelta);
    });

    http.listen(3000, function(){
        console.log('listening on *:3000');
    });
}

function init(){
    console.log('server::init()');
    setupSocket();
}
init();