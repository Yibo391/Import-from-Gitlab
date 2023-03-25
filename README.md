# A3 SPA

# Building a Single Page Application with Vite

This project utilizes Vite to build a Single Page Application. The following steps can be taken to run the application:

## Installing Dependencies

Run the following command in the project root directory to install the necessary dependencies:

```console
npm install
```

## Starting the Development Server

Run the following command in the project root directory to start the development server:

```git
npm run dev
```

This will start the Vite-built development server and open the application in the default browser.

## Building the Production Version

Run the following command in the project root directory to build the production version:

```git
npm build
```

This will use Vite to build the production version of the code and output the build results to the dist directory.

By following these steps, you can easily run the Single Page Application locally and build the production version of the code.

## Presentation

[![Alt text](https://img.youtube.com/vi/0VDhxh4se7w/0.jpg)](https://www.youtube.com/watch?v=0VDhxh4se7w)


## Building the Production Version

### F1: PWD Functional requirements

Functional Requirements:

✅ The PWD application should be a single page application.

✅ The user shall be able to open multiple windows (not browser windows/tabs but custom windows created using the DOM) within the application.

✅ The user shall be able to drag and move the windows inside the PWD.

✅ The user shall be able to open new windows of the desired application by clicking or double clicking an icon at the desktop.

✅ The icon used to close the window should be represented in the upper bar of the window.

✅ Windows should get focus when clicked/dragged.

✅ The window with focus shall be on top of all other windows.

✅ The following three window applications should at least be included in the desktop application:
✅ A memory game.

✅ A chat connected to a central chat channel using websockets.

✅ One, by you, designed and decided application (perhaps the quiz or another application).

F1: To enable easy reuse and improve modularity, I have separated the window and bottom bar components of the PWD application into separate JavaScript modules. This approach allows for improved maintainability and scalability, as well as the ability to add additional functionality to the application in the future.

Each application window shares common functionality, including the ability to be opened and closed. I have utilized the mousedown, mouseup, and mousemove events to allow for window dragging and movement within the application. This functionality is implemented using both the Document Object Model (DOM) and the Browser Object Model (BOM) to ensure cross-browser compatibility.

To enable window focus, I have implemented the windowgotfocus event, which ensures that the window with focus is always on top of all other windows. This approach improves the user experience and allows for efficient navigation within the application.

Overall, this modular and reusable approach to component design and functionality implementation in the PWD application ensures scalability, maintainability, and improved user experience.

### F2: PWD Non functional requirements

The application shall be visually appealing.

✅ The application shall be visually appealing.

✅ The README.md should contain a short description of the application with a representative image. It should also explain how the user can start the application.

✅ A complete git commit history should be present for assessment. For this assignment, somewhere between 30 and 200 commits is normal.

✅ The code shall be organized in appropriate ES modules.

✅ All exported functions, modules, and classes should be commented using JSDoc.

✅ The code standard should be followed.

✅ The linters (HTML, CSS, JavaScript) should pass without notices when running npm run lint.

✅ Build the distribution code and verify that it works. The distribution code should be saved in dist/.

I believe that my program has an appealing visual design. For the main interface and bottom taskbar, I have utilized a cyberpunk style to create a futuristic and dynamic aesthetic. The window design is also inspired by a mechanical style to emphasize the technological nature of the application.

### lint

In order to ensure code quality and adherence to best practices, I have utilized linters to detect and fix any potential issues. As a result, there are no outstanding issues or potential problems that were detected during the linting process.

![lint](/lint.png)

Overall, the visual design of my program, combined with its adherence to coding best practices, creates a highly polished and professional end result.

### F3: Memory Game Window Application

To meet the requirements of the Memory application in the PWD, I have implemented the following features:

✅ The user can open and play multiple memory games simultaneously.

✅ The game is accessible and can be played using only the keyboard, ensuring that users of all abilities can enjoy the game.


### Memory game app

![momory game](/memoryGame.png)

### Chat app

F4: Chat Window Application

To meet the requirements of the chat application in the PWD, I have implemented the following features:

✅ The chat application is connected to other student chat clients via the web socket-server.

✅ The user can have multiple chat applications running simultaneously, allowing for efficient communication and collaboration.

✅ When the user opens the chat application for the first time, they are prompted to enter their username. This username is stored and can be reused the next time the user opens the chat application or restarts the PWD.

✅ The user can send chat messages using a textarea, enabling efficient and effective communication with other chat participants.

✅ The user can see at least the 20 latest messages since the chat application was opened, providing context and enabling efficient collaboration.


![chat](/chat.png)

To run the chat app, you first need to navigate to the chat-app directory within your project's source files. Once you are in the correct directory, you will need to install the necessary dependencies by running the following command in your terminal:

```git
npm install
```

This will download and install all of the required dependencies for the chat app.

After installing the dependencies, you can start the server by running the following command in your terminal:

```git
node server.js
```

Once the server is running, you can access the chat app by opening a web browser and navigating to the appropriate URL. The specific URL will depend on the server configuration and may be different on your machine.

### F5: An additional window application

✅ You should add one additional window application to your PWD. It should be developed by yourself and it can for example be the Quiz application or another application you choose to develop.


### Calendar app

![calendar](/calendar.png)

### F6: An enhanced chat application (OPTIONAL)

✅ Ability to choose which channel to listen to.

✅ Caching message history.

### F7: Additional enhancements (OPTIONAL)

### chat app

To fulfill the ability to choose which channel to listen to, the ChatApp class includes a setC() method that takes a channelId as a parameter. This method sets the current channel in the application and loads messages from chat history that belongs to the channel. It also filters the chat history array based on the current channel or shows all messages if the current channel is set to 'all'.

The ChatApp class also includes a renderPage() method that renders the channels page layout, including both reserved channels and custom channels. It listens for clicks on channels and creates or deletes custom channels as necessary.

To fulfill the caching message history, the ChatApp class uses the window.localStorage object to store and retrieve chat messages history, as well as custom chat channels and the user's username. When the user opens the application, it checks for existing chat history and loads it into the _chatPosts property. When messages are received, they are added to the_chatPosts array and stored in the localStorage. When switching channels, the chat history is filtered based on the current channel and the 20 most recent messages are displayed. This allows the user to see previous messages even if they were not connected to the server when they were sent.

### The Memory application

 Web Components API to define a custom element for my memory game using the window.customElements.define() method.

I use the Shadow DOM to encapsulate the styles and structure of your custom element, which helps to prevent CSS collisions and make my element more modular.

Within the JavaScript code, using various APIs and techniques to build the memory game functionality. For example, i use event listeners to capture user input (mouse clicks, keyboard arrows, etc.) and update the game state accordingly. i use functions to create, show, and hide the cards, as well as to shuffle and arrange the cards on the game board.

Overall, it seems like i use a mix of modern web technologies and programming techniques to build a fun and interactive memory game that can be played in a web browser.

### PWD

I use application-window and shell for well-structureed this program to make it more reusable.
There are 3 important functions in application-window to make it reusable.

createDesktopIcons(): This function creates the desktop icons for the applications included in the PWD. It sets the necessary attributes such as the icon image and title, and adds event listeners to handle icon clicks.
openApplication(icon): This function handles opening an application when its icon is clicked. It creates a new application window and sets the application to be displayed inside it.
setFocusedWindow(appWindow, increaseLayer): This function sets the currently focused window, highlighting it and increasing its layer (if specified). It also un-highlights the previously focused window, if one exists.
