import http from "http";
import {Server} from "socket.io";
import {instrument} from "@socket.io/admin-ui";
import express from 'express';

const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname+"/public"));
app.get("/", (req,res) => res.render("home"));
app.get("/*", (reg,res) => res.redirect("/"));

const httpServer = http.createServer(app);
const wsServer = new Server(httpServer, {
    cors:{
        origin : ["https://admin.socket.io"],
        credentials: true
    }
});

instrument(wsServer, {
    auth: false
});

function publicRooms() {
    const sids = wsServer.sockets.adapter.sids;
    const rooms = wsServer.sockets.adapter.rooms;

    // const { 
    //     sockets: {
    //         adapter:{sids,rooms},
    //     },
    // } = wsServer;

    const publicRooms = []
    rooms.forEach((value, key) => {
        if(sids.get(key) === undefined){
            publicRooms.push(key);
        }
    });

    return publicRooms
}

function countRoom(roomName) {
    return wsServer.sockets.adapter.rooms.get(roomName)?.size;

}

wsServer.on("connection", (socket)=>{
    socket["nickname"] = "익명";

    socket.onAny((event)=> {
        console.log(wsServer.sockets.adapter);
        console.log(`Socket Event : ${event}`);
    });

    socket.on("enter_room", (roomName,done) =>{
        done();
        socket.join(roomName);  // join을 통해 그룹핑 
        socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
        wsServer.sockets.emit("room_change", publicRooms());
        
    });
    socket.on("disconnecting", ()=> {
        socket.rooms.forEach(room => socket.to(room).emit("bye", socket.nickname, countRoom(room)-1));
        // bye만 forEach 쓰는 이유  
    }); 

    socket.on("disconnect", ()=>{
        wsServer.sockets.emit("room_change", publicRooms());
    });

socket.on("new_message", (msg, room, done)=> {
    socket.to(room).emit("new_message",`${socket.nickname} : ${msg}`)
    done();
 });

socket.on("nickname", (nickname) => (socket["nickname"] =nickname));
});



const handleListen = () => console.log("listening on http:://localhost:3000");
httpServer.listen(3000,handleListen);





// socket io  쓰기 전

//import WebSocket from "ws";

//app.listen(3000, handleListen);
//const server = http.createServer(app);


//const wss = new WebSocket.Server({server});
//const sockets = [];





// wss.on("connection", (socket)=>{
//     sockets.push(socket);
//     socket["nickname"] = "익명";
//     console.log("브라우저와 연결되었습니다. ");
//     socket.on("close", ()=> console.log("서버>서버와 연결이 끊겼습니다."));
//     //socket.on("message", (message)=> {
       
//     socket.on("message", (msg)=> {
//             const message = JSON.parse(msg);
//        // socket.send(`[서버] ${message}`);

//        switch(message.type) {
//         case "new_message": 
//         //sockets.forEach(aSocket => aSocket.send(`${message.payload}`));
//         sockets.forEach(aSocket => aSocket.send(`${socket.nickname}:${message.payload} `));
//         break;
//         case "nickname":
//             socket["nickname"] = message.payload;
//             break;
//        }
//     });
   
// });
