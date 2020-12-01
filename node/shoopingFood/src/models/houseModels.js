const sql = require("./db");

// constructor
const House = function(house) {
    this.HSE_Name = house.HSE_Name;
    this.HSE_Address = house.HSE_Address;

};

House.create = (newHouse, result) => {
    sql.query("INSERT INTO t_house_hse SET ?", newHouse, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;

        }

        console.log("created product: ", { id: res.insertId, ...newHouse });
        result(null, { id: res.insertId, ...newHouse });
    });
};

House.findId = (housename, houseaddresse, result) => {
    sql.query(`SELECT * FROM t_house_hse WHERE HSE_Name = '${housename}' AND HSE_Address = '${houseaddresse}'`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found house: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found House with the id
        result({ kind: "not_found" }, null);
    });
};

House.getAll = result => {
    sql.query("SELECT * FROM house", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("house: ", res);
        result(null, res);
    });
};

House.updateById = (id, house, result) => {
    sql.query(
        "UPDATE house SET name = ?, adresse = ? WHERE houseid = ?", [house.name, house.adresse, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found House with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated house: ", { id: id, ...house });
            result(null, { id: id, ...house });
        }
    );
};

House.remove = (id, result) => {
    sql.query("DELETE FROM house WHERE houseid = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found House with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted house with id: ", id);
        result(null, res);
    });
};

House.removeAll = result => {
    sql.query("DELETE FROM house", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} house`);
        result(null, res);
    });
};

module.exports = House;