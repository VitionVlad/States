console.log("log:\u001b[32m started server initialization\u001b[37m");
const ws = require('ws');
console.log("log:\u001b[32m WebSocket included\u001b[37m");

const serv = new ws.Server({ port: 9000 });
console.log("log:\u001b[32m Server created\u001b[37m");

var maxid = 0;

class lmod{
    constructor(){
        this.id = 0;
        this.type = "g";
    }
}

var lm = new Array(100);

for(var i = 0; i != 100; i += 1){
    lm[i] = new lmod();
}

console.log("log:\u001b[32m states class created\u001b[37m");

function oncon(wsClient){
    maxid += 1;
    const myid = maxid;
    console.log("log:\u001b[36m connection established with id="+maxid+"\u001b[37m");
    if(maxid < 5){
        wsClient.send('id='+maxid);
        wsClient.on('message', function(message) {
            console.log("log:\u001b[36m message recived\u001b[37m");
            var locmsg = String(message);
            const words = locmsg.split('=');
            if(words[0] === 'ct'){
                const cid = Number(words[1]);
                console.log("log:\u001b[36m sender ingame id="+cid+"\u001b[37m");
                if(Number(words[2])!== -1){
                    lm[Number(words[2])].id = myid;
                    lm[Number(words[2])].type = words[3];
                }
                var sd = "ct=";
                for(var i = 0; i != 100; i +=1){
                    sd += lm[i].id+"=";
                }
                for(var i = 0; i != 100; i +=1){
                    sd += lm[i].type+"=";
                }
                wsClient.send(sd);
                console.log("log:\u001b[36m message sent\u001b[37m");
            }
        });
        wsClient.on('close', function() {
            maxid -= 1;
            console.log("log:\u001b[31m id = " + myid + " leaves the server\u001b[37m");
            if(maxid <= 0){
                console.log("log:\u001b[31m everybody leaved server, closing...\u001b[37m");
                process.exit(0);
            }
        });
        wsClient.on('error', function() {
            console.log("log:\u001b[31m an error occurred, closing...\u001b[37m");
            process.exit(0);
        });
    }else{
        wsClient.close();
    }
}

serv.on('connection', oncon);

console.log("log:\u001b[32m server is ready\u001b[37m");

console.log("log:\u001b[32m local ipv4 = " + Object.values(require('os').networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family==='IPv4' && !i.internal && i.address || []), [])), [])+":9000\u001b[37m");

console.log("\u001b[35minfo\u001b[37m: press ctrl+c to close");