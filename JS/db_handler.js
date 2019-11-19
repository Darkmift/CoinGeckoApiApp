import more_info_render from './more_info_render.js'

export default class db_handler {

    constructor() {
        this._dbTitle = 'cryptoDB';
        this._objectStoreTitle = 'coin_objects_store';
        this._db;

    }

    //open db handler
    openDB() {
        this._db = new Dexie(this._dbTitle);
        const storeName = this._objectStoreTitle;
        this._db.version(1).stores({
            [this._objectStoreTitle]: 'id'
        });
    }

    //public method called
    getData(id, coinID) {

        this._db[this._objectStoreTitle]
            .get(coinID).then(coinData => {

                if (coinData) {
                    // console.log('success: ', coinData)
                        //
                    if ((coinData.timeStamp + 300000) < Date.now()) {
                        this.setData(coinID).then((resp) => {
                            // console.log("TCL: db_handler -> getData -> resp", resp);
                            // console.log("TCL: db_handler -> getData -> request interval more than 5 mins from previous.fetching from network");
                            this._db[this._objectStoreTitle]
                                .get(coinID).then(coinData => {
                                    // console.log("TCL: db_handler -> getData -> Storing network response to indexedDB");
                                    this.populateElement(coinData)
                                })
                        })
                    } else {
                        // console.log("TCL: db_handler -> getData -> request interval less than 5 mins from previous.fetching from indexedDB")
                        this.populateElement(coinData)
                    }
                } else {
                    // console.log('no data found.fetching from network...')
                    this.setData(coinID).then((resp) => {
                        // console.log("TCL: db_handler -> getData -> no data found->response is coinID:", resp)
                        this._db[this._objectStoreTitle]
                            .get(coinID).then(coinData => {
                                this.populateElement(coinData)
                            })
                    })
                }
            })
            //        this.addData(coinID)
    }

    //db.put is used -- overrides info in db.
    setData(coinID) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.coingecko.com/api/v3/coins/${coinID}`)
                .then(resp => resp.json())
                .then(coinData => {
                    coinData.timeStamp = Date.now();
                    //console.log('this in fetch', this._db)
                    resolve(this._db[this._objectStoreTitle]
                        .put(coinData, coinID.id))
                })
                .catch(err => reject(console.error('setData fetch error: ', err)))
        });
    }

    populateElement(coinData) {
        const elementID = `#collapse${coinData.id}`;
        if ($(elementID).find('.card-exists').length !== 0) {
            $('.card-exists').remove();
        }
        // console.log("TCL: db_handler -> populateElement -> elementID->rendering data to", elementID)
        $(elementID).append(more_info_render(coinData)),

            $(elementID).find('.loader').hide();
    }
}