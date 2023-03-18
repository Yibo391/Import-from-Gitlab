import exit from './../../img/exit.svg'
export const template = document.createElement('template')

template.innerHTML = `
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
<div id="close" class="aside"><img src=${exit} id="imgClose" alt="close"></div>
</div>
</div>
`
