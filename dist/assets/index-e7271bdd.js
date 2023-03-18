(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const a of n.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function t(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(o){if(o.ep)return;o.ep=!0;const n=t(o);fetch(o.href,n)}})();const v="/assets/exit-6dfc4f14.svg",m=document.createElement("template");m.innerHTML=`
<style>
#app {
  background-color: white;
  text-align: center;
}

#appheader {
  padding: 5px;
  cursor: grab;
  background-color: blue;
  color: white;
  height: 25px;
  display: flex;
  align-self: flex-end;
}

.burgerMenu {
  width: 17px;
  height: 3px;
  background-color: #aaa;
  margin: 3px 0;
  display: block;
}

.burgerDots {
  margin-top: 4px;
  height: 12px;
  width: 12px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

#name {
  flex-grow: 1;
}

#imgClose {
  cursor: pointer;
}

#icon img {
  width: 100%;
}

.aside {
  flex-basis: 15px;
  flex-shrink: 0;
}

#memoryContainer img {
  width: 100px;
}

.removed {
  visibility: hidden;
}

.subwindow {
  position: absolute;
  z-index: 10;
  overflow: hidden;
}

.subwindow-header {
  position: relative;
  width: 100%;
  height: 30px;
  background: var(--subwindow-header-bg);
  border-bottom: var(--subwindow-header-bottomline-width, 1px)
    var(--subwindow-header-bottomline-style, solid)
    var(--subwindow-header-bottomline-color, #718191);
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row nowrap;
  justify-content: space-between;
  align-items: stretch;
  cursor: move;
}
.subwindow-header-icon {
  padding-left: 2px;
}

.subwindow-header-icon iron-icon {
  max-height: 16px;
}

.subwindow-header-caption {
  width: 100%;
  padding-left: 2px;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: column nowrap;
  justify-content: center;
  align-items: stretch;
  align-content: center;
  color: var(--subwindow-header-color);
}

.subwindow-header-caption label {
  font-size: var(--lumo-font-size-m, 0.875rem);
}

.subwindow-custom-controls {
  height: 18px;
  align-content: center;
}

.subwindow-top-buttonsbar {
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-flow: row nowrap;
  justify-content: space-between;
  align-content: center;
  padding: 0px;
  margin-top: 0px;
}

.subwindow-top-button {
  border-radius: 3px;
  border: 1px solid #666666;
  width: 15px;
  height: 15px;
  text-align: center;
  display: inline-block;
  cursor: pointer;
}

.subwindow-content {
  width: 100%;
  height: calc(100% - 31px);
  overflow: auto;
}

.subwindow-resize {
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 5px;
  height: 5px;
  background: var(--subwindow-resize-color, #666666);
  -webkit-clip-path: polygon(100% 0, 100% 100%, 0 100%);
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
  cursor: se-resize;
}

.subwindow-focuslost {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: var(--subwindow-focus-lost-bg, #b3b3b340);
}
</style>

<div id="app">
<div id="appheader">
<div id="icon" class="aside"></div>
<div id="name"></div>
<div id="close" class="aside"><img src=${v} id="imgClose" alt="close"></div>
</div>
</div>
`;let d=0;class E extends window.HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(m.content.cloneNode(!0))}updatezValueHandler(){this.style.zIndex=d,d++}onMouseEvent(e){e.preventDefault();const t=this.shadowRoot.querySelector("#icon"),s=this.shadowRoot.querySelector("#name"),o=this.shadowRoot.querySelector("#imgClose"),n=this.shadowRoot.querySelector("#appheader");(e.composedPath()[0]===n||e.composedPath()[0]===t||e.composedPath()[0]===s)&&(this.windowFocusHandler(),this.updatezValueHandler(),this.shadowRoot.querySelector("#appheader").style.cursor="grabbing",this.pos3=e.clientX,this.pos4=e.clientY,e.target.onmouseup=this.dragEndHander,e.target.onmousemove=this.dragStarterHandler),e.composedPath()[0]===o&&this.detachHandler()}dragStarterHandler(e){e.preventDefault(),this.pos1=this.pos3-e.clientX,this.pos2=this.pos4-e.clientY,this.pos3=e.clientX,this.pos4=e.clientY,e.target.style.top=`${e.target.offsetTop-this.pos2}px`,e.target.style.left=`${e.target.offsetLeft-this.pos1}px`}dragEndHander(e){this.cancelWindowFocusHandler(),this.shadowRoot.querySelector("#appheader").style.cursor="grab",e.target.onmouseup=null,e.target.onmousemove=null}windowFocusHandler(){this.style.border="solid 8px rgb(220,220,220)"}cancelWindowFocusHandler(){this.style.border=""}connectedCallback(){this.pos1=0,this.pos2=0,this.pos3=0,this.pos4=0,this.addEventListener("mousedown",this.onMouseEvent),this.updatezValueHandler()}detachHandler(){this.removeEventListener("mousedown",this.onMouseEvent),this.remove()}static get zValue(){return d}static set zValue(e){d+=e}set component(e){this.shadowRoot.querySelector("#app").appendChild(e)}get component(){}set icon(e){const t=document.createElement("IMG");t.src=e,this.shadowRoot.querySelector("#icon").appendChild(t)}get icon(){}set name(e){this.shadowRoot.querySelector("#name").textContent=e}get name(){return this.shadowRoot.querySelector("#name").textContent}}window.customElements.define("sub-window",E);const g=document.createElement("template");g.innerHTML=`
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
`;class A extends window.HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(g.content.cloneNode(!0)),this.doesUsernameExist=!0,this.doesChannelExist=!0,this.messageContentJSON={type:"message",data:"The message text is sent using the data property",username:"",channel:"my, not so secret, channel",key:"eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd"},this.websocketAddress=new window.WebSocket("wss://courselab.lnu.se/message-app/socket"),this.updateUserName=this.shadowRoot.querySelector("#usernameField"),this.chatBox=this.shadowRoot.querySelector("#chatContainer"),this.messages=this.shadowRoot.querySelector("#messageArea"),this.messageInput=this.shadowRoot.querySelector("#messageInput"),this.sendButton=this.shadowRoot.querySelector("#sendButton")}getCurrentTime(){const e=new Date;return e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()}usernameConfiguration(){this.updateUserName.disabled=!0,this.messageInput.value="",this.doesUsernameExist=!1,this.sendButton.textContent="Confirm changes";const e=document.createElement("p");e.textContent="First time starting chat, enter a name!",this.shadowRoot.querySelector("#input").prepend(e)}receiveUserMessage(e){const t=JSON.parse(e.data);if(t.type==="message"||t.type==="notification"){if(t.channel!==this.messageContentJSON.channel)return;this.messages.childNodes.length===40&&this.messages.removeChild(this.messages.childNodes[1]);const s=document.createElement("li");s.appendChild(document.createTextNode(`${this.getCurrentTime()} ${t.username}: ${t.data}`)),t.username!==window.localStorage.getItem("username")?s.classList.add("user-message"):s.classList.add("other-message"),this.messages.appendChild(s),this.chatBox.scrollTop=this.chatBox.scrollHeight}}sendUserMessage(){if(this.doesUsernameExist===!0&&this.doesChannelExist===!0){const e=this.messageInput.value;!e.length>=1?this.messageInput.value="":(this.messageInput.value="",this.messageContentJSON.data=e,this.websocketAddress.send(JSON.stringify(this.messageContentJSON)))}else if(this.doesChannelExist===!0&&this.doesUsernameExist===!1){const e=this.messageInput.value;if(e.length>=1){window.localStorage.setItem("username",this.messageInput.value),this.messageInput.value="",this.messageContentJSON.username=e;const t=document.createElement("li");t.appendChild(document.createTextNode('The username now is: "'+e+'"')),this.messages.appendChild(t),this.disableUsernameConfiguration()}}else if(this.doesUsernameExist===!0&&this.doesChannelExist===!1){const e=this.messageInput.value;if(e.length>=1){this.messageInput.value="",this.messageContentJSON.channel=e,this.hidechannelConfigurationField();const t=document.createElement("li");t.appendChild(document.createTextNode('The channel now is: "'+e+'"')),this.messages.appendChild(t),this.chatBox.scrollTop=this.chatBox.scrollHeight}this.updateUserName.disabled=!1}}disableUsernameConfiguration(){this.updateUserName.disabled=!1,this.shadowRoot.querySelector("#input").removeChild(this.shadowRoot.querySelector("#input").firstChild),this.sendButton.textContent="Send message",this.doesUsernameExist=!0}disconnectFromChat(){this.websocketAddress.close()}connectedCallback(){window.localStorage.getItem("username")?this.messageContentJSON.username=window.localStorage.getItem("username"):this.usernameConfiguration(),this.sendButton.addEventListener("click",()=>{this.sendUserMessage()}),this.updateUserName.addEventListener("click",()=>{this.usernameConfiguration()}),this.messageInput.addEventListener("click",()=>{this.messageInput.focus()}),this.messageInput.addEventListener("keyup",e=>{e.keyCode===13&&this.sendUserMessage()}),this.websocketAddress.addEventListener("message",e=>{this.receiveUserMessage(e)})}}window.customElements.define("chat-app",A);const b=document.createElement("template");b.innerHTML=`
<style>
  body {
    background: yellow;
    font-size: 20px;
    color: rgb(101, 5, 255);
  }
  
  ::placeholder {
    color: white;
    opacity: 0.9;
  }
  
  .rad-label {
    display: block;
    text-align: center;
    align-items: center;
    background: green;
    border-radius: 100px;
    padding: 14px 16px;
    margin: 10px 0;
    cursor: pointer;
    transition: 0.3s;
  }
  
  .rad-label:hover,
  .rad-label:focus-within {
    background: lightgreen;
  }
  
  .rad-input {
    position: absolute;
    left: 0;
    top: 0;
    width: 1px;
    height: 1px;
    opacity: 0;
    z-index: -1;
  }
  
  .rad-design {
    width: 22px;
    height: 22px;
    border-radius: 100px;
    background: white;
    position: relative;
  }
  
  .rad-design::before {
    display: inline-block;
    width: inherit;
    height: inherit;
    border-radius: inherit;
    background: hsl(0, 0%, 90%);
    transform: scale(1.1);
    transition: 0.3s;
  }
  
  .rad-input:checked + .rad-design::before {
    transform: scale(0);
  }
  
  .rad-text {
    color: white;
    margin-left: 14px;
    letter-spacing: 3px;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 900;
    transition: 0.3s;
  }
  
  .rad-input:checked ~ .rad-text {
    color: hsl(0, 0%, 40%);
  }
  
  .button {
    float: left;
    margin: 0 5px 0 0;
    width: 100px;
    height: 40px;
    position: relative;
  }
  
  .button label,
  .button input {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  
  .button input[type="radio"] {
    opacity: 0.011;
    z-index: 100;
  }
  
  .button input[type="radio"]:checked + label {
    border-radius: 4px;
  }
  
  .button label {
    cursor: pointer;
    z-index: 90;
    line-height: 1.8em;
  }
  
  :-ms-input-placeholder {
    color: white;
  }
  
  ::-ms-input-placeholder {
    color: white;
  }
  
  p {
    color: darkblue;
  }
  
  li {
    color: rgb(253, 3, 3);
  }
  
  label {
    text-align: center;
    color: white;
  }
  
  h1 {
    font-size: 35px;
  }
  
  h2 {
    font-size: 35px;
    color: rgb(253, 3, 3);
  }
  
  div {
    text-align: center;
  }
  
  .column {
    float: left;
    padding: 10px;
  }
  
  .left {
    width: 25%;
  }
  
  .right {
    width: 25%;
  }
  
  .middle {
    width: 50%;
  }
  
  .winnerText {
    color: green;
    font-family: "Monoton";
    font-size: 100px;
  }
  
  .anotherCenter {
    margin-left: auto;
    margin-right: auto;
  }
  
  .mainBody::after {
    content: "";
    display: table;
    clear: both;
  }
  
  .flat-table {
    margin-left: 100px;
    display: block;
    border-collapse: separate;
    font-family: sans-serif;
    -webkit-font-smoothing: antialiased;
    font-size: 115%;
    overflow: auto;
    width: auto;
  }
  
  th {
    background-color: green;
    color: white;
    font-weight: normal;
    padding: 20px 30px;
    text-align: center;
  }
  
  td {
    background-color: rgb(238, 238, 238);
    color: rgb(111, 111, 111);
    padding: 20px 30px;
  }
  
  .answer,
  .name {
    text-align: center;
    background-color: green;
    font-size: 20px;
    font-weight: 100;
    line-height: 14px;
    margin-bottom: 20px;
    padding: 20px;
    padding-left: 20px;
    border: 2px #297;
    border-radius: 6px;
  }
  
  button {
    font-size: 20px;
    background-color: green;
    color: #fff;
    border: 0;
    border-radius: 3px;
    padding: 10px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .proceedButton {
    text-align: center;
    cursor: pointer;
    font-size: 16px;
    width: 100%;
    border-color: transparent;
    border-radius: 10px;
    margin-top: 10px;
    background: green;
  }
  
  .proceedButton a {
    text-decoration: none;
    color: #fff;
  }
  
  .answers {
    margin-bottom: 20px;
  }
  
  .center {
    background-color: lightgreen;
    padding: 70px 0;
    border: 3px solid green;
    text-align: center;
  }
  
  .formHeader {
    height: 10px;
    padding: 20px 20px 0;
    border-bottom: 1px solid #e1e8ee;
  }
  
  .formBody {
    margin-top: 150px;
    height: 200px;
    padding: 50px 10px 10px;
  }
  
  button:hover {
    background-color: rgb(5, 218, 157);
  }
  
  .round-time-bar {
    margin: 1rem;
    overflow: hidden;
  }
  
  .round-time-bar div {
    height: 5px;
    animation: roundtime calc(var(--duration) *1s) steps(var(--duration)) forwards;
    transform-origin: left center;
    background: linear-gradient(to bottom, red, #900);
  }
  
  .round-time-bar[data-style="smooth"] div {
    animation: roundtime calc(var(--duration) * 1s) linear forwards;
  }
  
  @keyframes roundtime {
    to {
      transform: scaleX(0);
    }
  }
    
</style>
  <div class="mainBody">
  <h1>The 1DV528 Quiz</h1>
  <div class="column left">
  </div>
  <div id = "mainDiv" class="column middle">
      <div id="mainPage">
          <h2>Welcome!</h2>
          <h3>The rules are the following</h3>
          <ul style="list-style: circle;">
              <li>You have 10 seconds to provide an answer per each question.</li>
              <li>If you enter a wrong answer, the quiz ends.</li>
              <li>If you answer all questions correctly, you win.</li>
            </ul>
              <input style="color: white;" id="chosenName" onfocus="this.value=''" class="name" type="text" placeholder="Enter name"> 
              <button class="proceedButton" onclick="return isEmpty();" id="startButton">Start the quiz</button>
      </div>
      <div>
          <header id ="mainHeader">
              <div id = "progressBar" class="round-time-bar" data-style="smooth" style="--duration: 11.1;">
                  <div>
                  </div>
              </div>
              <p id="quizTimer"></p>
          </header>
      </div>

      <div id="question">
          <h1 id="actualQuestion"></h1>
          <br>
          <div id="playerAnswer">
              <input style="color: white;" class="answer" type="text" onfocus="this.value=''" placeholder="Enter your answer" autocomplete="off">
          </div>
          <div id="playerAlternative">
              <form id="alternative">
              </form>
          </div>
          <br>
          <button id="confirmAnswer">Confirm answer</button>
      </div>

      <div id="endGame">
          <h1>Game over!</h1>
          <button>Try again</button>
      </div>

      <div id="winner">
          <h1 class="winnerText">WINNER!</h1>
          <button>Check the score table</button>
      </div>

      <div id="scorePage">
          <h1>Top 5 players of the quiz</h1>
          <table id="highScoreTable" class="flat-table">
              <tbody>
                <tr>
                  <th>Player name</th>
                  <th>Time elapsed (s)</th>
                  <th>Score</th>
                </tr>
              </tbody>
          </table>
      </div>
  </div>
  <div class="column right">
  </div>
  </div>
`;class k extends window.HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(b.content.cloneNode(!0)),this.answer={},this.table=this.shadowRoot.getElementById("highScoreTable"),this.answerButton=this.shadowRoot.getElementById("confirmAnswer"),this.progressBarTag=this.shadowRoot.getElementById("progressBar"),this.quizTimerTag=this.shadowRoot.getElementById("quizTimer"),this.questionTag=this.shadowRoot.getElementById("question"),this.playerAnswerTag=this.shadowRoot.getElementById("playerAnswer"),this.playerAlternativeTag=this.shadowRoot.getElementById("playerAlternative"),this.endGameTag=this.shadowRoot.getElementById("endGame"),this.winnerPage=this.shadowRoot.getElementById("winner"),this.checkTableBtn=this.shadowRoot.querySelector("#winner button"),this.scorePageTag=this.shadowRoot.getElementById("scorePage"),this.maxTime=10,this.startingURL="https://courselab.lnu.se/quiz/question/1",this.isOptional=!1,this.gap=0,this.cntDown=0,this.srvResp=null,this.correctAnswers=0,this.passTime=0,this.userName=null}connectedCallback(){this.playerAlternativeTag.addEventListener("click",function(e){e.target&&e.target.matches("input[type='radio']")&&this.getRadioValue()}),this.answerButton.addEventListener("click",()=>{this.progressBarTag.classList.remove("round-time-bar"),this.stopTimer();let e;if(this.isOptional===!1)e=this.shadowRoot.querySelector(".answer").value;else{this.shadowRoot.querySelectorAll("#radio").forEach(s=>{s.checked&&(e=s.value)});const t=this.shadowRoot.querySelector("#playerAlternative");for(;t.firstChild;)t.firstChild.remove()}this.answer={answer:e},this.processAnswer()}),this.shadowRoot.getElementById("playerAnswer").addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),this.answerButton.click())}),this.shadowRoot.getElementById("chosenName").addEventListener("keydown",function(e){e.key==="Enter"&&(e.preventDefault(),this.shadowRoot.getElementById("startButton").click())}),this.checkTableBtn.addEventListener("click",()=>{this.showWinPage()}),this.button=this.shadowRoot.getElementById("startButton"),this.button.addEventListener("click",()=>{this.userName=this.button.previousElementSibling.value,this.startApplication()})}hideElements(e){const t=this.shadowRoot.querySelector(e).children;for(let s=0;s<t.length;s++)t[s].style.visibility="hidden",t[s].style.display="none",t[s].checked=!1}hideMainPage(){this.shadowRoot.getElementById("mainPage").style.display="none",this.shadowRoot.getElementById("startButton").style.display="none"}showQuestion=function(e){this.hideMainPage(),this.shadowRoot.getElementById("mainHeader").style.visibility="visible",this.questionTag.style.visibility="visible",this.questionTag.style.display="block",this.questionTag.style.visibility="visible",this.answerButton.hidden=!1,this.playerAnswerTag.style.visibility="visible",this.playerAnswerTag.style.display="block",this.playerAnswerTag.value="";const t=this.shadowRoot.getElementById("actualQuestion");t.textContent=e.question};showAlternatives=function(e){this.playerAnswerTag.style.visibility="hidden",this.playerAnswerTag.style.display="none",this.answerButton.hidden=!0,this.playerAlternativeTag.style.visibility="visible";const t=Object.keys(e).length,s=this.shadowRoot.querySelector("#playerAlternative");for(let o=0;o<t;o++){const n=document.createElement("input");n.setAttribute("type","radio"),n.className="rad-input",n.name="choices",n.value="alt"+(o+1),n.id="radio"+(o+1),s.appendChild(n);const a=document.createElement("label");a.id="label"+(o+1),a.textContent=e["alt"+(o+1)],a.className="rad-label";const r=document.createElement("br");a.htmlFor=n.id,s.appendChild(a),s.appendChild(r)}};showGameOverPage(){this.hideElements("#mainDiv"),this.endGameTag.style.visibility="visible",this.endGameTag.style.display="block"}startPageDisplay(){this.progressBarTag.classList.remove("round-time-bar"),this.shadowRoot.getElementById("mainHeader").style.visibility="hidden",this.playerAlternativeTag.style.visibility="hidden",this.questionTag.style.visibility="hidden",this.playerAnswerTag.style.visibility="hidden",this.endGameTag.style.visibility="hidden",this.endGameTag.style.display="none",this.winnerPage.style.visibility="hidden",this.winnerPage.style.display="none",this.scorePageTag.style.visibility="hidden"}displayHighscore(e){this.progressBarTag.classList.remove("round-time-bar"),this.hideElements("#mainDiv"),this.shadowRoot.querySelector("#scorePage").style.visibility="visible",this.shadowRoot.querySelector("#scorePage").style.display="block";let t=5;e.length<5&&(t=e.length);for(let o=0;o<t;o++){const n=document.createElement("tr"),a=document.createElement("td"),r=document.createElement("td"),u=document.createElement("td");n.appendChild(a),n.appendChild(r),n.appendChild(u),this.table.appendChild(n),a.innerText=e[o].name,r.innerText=e[o].time,u.innerText=e[o].score}const s=document.createElement("button");s.textContent="Try again",this.shadowRoot.querySelector("#scorePage").appendChild(s)}async getQuestion(e){const s=await fetch(e,{method:"GET"});if(s.ok)return s.json();throw this.gameOver(),new Error(`HTTP error! status: ${s.status}`)}processQuestions(e){this.getQuestion(e).then(t=>{this.srvResp=t,this.showQuestion(this.srvResp),this.srvResp.alternatives?(this.isOptional=!0,this.showAlternatives(this.srvResp.alternatives)):(this.shadowRoot.querySelector("#playerAlternative").style.visibility="hidden",this.shadowRoot.querySelector("#playerAnswer").style.visibility="visible"),this.startTimer(this.maxTime,this.quizTimerTag),this.quizTimerTag.style.display="none"})}getRadioValue(){this.progressBarTag.classList.remove("round-time-bar"),this.stopTimer();const e=this.shadowRoot.getElementsByName("choices");for(let s=0;s<e.length;s++)e[s].checked&&(this.answer={answer:e[s].value});const t=this.shadowRoot.querySelector("#playerAlternative");for(;t.firstChild;)t.firstChild.remove();this.processAnswer()}async sendAnswer(){const e={method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(this.answer)};try{const t=await fetch(this.srvResp.nextURL,e);if(t.ok)return t.json();this.gameOver()}catch{console.log("Something went wrong")}}winPlayerPage(e){this.shadowRoot.getElementById("mainHeader").style.visibility="hidden",this.playerAnswerTag.style.visibility="hidden",this.playerAnswerTag.style.display="none",this.questionTag.style.visibility="hidden",this.questionTag.style.display="none";const t=document.createElement("p");this.winnerPage.style.visibility="visible",this.winnerPage.style.display="block";const s=document.createElement("p");s.innerHTML=e,t.innerHTML="Congratulations "+this.userName+"! You completed the quiz in: "+this.passTime+" seconds.",this.checkTableBtn.parentNode.insertBefore(t,this.checkTableBtn.previousSibling),t.parentNode.insertBefore(s,t)}processAnswer(){this.sendAnswer().then(e=>{this.srvResp=e,this.correctAnswers++,this.srvResp.nextURL?this.srvResp.nextURL&&(this.processQuestions(this.srvResp.nextURL),this.isOptional=!1):this.winPlayerPage(this.srvResp.message)})}startTimer(e,t){this.progressBarTag.classList.add("round-time-bar"),this.cntDown=e,this.gap=setInterval(()=>{t.textContent=this.cntDown,--this.cntDown<0&&this.gameOver()},1e3)}stopTimer(){this.progressBarTag.classList.remove("round-time-bar"),clearInterval(this.gap),this.passTime+=this.maxTime-this.cntDown}gameOver(){this.progressBarTag.classList.remove("round-time-bar"),this.showGameOverPage(),this.shadowRoot.querySelector("#endGame button").addEventListener("click",()=>{document.location.reload()})}startApplication(){this.processQuestions(this.startingURL),this.sendAnswer(),this.shadowRoot.querySelector("#endGame").style.visibility="hidden"}showWinPage(){this.progressBarTag.classList.remove("round-time-bar"),this.winnerPage.style.visibility="hidden",this.winnerPage.style.display="none";let e;localStorage.highscore?(e=JSON.parse(window.localStorage.highscore),e.push({name:this.userName,time:this.passTime,score:this.correctAnswers})):e=[{name:this.userName,time:this.passTime,score:this.correctAnswers}],this.correctAnswers=0,e=e.sort(function(t,s){return t.time-s.time}),localStorage.highscore=JSON.stringify(e),this.displayHighscore(e),this.shadowRoot.querySelector("#scorePage button").addEventListener("click",()=>{document.location.reload()})}isEmpty(e){return!e.trim().length}}window.customElements.define("quiz-app",k);const y=document.createElement("template");y.innerHTML=`
  <style>
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: sans-serif;
    }

    .main {
    background: #0a2bff;
    width: 60%;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .calc__container {
    display: flex;
    flex-direction: column;
    box-shadow: 7px 7px 8px #0a2bff, -7px -7px 8px #ffffff;
    border-radius: 1rem;
    padding: 1rem;
    row-gap: 1rem;
    }

    .calc__display {
    height: 70px;
    border-radius: 0.5rem;
    box-shadow: inset 4px 4px 6px  #0a2bff, inset -4px -4px 6px #ffffff;
    }

    .calc__input {
    background-color: transparent;
    height: 100%;
    border: none;
    outline: none;
    width: 100%;
    padding: 1rem;
    font-size: 1.3rem;
    line-height: 3rem;
    text-align: right;
    caret-color: #ffbe0c;
    }

    .calc__keyboard {
    display: grid;
    grid-template-columns: repeat(4, max-content);
    gap: 0.75rem;
    }

    .calc__btn {
    height: 3.9rem;
    width: 3.9rem;
    border: none;
    outline: none;
    border-radius: 0.5rem;
    background: #f8fafb;
    box-shadow: 4px 4px 6px #dadcdd, -4px -4px 6px #ffffff;
    cursor: pointer;
    font-size: 1.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    transition: 0.3s;
    }

    .calc__btn:hover {
    background-color: #fff;
    }

    .black {
    background: rgb(0, 0, 0);
    color: #fff;
    }

    .black:hover {
    background: rgba(0, 0, 0, 0.678);
    }
  </style>

      <div class="calc__container">
        <div class="calc__display">
          <input type="text" class="calc__input" id="" />
        </div>
        <div class="calc__keyboard">
          <input value="C" type="button" class="calc__btn black" />
          <input value="%" type="button" class="calc__btn black" />
          <input value="Clr" type="button" class="calc__btn black" />
          <input value="/" type="button" class="calc__btn black" />
          <input value="7" type="button" class="calc__btn" />
          <input value="8" type="button" class="calc__btn" />
          <input value="9" type="button" class="calc__btn" />
          <input value="*" type="button" class="calc__btn black" />
          <input value="4" type="button" class="calc__btn" />
          <input value="5" type="button" class="calc__btn" />
          <input value="6" type="button" class="calc__btn" />
          <input value="-" type="button" class="calc__btn black" />
          <input value="1" type="button" class="calc__btn" />
          <input value="2" type="button" class="calc__btn" />
          <input value="3" type="button" class="calc__btn" />
          <input value="+" type="button" class="calc__btn black" />
          <input value="00" type="button" class="calc__btn" />
          <input value="0" type="button" class="calc__btn" />
          <input value="." type="button" class="calc__btn" />
          <input value="=" type="button" class="calc__btn black" />
        </div>
      </div>
`;class C extends window.HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(y.content.cloneNode(!0)),this.resultBox=this.shadowRoot.querySelector("input[type='text']"),this.buttons=this.shadowRoot.querySelectorAll("input[type='button']"),this.buttons.forEach(e=>{e.addEventListener("click",t=>{if(t.target.value==="C")this.resultBox.value="";else if(t.target.value==="=")if(this.resultBox.value.indexOf("-")>-1){const s=this.resultBox.value.split("-");this.resultBox.value=s[0]-s[1]}else if(this.resultBox.value.indexOf("+")>-1){const s=this.resultBox.value.split("+");this.resultBox.value=Number(s[0])+Number(s[1])}else if(this.resultBox.value.indexOf("*")>-1){const s=this.resultBox.value.split("*");this.resultBox.value=s[0]*s[1]}else if(this.resultBox.value.indexOf("/")>-1){const s=this.resultBox.value.split("/");this.resultBox.value=s[0]/s[1]}else if(this.resultBox.value.indexOf("%")>-1){const s=this.resultBox.value.split("%");this.resultBox.value=s[0]%s[1]}else this.resultBox.value="Error";else t.target.value==="Clr"?this.resultBox.value&&(this.resultBox.value=this.resultBox.value.slice(0,-1)):this.resultBox.value+=t.target.value})})}}window.customElements.define("calculator-app",C);const T="/assets/messenger-5874cd38.png",B="data:image/png;base64,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",f="/assets/quiz-6c103ccc.png",p="/assets/info-643e8a95.png",S="/assets/dog-76db4d46.png",I="/assets/whale-8f4c399e.png",R="/assets/cow-4722fb5f.png",q="/assets/frog-7b184d49.png",L="/assets/jellyfish-4225efd1.png",N="/assets/penguin-e3b1231c.png",z="/assets/tiger-83a64f54.png",M="/assets/lion-5f76042e.png",P="/assets/cat-70dd2675.png",G="/assets/turtle-0525dae3.png";class O{constructor(e,t,s){this.rows=e,this.cols=t,this.maxTime=0,e===2&&t===2&&(this.maxTime=30),e===2&&t===4&&(this.maxTime=60),e===4&&t===4&&(this.maxTime=120),this.num=0,this.gap=0,this.item=null,this.imagesArray=[],this.theFirstGo=null,this.theSecondGo=null,this.theLastImage=null,this.numberOfPairs=0,this.numberOfAttempts=0,this.container=s,this.result=null,this.timer=null,this.secondsText=null,this.passTime=0,this.theTrueImageArray=[p,S,I,R,q,L,N,z,M,P,G],this.imagesLength=this.theTrueImageArray.length-1}startTimer(e,t){this.cntDown=e,this.gap=setInterval(()=>{t.textContent=this.cntDown,--this.cntDown<0&&(this.cntDown=0)},1e3)}stopTimer(){clearInterval(this.gap),this.passTime+=this.maxTime-this.cntDown}init(){this.imagesArray=this.generateGameArr(this.rows,this.cols);const e=document.querySelector("#memory-template-card").content.firstElementChild;e.firstElementChild.src=p,this.result=document.createElement("p"),this.timer=document.createElement("p"),this.result.textContent="Attempts: 0";const t=document.createTextNode("Seconds remaining: ");this.secondsText=t,this.imagesArray.forEach((s,o)=>{this.item=document.importNode(e,!0),this.item.firstElementChild.setAttribute("data-cardnumber",o),this.container.appendChild(this.item),(o+1)%this.cols===0&&this.container.appendChild(document.createElement("br"))}),this.startTimer(this.maxTime,this.timer),this.container.appendChild(this.result),this.container.appendChild(this.timer),this.timer.parentNode.insertBefore(t,this.timer),this.container.addEventListener("click",s=>{s.preventDefault();const o=s.target.nodeName==="IMG"?s.target:s.target.firstElementChild,n=parseInt(o.getAttribute("data-cardnumber"));this.revealCard(this.imagesArray[n],o)})}revealCard(e,t){if(!this.theSecondGo)if(t.src=this.theTrueImageArray[e],!this.theFirstGo)this.theFirstGo=t,this.theLastImage=e;else{if(t===this.theFirstGo)return;this.numberOfAttempts+=1,this.theSecondGo=t,this.result.textContent="At attempt: "+this.numberOfAttempts,this.container.appendChild(this.result),e===this.theLastImage?(this.numberOfPairs+=1,this.numberOfPairs===this.cols*this.rows/2&&(this.stopTimer(),this.timer.remove(),this.secondsText.remove(),this.passTime===this.maxTime?this.result.textContent="You lost, but the effort is appreciated nevertheless.":this.result.textContent="You won! It took you "+this.numberOfAttempts+" attempts and "+this.passTime+" seconds."),setTimeout(()=>{this.theFirstGo.parentNode.classList.add("removed"),this.theSecondGo.parentNode.classList.add("removed"),this.theFirstGo=null,this.theSecondGo=null},1e3)):setTimeout(()=>{this.theFirstGo.src=this.theTrueImageArray[0],this.theSecondGo.src=this.theTrueImageArray[0],this.theFirstGo=null,this.theSecondGo=null},1e3)}}generateGameArr(e,t){const s=[];for(let a=1;a<=e*t/2;a+=1)s.push(a),s.push(a);let o=s.length;const n=0;for(;n!==o;){const a=Math.floor(Math.random()*o);o-=1;const r=s[o];s[o]=s[a],s[a]=r}return s}}document.getElementById("selectedGrid").style.display="none";const l=new Date;document.getElementById("hourOfStartup").innerHTML=l.getHours()+":"+l.getMinutes();document.getElementById("dateOfStartup").innerHTML=l.getFullYear()+"/"+(l.getMonth()+1)+"/"+l.getDate();const w=document.getElementById("chatApp"),x=document.getElementById("memoryApp"),U=document.getElementById("calculatorApp"),h=document.getElementById("quizApp");w.addEventListener("click",X);w.addEventListener("dblclick",j());h.addEventListener("click",H);h.addEventListener("dblclick",_());U.addEventListener("click",F);h.addEventListener("dblclick",D());function H(){const i=document.createElement("sub-window");i.className="app-sub-window",i.id="quizAppId",i.style.setProperty("height","720px"),i.style.setProperty("width","460px"),document.querySelector("#container").prepend(i),i.icon=f,i.name="Quiz",i.component=document.createElement("quiz-app")}function _(){document.querySelectorAll("#quizAppId").forEach(e=>{e.remove()})}function F(){const i=document.createElement("sub-window");i.className="app-sub-window",i.id="calculatorAppId",i.style.setProperty("height","420px"),i.style.setProperty("width","400px"),document.querySelector("#container").prepend(i),i.icon=f,i.name="Calculator",i.component=document.createElement("calculator-app")}function D(){document.querySelectorAll("#calculatorAppId").forEach(e=>{e.remove()})}function c(i,e){const t=document.createElement("sub-window");e===2&&t.style.setProperty("width","280px"),i===2&&t.style.setProperty("height","300px"),t.className="app-sub-window",t.id="memoryApp",document.querySelector("#container").prepend(t);const o=document.querySelector("#memory-template").content.firstElementChild.cloneNode(!0),n=new O(i,e,o);t.icon=B,t.name="Memory",t.component=o,n.init(),t.addEventListener("focus",function(){t.addEventListener("keydown",Q)})}const J=(i,e=document.activeElement)=>{const t=Array.from(i.querySelectorAll("[href]")),s=t[0],o=t[t.length-1];let n=null;s.focus(),n=s;const a=r=>{r.preventDefault(),t.includes(r.target)?n=r.target:(n===s?o.focus():s.focus(),n=document.activeElement)};return document.addEventListener("focus",a,!0),{onClose:()=>{document.removeEventListener("focus",a,!0),e.focus()}}},Q=i=>{const e=document.querySelector("#memoryContainer");e.style.display==="none"?(e.style.display="block",J(e)):(e.style.display="none",e.onClose())};function Y(){document.querySelectorAll("#memoryApp").forEach(e=>{e.remove()})}function K(){document.getElementById("selectedGrid").style.display="block"}document.getElementById("selectedGrid").addEventListener("click",function(i){i.target&&i.target.matches("input[type='radio']")&&W()});function W(){const i=document.getElementsByName("choices");for(let e=0;e<i.length;e++)i[e].checked&&(i[e].value==="2 x 2"&&c(2,2),i[e].value==="2 x 4"&&c(2,4),i[e].value==="4 x 4"&&c(4,4));document.getElementById("selectedGrid").style.display="none"}x.addEventListener("click",K);x.addEventListener("mousedown",function(i){i.button===1&&Y()});function X(){const i=document.createElement("sub-window");i.className="app-sub-window",i.id="chatAppId",document.querySelector("#container").prepend(i),i.icon=T,i.name="Messenger",i.component=document.createElement("chat-app")}function j(){document.querySelectorAll("#chatAppId").forEach(e=>{e.remove()})}
