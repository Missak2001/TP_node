const BaseDAO = require('./basedao')

module.exports = class ItemDAO extends BaseDAO{
    constructor(db) {
        super(db, "item")
    }
    insert(item) {
        return this.db.query("INSERT INTO item(label,quantity,checked, idList) VALUES ($1,$2,$3,$4)",
            [item.label, item.quantity, item.checked, item.idList])
    }

    getAll() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM item ORDER BY label,quantity")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    update(item) {
        return this.db.query("UPDATE item SET label=$2,quantity=$3,checked=$4 WHERE id=$1",
            [item.id, item.label, item.quantity, item.checked])
    }

}