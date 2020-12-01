const sql = require("./db");

// constructor
const Product = function(product) {
    this.PDC_Name = product.PDC_Name;
    this.PDC_Price = product.PDC_Price;
    this.PDC_Description = product.PDC_Description;
    this.PDC_Link = product.PDC_Link;
};

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO t_product_PDC SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created product: ", {...newProduct });
        result(null, {...newProduct });
    });
};
Product.findByName = (productName, result) => {
    sql.query(`SELECT * FROM t_product_pdc WHERE PDC_Name = '${productName}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found room: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Room with the id
        result({ kind: "not_found" }, null);
    });
};
Product.findById = (productid, result) => {
    sql.query(`SELECT * FROM t_product_pdc WHERE PDC_Id = ${productid}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found product: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Product with the id
        result({ kind: "not_found" }, null);
    });
};

Product.findTotalById = (productid, idRoom, result) => {
    sql.query(`SELECT (SUM(pdc.PDC_Price * stk.STK_Qty)) AS Total FROM t_stock_stk AS stk INNER JOIN t_product_pdc AS pdc ON stk.PDC_Id = pdc.PDC_Id  WHERE stk.ROM_Id = ${idRoom} `, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found product: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found Product with the id
        result({ kind: "not_found" }, null);
    });
};

Product.getAll = result => {
    sql.query("SELECT * FROM product", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("product: ", res);
        result(null, res);
    });
};

Product.getAllByHouse = (Houseid, result) => {
    sql.query(`SELECT PDC_Name, PDC_Description, PDC_Link, PDC_Price, stk.STK_Qty, ROM_Name FROM t_product_pdc AS pdc INNER JOIN t_stock_stk AS stk ON pdc.PDC_Id = stk.PDC_Id INNER JOIN t_room_rom AS rom ON stk.ROM_Id = rom.ROM_Id WHERE rom.HSE_Id = ${Houseid}`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Room with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    })
};

Product.getAllByRoom = (idRoom, result) => {
    sql.query(`SELECT PDC.PDC_Name, PDC.PDC_Price, PDC.PDC_Link, PDC.PDC_Id, stk.STK_Qty, stk.ROM_Id  FROM t_product_pdc AS PDC INNER JOIN t_stock_stk AS stk ON pdc.PDC_Id = stk.PDC_Id WHERE stk.ROM_Id = ${idRoom}`, (err, res) => {

        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Room with the id
            result({ kind: "not_found" }, null);
            return;
        }

        result(null, res);
    })
};

Product.updateById = (id, product, result) => {
    sql.query(
        "UPDATE product SET name = ?, price = ?, description = ?, amazonlink = ? WHERE productid = ?", [product.name, product.price, product.description, product.amazonlink, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Product with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated product: ", { id: id, ...product });
            result(null, { id: id, ...product });
        }
    );
};
Product.updateQty = (Qty, PDC_Id, ROM_Id, result) => {
    console.log(Qty)
    sql.query(
        "UPDATE t_stock_stk SET STK_Qty = ? WHERE PDC_Id = ? AND ROM_Id = ?", [Qty, PDC_Id, ROM_Id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found Product with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated product: ");
            result(null);
        }
    );
};
Product.remove = (id, result) => {
    sql.query("DELETE FROM product WHERE productid = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Product with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted product with id: ", id);
        result(null, res);
    });
};
Product.removeInRoom = (id, room, result) => {
    sql.query("DELETE FROM t_Stock_stk WHERE PDC_Id = ? AND ROM_Id = ?", [id, room], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found Product with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted product with id: ", id);
        result(null, res);
    });
};
Product.removeAll = result => {
    sql.query("DELETE FROM product", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} product`);
        result(null, res);
    });
};

module.exports = Product;