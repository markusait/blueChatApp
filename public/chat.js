// Make connection
var socket = io.connect('http://localhost:4000');
var timeout
// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

function timeoutFunction() {
  socket.emit("typing", false);
}

message.addEventListener('keyup',function(){
 clearTimeout(timeout)
 socket.emit('typing', handle.value)
 timeout = setTimeout(timeoutFunction, 2000)
})


// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    if (data) {
      feedback.innerHTML = '<p><em>' + data + ' is typing...</em></p>';
    } else {
      feedback.innerHTML = ''
    }
});
