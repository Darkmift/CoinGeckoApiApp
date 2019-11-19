var db = new Dexie('someDB');
db.version(1).stores({
    someTable: "++id,someIndex"
});

// Populate from AJAX:
db.on('ready', function() {
    // on('ready') event will fire when database is open but 
    // before any other queued operations start executing.
    // By returning a Promise from this event,
    // the framework will wait until promise completes before
    // resuming any queued database operations.
    // Let's start by using the count() method to detect if 
    // database has already been populated.
    return db.someTable.count(function(count) {
        if (count > 0) {
            console.log("Already populated");
        } else {
            console.log("Database is empty. Populating from ajax call...");
            // We want framework to continue waiting, so we encapsulate
            // the ajax call in a Promise that we return here.
            return new Promise(function(resolve, reject) {
                $.ajax(url, {
                    type: 'get',
                    dataType: 'json',
                    error: function(xhr, textStatus) {
                        // Rejecting promise to make db.open() fail.
                        reject(textStatus);
                    },
                    success: function(data) {
                        // Resolving Promise will launch then() below.
                        resolve(data);
                    }
                });
            }).then(function(data) {
                console.log("Got ajax response. We'll now add the objects.");
                // By returning the a promise, framework will keep
                // waiting for this promise to complete before resuming other
                // db-operations.
                console.log("Calling bulkAdd() to insert objects...");
                return db.someTable.bulkAdd(data.someInitArrayOfObjects);
            }).then(function() {
                console.log("Done populating.");
            });
        }
    });
});

// Following operation will be queued until we're finished populating data:
db.someTable.each(function(obj) {
    // When we come here, data is fully populated and we can log all objects.
    console.log("Found object: " + JSON.stringify(obj));
}).then(function() {
    console.log("Finished.");
}).catch(function(error) {
    // In our each() callback above fails, OR db.open() fails due to any reason,
    // including our ajax call failed, this operation will fail and we will get
    // the error here!
    console.error(error.stack || error);
    // Note that we could also have catched it on db.open() but in this sample,
    // we show it here.
});