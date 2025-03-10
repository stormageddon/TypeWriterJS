class TypeWriter {
    attachedEl = null;

    defaultOpts = {
        delay: 100,
        cursor: '|'
    }

    queue = []
    full_queue = null;
    isProcessing = false;
    cursor_pos = null;
    show_cursor = true;

    constructor(elId, global_opts = {}) {
        this.defaultOpts = { ...this.defaultOpts, ...global_opts }
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
            this.addToQueue(() => { tw.attachedEl.innerHTML = tw.attachedEl.innerHTML.substring(0, tw.attachedEl.innerHTML.length - 2) }, options.delay);
        }

        return this;
    }

    wait(ms = this.defaultOpts.delay) {
        this.addToQueue(() => { }, ms)
        return this;
    }

    update_cursor_pos() {
        let cursor_index = tw.attachedEl.innerHTML.indexOf(this.defaultOpts.cursor);

        if (cursor_index < 0 || cursor_index > tw.attachedEl.innerHTML.length)
            cursor_index = tw.attachedEl.innerHTML.length

        tw.attachedEl.innerHTML = tw.attachedEl.innerHTML.slice(0, cursor_index) + tw.attachedEl.innerHTML.slice(cursor_index + 1) + this.defaultOpts.cursor;
    }

    clear(clearImmediately = false) {
        tw.attachedEl.innerHTML = '' + tw.defaultOpts.cursor
        return this;
    }

    async go(loop = false) {

        this.isProcessing = true;
        if (loop)
            this.addToQueue(this.clear, 300);
        tw.attachedEl.innerHTML = this.defaultOpts.cursor;
        tw.cursor_pos = 0;

        while (this.queue.length > 0) {
            const { fn, delay } = this.queue.shift();

            if (loop) {
                this.addToQueue(fn, delay);
            }

            // Wait for the delay before executing the function
            await this._delay(delay);

            // Execute the function
            fn();
            this.update_cursor_pos();
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
