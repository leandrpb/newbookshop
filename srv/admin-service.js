const cds = require('@sap/cds')

module.exports = cds.service.impl( srv => {

    const {OrderItems} = srv.entities ('sap.capire.newbookshop')

    srv.after (['READ', 'EDIT'], 'Orders', _calculateTotals)

    async function _calculateTotals (orders, req) {

        const ordersByID = Array.isArray(orders)
        ? orders.reduce((all,o) => { (all[o, ID] = o).total = 0; return all}, {})
        : { [orders.ID]: orders }

        return cds.transaction(req) .run (
            SELECT.from(OrderItems) .columns ('parent_ID', 'netAmount')
             .where ({ parent_ID: {in: Object.keys(ordersByID)} })
          ) .then (items =>
            items.forEach (item => ordersByID [item.parent_ID] .total += item.netAmount)
          )
    }

})