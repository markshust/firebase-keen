# firebase-keen

Code for show & tell tutorial at https://www.airpair.com/firebase/posts/making-a-keenio-dashboard-realtime-by-integrating-it-with-firebase--d3js

This script is an example of how to make a Keen.io real-time dashboard by integrating it with Firebase. 

This is the result of the finalized example script, which demonstrates average purchase cost by gender:

![Real-Time Dashboard](https://raw.githubusercontent.com/markoshust/firebase-keen/master/images/dashboard.gif)

After modifying the auth credentials for Firebase and Keen.io in the scripts, you would:

Start the event job queue worker:

    node workers/eventJobQueueWorker.js

Create some events:

    node workers/eventJobQueueGenerator.js

Streaming data from Keen.io back into Firebase:

    node workers/keenCacheWorker.js

Then once we have a couple keen cache records, we'll fire up our dashboard:

    open index.html

For more info, please read the complete tutorial at https://www.airpair.com/firebase/posts/making-a-keenio-dashboard-realtime-by-integrating-it-with-firebase--d3js
