var cacheRef = new Firebase('https://YOUR-INSTANCE.firebaseio.com/keen/cache'),
    recordLimit = 100, // 5 minutes of records
    avgCostByGender;

// We'll get up to the initial data so we can prime the chart with some history data
cacheRef.child('avgCostByGender').limitToLast(recordLimit).once('value', function(snapshot) {
    var historyDataValues = [],
        historyData = [{label: 'Female', values: []}, {label: 'Male', values: []}];

    snapshot.forEach(function(childSnapshot) {
        var data = childSnapshot.val(),
            payload = JSON.parse(data.payload);

        // Build the full dataset after getting data from Firebase
        historyDataValues.push(getResultArray(payload.result, data.timestamp));
    });

    // Let's get all of the existing data, except the records we need to delay, and build it into an array
    for (var i = 0; i < historyDataValues.length - 1; i++) {
        historyData[0]['values'].push(historyDataValues[i][0]);
        historyData[1]['values'].push(historyDataValues[i][1]);
    }

    // Let's create the chart
    avgCostByGender = $('#avgCostByGender').epoch({
        type: 'time.line',
        data: historyData,
        axes: ['top', 'right', 'button', 'left'],
        tickets: {time: 200},
        ticks: {time: 9},
        fps: 60
    });

    // We need at least two Keen.io responses to kick things off, one to prime history and one to kick off poller
    if (historyDataValues.length > 1) startPoller();
});

function startPoller() {
    cacheRef.child('avgCostByGender').limitToLast(1).on('child_added', function(snapshot) {
        var data = snapshot.val(),
            payload = JSON.parse(data.payload);

        avgCostByGender.push(getResultArray(payload.result, data.timestamp));
    });
}

// We need this to populate y & time if there is no data for that axis as we need values for both
function getResultArray(result, timestamp) {
    var newData = [],
        female = false,
        male = false;

    for (var i = 0; i < result.length; i++) {
        female = result[i]['customer.gender'] == 'Female';
        male = result[i]['customer.gender'] == 'Male';

        newData.push({time: timestamp, y: result[i]['result']});
    }

    // Populate data array with null values for time if they don't exist for that index
    if (!result.length) {
        newData.push({time: timestamp, y: 0}, {time: timestamp, y: 0});
    } else if (result.length == 1) {
        if (male) {
            newData.push({time: timestamp, y: 0});
        } else if (female) {
            newData.unshift({time: timestamp, y: 0});
        }
    }

    return newData;
}
