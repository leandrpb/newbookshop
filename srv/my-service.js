/**
 * Implementation for CatalogService defined in ./cat-service.cds
 */
const cds = require('@sap/cds')
const {Books} = cds.entities

module.exports = (srv)=>{

    // Use reflection to get the csn definition of Books


    //Add some discount if overstocked item
    srv.after ('READ', 'Books', (each)=>{
            if (each.stock > 15 ) each.title +=' -- 10% discount'
        })
    
    //Update stock field in Books on incoming invoices
    srv.before('CREATE', 'Orders', _reduceStock)
    /**
    srv.before('CREATE', 'Orders', async (req)=>{

        const tx = cds.transaction(req), order = req.data;

        if (order.Items) {

            const affectedRows = await tx.run(order.Items.map(item =>
                    UPDATE(Books) .where({ID:item.book_ID})
                                  .and(`stock >= `, item.amount)
                                  .set(`stock -= `, item.amount)
                )
            )

            if (affectedRows.some(row => !row)) req.error(409, 'Sold out, sorry!')
        }

    })*/
    srv.before('READ', (req) => {
        console.debug('>>>', req.method, req.target.name);
        //req.error('Boo');
        console.debug('Error');
    })
}

async function _reduceStock(req) {

    const { Items : orderItems } = req.data

    return cds.transaction(req) .run (()=> orderItems.map (item => 
        UPDATE (Books)
            .set ('stock -=', item.amount)
            .where ('ID =', item.book_ID) .and ('stock >=', item.amount)
        ))
        
        .then (all => all.array.forEach ((affectedRows,i) => {

               if (affectedRows === 0) {
                req.error (409, `${orderItems[i].amount} exceeds stock for book #${orderItems[i].book_ID}`)
               }

            }
        ))
}
