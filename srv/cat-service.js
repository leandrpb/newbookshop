/**
 * Implementation for CatalogService defined in ./cat-service.cds
 */
module.exports = (srv)=>{

    // Use reflection to get the csn definition of Books
    const {Books} = cds.entities

    //Add some discount if overstocked item
    srv.after ('READ', 'Books', (each)=>{
            if (each.stock > 15 ) each.title +=' -- 10% discount'
        })
    
    //Update stock field in Books on incoming invoices
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

    })
}