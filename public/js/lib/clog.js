let isGlobalDevMode = true

function clogDevMode(is_global_dev) {
    isGlobalDevMode = is_global_dev
}

class clog {
    constructor() {
        this.isdevmode = false
        this.prefix = null
    }

    /**
     * Set the prefix of the messages
     * @param {string} Prefix of the messages
     */
    setPrefix(new_prefix) {
        this.prefix = '['+new_prefix+']'
    }

    /**
     * Set Dev mode for this log to true or false
     * @param {Boolean} is_dev [description]
     */
    setDevMode(is_dev) {
        this.isdevmode = is_dev
    }

    /**
     * Log a message to the console
     * @param  {?} message the message to be outputted to the console
     */
    log(message) {
        if(isGlobalDevMode || this.isdevmode)
            this.prefix ? console.log(this.prefix, message) : console.log(message)
    }
}

export { clogDevMode }
export default clog
