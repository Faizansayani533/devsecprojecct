const dbcreds = require('./DbConfig');
const mysql = require('mysql');

const con = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
});

/* ✅ Proper DB connection */
con.connect((err) => {
    if (err) {
        console.error("❌ Database connection failed:", err.message);
    } else {
        console.log("✅ Connected to RDS MySQL");
    }
});

/* ✅ Add transaction */
function addTransaction(amount, desc) {
    const sql = "INSERT INTO transactions (amount, description) VALUES (?, ?)";
    con.query(sql, [amount, desc], (err) => {
        if (err) console.error("Insert error:", err.message);
    });
    return 200;
}

/* ✅ Get all transactions */
function getAllTransactions(callback) {
    const sql = "SELECT * FROM transactions";
    con.query(sql, (err, result) => {
        if (err) {
            console.error("Select error:", err.message);
            callback([]);
        } else {
            callback(result);
        }
    });
}

/* ✅ Delete all */
function deleteAllTransactions(callback) {
    const sql = "DELETE FROM transactions";
    con.query(sql, (err, result) => {
        if (err) console.error(err.message);
        callback(result);
    });
}

/* ✅ Find by id */
function findTransactionById(id, callback) {
    const sql = "SELECT * FROM transactions WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) console.error(err.message);
        callback(result);
    });
}

/* ✅ Delete by id */
function deleteTransactionById(id, callback) {
    const sql = "DELETE FROM transactions WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) console.error(err.message);
        callback(result);
    });
}

module.exports = {
    addTransaction,
    getAllTransactions,
    deleteAllTransactions,
    findTransactionById,
    deleteTransactionById
};
