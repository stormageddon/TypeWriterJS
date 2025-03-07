class TypeWriter {
    attachedEl = null;

    defaultOpts = {
        delay: 500
    }

    queue = []

    constructor(elId) {
        this.attachedEl = document.getElementById(elId);
    }

    typeStr(str, opts = {}) {

        let options = { ...this.defaultOpts, ...opts };

        let elements = str.split('');
        for (const [index, elem] of elements.entries()) {
            (function (tw) {
                tw.queue.push(
                    new Promise((resolve, reject) => {

                        setTimeout(() => {
                            console.log('add');
                            tw.attachedEl.innerHTML += elem
                            //resolve();
                        }, index * options.delay)
                    })
                )
            })(this);
        }
        //        console.log(this.queue);

        return this;
    }

    reverse(opts = {}) {
        let options = { ...this.defaultOpts, ...opts };

        let text = this.attachedEl.innerHTML;
        let counter = 0;
        console.log(`text: ${this.attachedEl.innerHTML}`);
        for (let i = text.length - 1; i >= 0; i--) {
            (function (writer) {
                console.log('here');
                writer.queue.push(new Promise(() => {
                    setTimeout(function () {
                        console.log('reverse');
                        text = text.substring(0, i);
                        writer.attachedEl.innerHTML = text;
                    }, counter * options.delay)
                    counter++;
                }));
            })(this);
        }

        return this;
    }

    remove(num, opts = {}) {
        console.error('Not yet implemented');
    }

    async go() {
        console.log(this.queue);
        await Promise.all(this.queue).then((values) => {
            console.log('done!');
        });
    }
}
