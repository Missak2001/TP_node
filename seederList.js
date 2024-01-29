const List = require("./List");

module.exports = (listService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await listService.dao.db.query("CREATE TABLE IF NOT EXISTS list (id SERIAL PRIMARY KEY, shop VARCHAR(255) NOT NULL, date DATE NOT NULL, archived BOOLEAN NOT NULL)")
                .then(_=>{resolve()});
            for (let i = 0; i < 5; i++) {
                let date = new Date(+(new Date()) - Math.floor(Math.random() * 10000000000))
                await listService.dao.insertlist(new List("shop" + i,date , true));
            }
            resolve()
        } catch (e) {
            if (e.code === "42P07") { // TABLE ALREADY EXISTS
                resolve();
            } else {
                reject(e);
            }
        }
    })
}
