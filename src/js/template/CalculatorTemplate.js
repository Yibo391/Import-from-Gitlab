export const template = document.createElement('template')
template.innerHTML = `
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
`
