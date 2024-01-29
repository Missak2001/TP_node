const ItemDAO = require("../datamodel/ItemDAO");

module.exports = class ItemService {
    constructor(db) {
        this.dao = new ItemDAO(db)
    }

    isValid(item) {
        item.label = item.label.trim()
        if (item.label === "") return false
        if ((item.quantity != null) && (item.quantity < 0)) return false
        if (typeof item.checked !== 'boolean') return false
        if (!item.idList || typeof item.idList !== 'string' || item.idList.trim() === "") return false

        return true
    }

}