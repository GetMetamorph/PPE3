const sql = require("./db");

// constructor
const User = function(user) {
    this.USR_Mail = user.USR_Mail;
    this.USR_Firstname = user.USR_Firstname;
    this.USR_Password = user.USR_Password;
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO T_User_USR SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        console.log("created user: ", { id: res.insertId, ...newUser });
        result(null, { id: res.insertId, ...newUser });
    });
};

User.findById = (id, result) => {
    sql.query(`SELECT USR_Id, USR_Firstname, USR_Mail, USR_Password, HSE_Id FROM T_User_USR WHERE USR_Id = ${id}`, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) {
            console.log("found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        // not found User with the id
        result({ kind: "not_found" }, null);
    });
};

User.Gethash = (username) => {
    return new Promise((resolve, reject) => {
        sql.query(`SELECT USR_Id, USR_Firstname, USR_Mail, USR_Password, HSE_Id FROM T_User_USR WHERE USR_Firstname = '${username}'`, (error, results, fields) => {
            resolve(results[0].USR_Password)
        });
    })
}

User.getAll = result => {
    sql.query("SELECT USR_Id, USR_Firstname, USR_Mail, USR_Password, HSE_Id FROM T_User_USR", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log("user: ", res);
        result(null, res);
    });
};

User.updateById = (id, user, result) => {
    sql.query(
        "UPDATE T_User_USR SET USR_Mail = ?, USR_Firstname = ?, USR_Password = ? WHERE USR_Id = ?", [user.email, user.username, user.password, id],
        (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(null, err);
                return;
            }

            if (res.affectedRows == 0) {
                // not found User with the id
                result({ kind: "not_found" }, null);
                return;
            }

            console.log("updated user: ", { id: id, ...user });
            result(null, { id: id, ...user });
        }
    );
};

User.remove = (id, result) => {
    sql.query("DELETE FROM user WHERE USR_Id = ?", id, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            // not found User with the id
            result({ kind: "not_found" }, null);
            return;
        }

        console.log("deleted user with id: ", id);
        result(null, res);
    });
};

User.removeAll = result => {
    sql.query("DELETE FROM user", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        console.log(`deleted ${res.affectedRows} user`);
        result(null, res);
    });
};

User.checkEmail = (email) => {
    return new Promise((resolve, reject) => {
        sql.query('SELECT COUNT(*) as "count" FROM T_User_USR WHERE USR_Mail = ?', [email], (error, results, fields) => {
            resolve(results[0].count)
        });
    })
}

module.exports = User;