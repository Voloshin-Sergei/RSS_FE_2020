const Keyboard = {
    
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false,
        language: true 
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._createKeys());

        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _createKeys() {
        const fragment = document.createDocumentFragment();
        const keyLayoutEn = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
            "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
            "z", "x", "c", "v", "b", "n", "m", ",", ".","?",
            "done","space", "en"
        ];

        const keyLayoutRu = [
            "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "backspace",
            "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ","ф",
            "caps",  "ы", "в", "а", "п", "р", "о", "л", "д",  "ж", "э","enter",
            "я", "ч", "с", "м", "и", "т", "ь",  "б", "ю", ",", ".","?",
            "done","space", "ru"
        ];

        let keyLayout;

        if (this.properties.language) {
            keyLayout = keyLayoutEn;
        } else {
            keyLayout = keyLayoutRu;
        };

        // Creates HTML for an icon
        const createIconHtml = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };

        keyLayout.forEach(key => {
            
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?", "ф"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "ru":
                    keyElement.innerHTML = key;
                    keyElement.addEventListener("click", () => {
                        this._toggleLanguage();
                        this._playSound('lang');
                    });

                    break;

                case "en":
                    keyElement.innerHTML = key;
                    keyElement.addEventListener("click", () => {
                        this._toggleLanguage();
                        this._playSound('lang');
                    });
    
                    break

                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHtml("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                        this._playSound('backspace');
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHtml("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                        this._playSound('caps');
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHtml("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                        this._playSound('enter');
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHtml("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                        this._playSound('space');
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHtml("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                        this._playSound('done');
                    });

                    break;

                default:
                    keyElement.textContent = this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? key.toUpperCase() : key.toLowerCase();
                        this._triggerEvent("oninput");
                        document.querySelector(".use-keyboard-input").focus();
                        this._playSound('key');
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;

        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = this.properties.capsLock ? key.textContent.toUpperCase() : key.textContent.toLowerCase();
            };
            if (key.textContent.toLowerCase() === "en") {
                key.textContent = "en";
            };
            if (key.textContent.toLowerCase() === "ru") {
                key.textContent = "ru";
            };
        }
    },

    _toggleLanguage() {
        this.properties.language = !this.properties.language;
        this.elements.keysContainer.innerHTML = "";
        this.elements.keysContainer.appendChild(this._createKeys());
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");
    },

    _playSound(type) {
        let sound;

        switch (type) {
            case 'key':
                sound = new Audio(URL='assetse/sounds/key.mp3');
            break;

            case 'enter':
                sound = new Audio(URL='assetse/sounds/enter.mp3');
            break;

            case 'backspace':
                sound = new Audio(URL='assetse/sounds/backspace.mp3');
            break;

            case 'caps':
                sound = new Audio(URL='assetse/sounds/caps.wav');
            break;

            case 'done':
                sound = new Audio(URL='assetse/sounds/done.mp3');
            break;

            case 'lang':
                sound = new Audio(URL='assetse/sounds/lang.wav');
            break;

            case 'space':
                sound = new Audio(URL='assetse/sounds/space.mp3');
            break;
        }

        sound.play();
    },

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});