const ListDAO = require("../datamodel/ListDao");

module.exports = class ListService {
    constructor(db) {
        this.dao = new ListDAO(db)
    }

    isValid(list) {
        list.shop = list.shop.trim()
        if (list.shop === "") return false
        if (list.date != null) {
            if (!(list.date instanceof Date)) {
                list.date = new Date(list.date)
            }
            if (isNaN(list.date.getTime())) return false
        }
        if (typeof list.archived !== 'boolean') return false

        return true
    }
}