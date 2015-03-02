var Firebase = require('firebase'),
    Keen = require('keen.io'),
    WorkQueue = require('./workqueue-advanced.js'),
    eventJobQueueRef = new Firebase('https://YOUR-INSTANCE.firebaseio.com/keen/event-job-queue'),
    keenClient = Keen.configure({
        projectId: 'YOUR-PROJECT-ID',
        writeKey: 'YOUR-WRITE-KEY'
    });

function processQueue(data, whenFinished) {
    var eventName = data.eventName;

    data.keen = {timestamp: new Date(data.createdAt).toISOString()};

    // Remove data we don't want in Keen.io
    delete data.createdAt;
    delete data.eventName;
    delete data.status;
    delete data.statusChanged;

    keenClient.addEvent(eventName, data, function(err) {
        if (err) console.log('Error adding event to Keen.io', err);

        console.log('Event data record added to Keen.io')

        whenFinished();
    });
}

new WorkQueue(eventJobQueueRef, processQueue);

console.log('Listening for event data...');
