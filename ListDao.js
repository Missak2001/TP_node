const BaseDAO = require('./basedao')

module.exports = class ListDAO extends BaseDAO{
    constructor(db) {
        super(db, "list")
    }
    insertlist(list) {
        return this.db.query("INSERT INTO list(shop,date,archived) VALUES ($1,$2,$3)",
            [list.shop, list.date, list.archived])
    }
    getAllList() {
        return new Promise((resolve, reject) =>
            this.db.query("SELECT * FROM list ORDER BY shop,date")
                .then(res => resolve(res.rows))
                .catch(e => reject(e)))
    }

    update(list) {
        return this.db.query("UPDATE list SET shop=$2,date=$3,archived=$4 WHERE id=$1",
            [list.id, list.shop, list.date, list.archived])
    }

}