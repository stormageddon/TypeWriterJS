class TypeWriter {
    attachedEl = null;

    defaultOpts = {
        delay: 100
    }

    queue = []
    full_queue = null;
    isProcessing = false;

    constructor(elId) {
        this.attachedEl = document.getElementById(elId);
    }

    addToQueue(fn, delay = 0) {
        this.queue.push({ fn, delay });
        return this;
    }

    typeStr(str, opts = {}) {

        let options = { ...this.defaultOpts, ...opts };

        let elements = str.split('');
        for (const [index, elem] of elements.entries()) {
            this.addToQueue(() => { tw.attachedEl.innerHTML += elem }, options.delay);
        }

        return this;
    }

    remove(num, opts = {}) {
        let options = { ...this.defaultOpts, ...opts };

        for (let i = 0; i < num; i++) {
            this.addToQueue(() => { tw.attachedEl.innerHTML = tw.attachedEl.innerHTML.substring(0, tw.attachedEl.innerHTML.length - 1) }, options.delay);
        }

        return this;
    }

    clear(clearImmediately = false) {
        tw.attachedEl.innerHTML = ''
        return this;
    }

    async go(loop = false) {

        this.isProcessing = true;
        if (loop)
            this.addToQueue(this.clear, 300);

        while (this.queue.length > 0) {
            const { fn, delay } = this.queue.shift();

            if (loop) {
                this.addToQueue(fn, delay);
            }



            // Wait for the delay before executing the function
            await this._delay(delay);

            // Execute the function
            fn();
        }
        this.isProcessing = false;

    }

    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class QueueItem {
    constructor(func, delay) {
        this.func = func;
        this.delay = delay;
    }
}
