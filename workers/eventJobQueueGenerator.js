var Firebase = require('firebase'),
    workItems = new Firebase('https://YOUR-INSTANCE.firebaseio.com/keen/event-job-queue'),
    firstNames = [
        ['Brielle', 'Darla', 'Fran', 'Gwen', 'Juliann', 'Lily', 'Maria', 'Piper', 'Susan', 'Tammy'],
        ['Ben', 'George', 'John', 'Mark', 'Mike', 'Nate', 'Paul', 'Roman', 'Stewart', 'Toby', 'Zach']
    ],
    lastNames = ['Crocker', 'Fisher', 'Fitzgerald', 'Johnson', 'Georgeson', 'Parker', 'Robertson', 'Thompson', 'Walker', 'Woo'],
    createEvent = function() {
        var randGender = Math.round(Math.random()),
            randFirstName = Math.floor(Math.random() * 10),
            randLastName = Math.floor(Math.random() * 10),
            randAge = Math.floor((Math.random() * 82) + 18),
            randCost = parseFloat((Math.random() * 300).toFixed(2)),
            customerName = firstNames[randGender][randFirstName] + ' ' + lastNames[randLastName],
            customerGender = randGender == 0 ? 'Female' : 'Male';

        workItems.push({
            eventName: 'Purchases',
            customer: {
                name: customerName,
                age: randAge,
                gender: customerGender
            },
            cost: randCost,
            createdAt: Firebase.ServerValue.TIMESTAMP
        });
    };

(function loop() {
    setTimeout(function() {
        createEvent();
        loop();
    }, Math.floor(Math.random() * 10 * 1000)); // Randomize between 1 and 10 seconds
}());
