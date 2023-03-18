export const template = document.createElement('template')
template.innerHTML = `
  <style>
  ul {
    width: 100%;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
  }
  
  li {
    list-style-type: none;
  }
  
  #chatContainer {
    background-image: url("../img/chat/messenger-background-opac.png");  
    background-repeat: no-repeat;
    background-size: cover; 
    height: 400px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 2px 2px 10px #888888;
    overflow: auto;
  }
    
#messageArea {
    color: #000; /* Fallback for older browsers */
    color: rgba(0, 0, 0, 1.0);
    text-align: left; 
    font-family: 'Segoe UI', 'Tahoma', 'Arial', sans-serif; /* This font is similar to the one used in MSN Chat */
    padding: 10px;
  }


button {
    background-color: lighblue;
    border: 1px solid #CCC; /* This is a light gray color similar to the one used in MSN Chat */
    color: #444; /* This is a dark gray color similar to the one used in MSN Chat */
}

#messageInput {
    width: 100%;
}
  
button {
  transition-duration: 0.2s;
  height: 25px;
}
  
#input {
  background-color: #F5F5DC; /* This is a light beige color similar to the one used in MSN Chat */
  border: 1px solid #CCC; /* This is a light gray color similar to the one used in MSN Chat */
  padding: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 100%;
}

.user-message {
  color: darkblue;
  text-align: right;
}

.other-message {
  text-align: left;
  color: darkgreen;
}

#messageInput {
  width: 350px;
}
    
  </style>
  <div id="chatContainer">
     <ul id="messageArea"></ul>
  </div>
  <div id="input">
     <textarea id="messageInput" rows="2" cols="47"  name="messageInput"></textarea>
     <button type="button" id="usernameField">Modify Username</button>
     <button type="button" id="sendButton">Send</button>
  </div>
`
