
    
class Analytics {
    constructor() {
        this.queue = [];
        this.count = 1;
    }
    logEvent(event) {
        this.queue.push(event);
    }

    wait = (ms) => new Promise((resolve,reject) => {
        setTimeout(() => {
            if(this.count % 5 === 0) {
                reject()
            } else {
                resolve()
            }
        }, ms)});

    sendAnalytics = async function() {
        if(this.queue.length === 0) {
            return;
        }
        console.log('Sending Analytics count...', this.count);
        const current = this.queue.shift();
        try {
            await this.wait(1000);
            console.log(`Analytics Sent: ${current}`);
            this.count++;
            
        } catch(e) {
            console.log('---------------------------------');
            console.log(`Failed to send: ${current}`);
            console.log(`Retrying to send: ${current}`);
            console.log('---------------------------------');
            this.count = 1;
            this.queue.unshift(current);
        } finally {
            this.sendAnalytics();
        }
    }

    send = () => {
        this.sendAnalytics();
    }
}
const sdk = new Analytics();

sdk.logEvent("event 1");
sdk.logEvent("event 2");
sdk.logEvent("event 3");
sdk.logEvent("event 4");
sdk.logEvent("event 5");
sdk.logEvent("event 6");
sdk.logEvent("event 7");
sdk.logEvent("event 8");
sdk.logEvent("event 9");
sdk.logEvent("event 10");
sdk.logEvent("event 11");
sdk.send();

