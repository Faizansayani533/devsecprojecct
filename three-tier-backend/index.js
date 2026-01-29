const transactionService = require('./TransactionService');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const os = require('node:os');

const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// HEALTH CHECK
app.get('/health', (req, res) => {
    res.json("This is the health check");
});

// ADD TRANSACTION
app.post('/transaction', (req, res) => {
    try {
        const { amount, desc } = req.body;
        const success = transactionService.addTransaction(amount, desc);

        if (success === 200) {
            res.json({ message: 'Added transaction successfully' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Something went wrong', error: err.message });
    }
});

// GET ALL TRANSACTIONS
app.get('/transaction', (req, res) => {
    try {
        const transactionList = [];

        transactionService.getAllTransactions(function (results) {
            for (const row of results) {
                transactionList.push({
                    id: row.id,
                    amount: row.amount,
                    description: row.description
                });
            }
            res.status(200).json({ result: transactionList });
        });
    } catch (err) {
        res.status(500).json({ message: "Could not get transactions", error: err.message });
    }
});

// DELETE ALL
app.delete('/transaction', (req, res) => {
    try {
        transactionService.deleteAllTransactions(function () {
            res.status(200).json({ message: "All transactions deleted." });
        });
    } catch (err) {
        res.status(500).json({ message: "Delete failed", error: err.message });
    }
});

// DELETE BY ID
app.delete('/transaction/id', (req, res) => {
    try {
        const { id } = req.body;
        transactionService.deleteTransactionById(id, function () {
            res.status(200).json({ message: `Transaction ${id} deleted` });
        });
    } catch (err) {
        res.status(500).json({ message: "Delete by id failed", error: err.message });
    }
});

// GET BY ID
app.get('/transaction/id', (req, res) => {
    try {
        const { id } = req.body;
        transactionService.findTransactionById(id, function (result) {
            res.status(200).json(result[0]);
        });
    } catch (err) {
        res.status(500).json({ message: "Fetch failed", error: err.message });
    }
});

app.listen(port, () => {
    console.log(`AB3 backend app listening at http://localhost:${port}`);
});
