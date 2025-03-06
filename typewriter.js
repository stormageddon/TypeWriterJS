class TypeWriter extends HTMLElement {
    constructor() {
        super();
        this._linkedComponent = null;
    }

    static get observedAttributes() {
        return ['el-id'];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (oldVal !== newVal) {
            if (newVal === null) {
                this._linkedComponent = null;
            }
            else {
                this._linkedComponent = document.getElementById(newVal);
                console.log(this._linkedComponent);
            }
        }
    }

    typeStr(str) {
        console.log('type the str');
    }
}

customElements.define("type-writer", TypeWriter);


// function typeStr(str) {
//     const elem = document.getElementById("typewriter");
//     elem.innerHTML = str
// }