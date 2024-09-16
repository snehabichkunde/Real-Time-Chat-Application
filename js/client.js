const socket = io();

let Name; 

let textarea = document.querySelector('#messageInp');
let messageArea = document.querySelector('.container');

do {
    Name = prompt('Please enter your name:');
} while (!Name);

document.querySelector('#send-container').addEventListener('submit', (e) => {
    e.preventDefault();
    sendMassage(textarea.value);
    textarea.value = ''; // Clear the textarea after sending the message
})

function sendMassage(message){
    let msg = {
        user: Name,
        massage: message.trim() // Correct reference here
    }
    // append 
    appendMassage(msg, 'right');
    textarea.value = ''
    scrollToButtom();

    // send to server 
    socket.emit('message', msg)
}

function appendMassage(msg, type){
    let mainDiv = document.createElement('div');
    
    // Split class names and add them separately
    mainDiv.classList.add('message', type); 

    let markup = `
        <h4 class="sender-name">${msg.user}</h4>
        <p class="message-content">${msg.massage}</p>
    `;
    
    mainDiv.innerHTML = markup;
    messageArea.appendChild(mainDiv);
}


// recieve the massages 

socket.on('message', (msg)=>{
    appendMassage(msg, 'left');
    scrollToButtom();

})


function scrollToButtom(){
    messageArea.scrollTop = messageArea.scrollHeight
}
