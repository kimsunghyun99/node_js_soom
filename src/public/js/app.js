const socket = io()
const welcome = document.getElementById("welcome");
const form  = welcome.querySelector("form");
const room = document.getElementById("room");




room.hidden = true;

let roomName;


function addMessage(message) {
    const ul = room.querySelector("ul")
    const li = document.createElement("li");
    li.innerText = message;
    ul.appendChild(li);
}

function handleMessageSubmit(event){
    event.preventDefault();
    const input = room.querySelector("#msg input");
    const value = input.value;
    socket.emit("new_message", value, roomName, ()=>{
        addMessage(`나: ${value}`);
    });
   
    input.value= "";
}

function handleNicknameSubmit(event) {
    event.preventDefault();
    const input = room.querySelector("#name input");
    const value = input.value;
    socket.emit("nickname", value);
    input.value="";

}


function showRoom() {
    welcome.hidden = true;
    room.hidden = false;
    const h3 = room.querySelector("h3");
    h3.innerText = `이 방의 이름은 ${roomName}`;
    const msgform = room.querySelector("#msg");
    const nameForm = room.querySelector("#name");
    msgform.addEventListener("submit", handleMessageSubmit);
    nameForm.addEventListener("submit", handleNicknameSubmit);
}

function handleRoomSubmit(event) {
    event.preventDefault();
    const input = form.querySelector("input"); 
   socket.emit("enter_room", input.value, showRoom);
   roomName= input.value;
    input.value = "";
}


function handleSubmit(event) {
         event.preventDefault();
         const input = messageForm.querySelector("input");
        socket.send(makeMessage("new_message", input.value));
        input.value="";
     }


form.addEventListener("submit", handleRoomSubmit);


socket.on("welcome",(userNickname, newCount)=> {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}(${newCount})`
    addMessage(`${userNickname}이(가) 입장했습니다`);
});


socket.on("bye",(userNickname, newCount)=> {
    const h3 = room.querySelector("h3");
    h3.innerText = `Room ${roomName}(${newCount})`
    addMessage(`${userNickname}이(가) 퇴장했습니다`);
});

socket.on("new_message", (msg)=>{
    addMessage(msg);
});

socket.on("room_change",(rooms)=>{
    // console.log(rooms);
    const roomList = welcome.querySelector("ul");
    roomList.innerHTML = "";
    if(rooms.length === 0){
        return;
    }
    rooms.forEach((room)=>{
        const li = document.createElement("li");
        li.innerText = room;
        roomList.append(li);
    });
})



// socket.on("diff_message", (msg)=> {
//     addMessage(msg);
// });


// socketio쓰면 json 하고 string 상관없음


// socket io  쓰기 전

// 
// const nickForm = document.querySelector("#nick");
// const messageList = document.querySelector("ul");

// const socket = new WebSocket(`ws://${window.location.host}`);

// function makeMessage(type, payload) {
//     const msg = {type, payload};
//     return JSON.stringify(msg);
// }
// // string 형태로 변환해야 js아녀도 인식 할 수 있음



// socket.addEventListener("open", ()=> {
//     console.log("서버와 연결되었습니다.");
// })

// socket.addEventListener("message", (message)=>{
  
//     const li = document.createElement("li");
//     li.innerText = message.data;
//     messageList.appendChild(li);
// })

// socket.addEventListener("close", ()=> {
//     console.log("서버와 연결이 끊겼습니다.");
// })

// function handleSubmit(event) {
//     event.preventDefault();
//     const input = messageForm.querySelector("input");
//     socket.send(makeMessage("new_message", input.value));
//     input.value="";
// }

// function handleNickSubmit(event) {
//     event.preventDefault();
//     const input = nickForm.querySelector("input");

//     // socket.send({
//     //     type:"nickname",
//     //     payload: input.value
//     // })
//     socket.send(makeMessage("nickname", input.value));
//     input.value="";
// }



// messageForm.addEventListener("submit", handleSubmit);
// nickForm.addEventListener("submit", handleNickSubmit);








