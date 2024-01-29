const Item = require("./Item");

module.exports = (itemService) => {
    return new Promise(async (resolve, reject) => {
        try {
            await itemService.dao.db.query("CREATE TABLE IF NOT EXISTS item (id SERIAL PRIMARY KEY, label VARCHAR(255) NOT NULL, quantity INTEGER NOT NULL, checked BOOLEAN NOT NULL, idList INTEGER NOT NULL)")
            .then(_=>{resolve()});
            for (let i = 0; i < 5; i++) {
                await itemService.dao.insert(new Item("label" + i, i, true, i));
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
