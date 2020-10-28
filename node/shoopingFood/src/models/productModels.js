const sql = require("./db");

// constructor
const Product = function(product) {
    this.name = product.name;
    this.price = product.price;
    this.description = product.description;
    this.amazonlink = product.amazonlink;
};

Product.create = (newProduct, result) => {
    sql.query("INSERT INTO product SET ?", newProduct, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created product: ", { id: res.insertId, ...newProduct });
        result(null, { id: res.insertId, ...newProduct });
    });
};

Product.findById = (productid, result) => {
    sql.query(`SELECT * FROM product WHERE productid = ${productid}`, (err, res) => {
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