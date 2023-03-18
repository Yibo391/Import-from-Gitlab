export const template = document.createElement('template')
template.innerHTML = `
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
`
