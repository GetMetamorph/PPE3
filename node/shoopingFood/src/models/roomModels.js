const sql = require("./db");

// constructor
const Room = function(room) {
    this.ROM_Name = room.name;
    this.HSE_Id = room.houseid;
    this.ROM_Category = room.category;

};

Room.create = (newRoom, result) => {
    sql.query("INSERT INTO T_Room_ROM SET ?", newRoom, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created room: ", { id: res.insertId, ...newRoom });
        result(null, { id: res.insertId, ...newRoom });
    });
};

Room.findById = (roomid, result) => {
    sql.query(`SELECT * FROM t_room_rom WHERE ROM_Id = ${roomid}`, (err, res) => {
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

Room.getAll = result => {
    sql.query("SELECT * FROM t_room_rom", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("room: ", res);
        result(null, res);
    });
};

Room.getAllByHouse = (Houseid, result) => {
    sql.query(`SELECT * FROM t_room_rom Where HSE_Id = ${Houseid}`, (err, res) => {

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

Room.updateById = (id, room, result) => {
    sql.query(
        "UPDATE t_room_rom SET name = ?, houseid = ?, category = ? WHERE ROM_Id = ?", [room.name, room.houseid, room.category, id],
        (err, res) => {
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

            console.log("updated room: ", { id: id, ...room });
            result(null, { id: id, ...room });
        }
    );
};

Room.remove = (id, result) => {
    sql.query("DELETE FROM t_room_rom WHERE ROM_Id = ?", id, (err, res) => {
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

        console.log("deleted room with id: ", id);
        result(null, res);
    });
};

Room.removeAll = result => {
    sql.query("DELETE FROM t_room_rom", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} room`);
        result(null, res);
    });
};

module.exports = Room;