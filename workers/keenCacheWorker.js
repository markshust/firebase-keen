var Firebase = require('firebase'),
    Keen = require('keen.io'),
    cacheRef = new Firebase('https://YOUR-INSTANCE.firebaseio.com/keen/cache'),
    client = Keen.configure({
        projectId: 'YOUR-PROJECT-ID',
        readKey: 'YOUR-READ-KEY'
    }),
    checkInterval = 5000, // get new data from Keen.io every 5 seconds
    dataDelay = 20000, // allow 20 seconds of delay for data to start showing from Keen.io
    checkKeen = function() {
        var dateNow = new Date(),
            startDate = new Date(dateNow.getTime() - dataDelay),
            endDate = new Date(dateNow.getTime() - dataDelay + checkInterval),
            avgCostByGender = new Keen.Query('average', {
                eventCollection: 'Purchases',
                targetProperty: 'cost',
                groupBy: 'customer.gender',
                filters: [
                    {
                        property_name: 'keen.timestamp',
                        operator: 'gte',
                        property_value: startDate.toISOString()
                    },
                    {
                        property_name: 'keen.timestamp',
                        operator: 'lt',
                        property_value: endDate.toISOString()
                    }
                ]
            });

        client.run(avgCostByGender, function(err, res) {
            if (err) {
                console.log('error:', err);
                return;
            }

            cacheRef.child('avgCostByGender').push({
                payload: JSON.stringify(res),
                timestamp: parseInt(startDate.getTime() / 1000)
            });
        });

    };

checkKeen();

setInterval(checkKeen, checkInterval);
