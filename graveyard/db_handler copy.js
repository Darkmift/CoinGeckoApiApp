export default class db_handler {

    constructor() {
        this._dbTitle = "cryptoDB";
        this._objectStoreTitle = 'coin_objects_store';
        this._db;
    }

    //open db handler
    openDB() {
        // In the following line, you should include the prefixes of implementations you want to test.
        //window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        // DON'T use "var indexedDB = ..." if you're not in a function.
        // Moreover, you may need references to some window.IDB* objects:
        //window.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
        //window.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
        // (Mozilla has never prefixed these objects, so we don't need window.mozIDB*)

        // Let us open our database
        const DBOpenRequest = window.indexedDB.open(this._dbTitle);

        // these two event handlers act on the database being opened successfully, or not
        DBOpenRequest.onerror = function(event) {
            console.error('error opening DB: ', event);
        };

        DBOpenRequest.onsuccess = function(event) {
            console.info('database access succesful: ', event);

            // store the result of opening the database in the db variable. This is used a lot below

            this._db = DBOpenRequest.result;
            console.info("TCL: DBOpenRequest.onsuccess -> db", this._db)
            console.info(`databse accessed: ${this._db.name}
            \n database version: ${this._db.version}
            \n databse stores:`, this._db.objectStoreNames)

        };

        // This event handles the event whereby a new version of the database needs to be created
        // Either one has not been created before, or a new version number has been submitted via the
        // window.indexedDB.open line above
        //it is only implemented in recent browsers
        DBOpenRequest.onupgradeneeded = function(event) {

            console.info('upgrade event: ', event);
            this._db = event.target.result;

            this._db.onerror = function(event) {
                console.error('error loading DB: ', event);
            };

            //make storage for coin objects in db,use id as unique identifier
            const objectStore = this._db.createObjectStore(this._objectStoreTitle, { keyPath: "id" });

            //make storage for coin objects in db,use id as unique identifier
            //const objectStore = db.createObjectStore("coin_live_track", { keyPath: "id" });
        }
    }

    getData(coinID) {

        console.log("TCL: db_handler -> getData -> this._db", this._db)

        // open a read/write db transaction, ready for retrieving the data
        const transaction = this._db.transaction([this._dbTitle], "readwrite");


        // report on the success of the transaction completing, when everything is done
        transaction.oncomplete = function(event) {
            console.info('transaction completed:', event);

        };

        transaction.onerror = function(event) {
            console.error('transaction error: ', transaction.error);
            console.error('failed event: ', event);
        };

        // create an object store on the transaction
        const objectStore = transaction.objectStore(this._objectStoreTitle);

        // Make a request to get a record by key from the object store
        const requestCoinData = objectStore.get(coinID);

        //gets the data for said coinID(if exists ,else makes key)
        requestCoinData.onsuccess = function(event) {
            // report the success of our request

            const myRecord = requestCoinData.result;
            console.log('coinIDFound: ', myRecord)

        };

    };

}