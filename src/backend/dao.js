const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const MAX_CONNECTION_ATTEMPTS = 5;
const RECONNECTION_TIMEOUT = 5000;

let connectionAttempts = 1;

const DAO = {
    connect() {
        console.log('Trying to connect. Connection state: ', mongoose.connection.readyState);

        if (mongoose.connection.readyState === 1 || mongoose.connection.readyState === 2) {
            return;
        }

        mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(() => {
            console.log('Successfuly connected to DB.');
        }).catch((error) => {
            console.log('Failed to connect to DB.', error);

            if (connectionAttempts < MAX_CONNECTION_ATTEMPTS) {
                setTimeout(this.connect, RECONNECTION_TIMEOUT * connectionAttempts);
                connectionAttempts++;
            }
        });
    }
};

module.exports = DAO;