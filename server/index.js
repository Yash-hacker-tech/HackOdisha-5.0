const express = require('express');
const app = express();
const dotenv = require('dotenv');
const dbPromise = require('./db');

dotenv.config();

(async () => {
    try {
        const db = await dbPromise;
        console.log(`Connected to MySQL as thread ID ${db.threadId}`);
    } catch (err) {
        console.error("Server failed to start due to database connection error.");
        process.exit(1);
    }
})();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routers
const userRouter = require('./routes/userrouter.js');
const clubRouter = require('./routes/clubrouter.js');
const eventRouter = require('./routes/eventsrouter.js');
const eventParticipantRouter = require('./routes/event_participantrouter.js');
const colabRouter = require('./routes/colabrouter.js');

//routes
app.use('/users', userRouter);
app.use('/clubs', clubRouter);
app.use('/events', eventRouter);
app.use('/event-participants', eventParticipantRouter);
app.use('/collaborations', colabRouter);


app.listen(3000, () => console.log("Server running on port 3000"));