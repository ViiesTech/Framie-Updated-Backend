const http = require('http');
const express = require('express');
const path = require("path");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3040;
const connectDB = require('./db/config')

app.use(cors());

app.get('/', (req, res) =>{
    res.send('Api Is Working')
});

app.use("/",
    express.static( path.resolve(__dirname, "./public/service/"))
);

app.use("/",
    express.static( path.resolve(__dirname, "./public/businessProfile/"))
);

app.use("/",
    express.static( path.resolve(__dirname, "./public/employee/"))
);

app.use("/",
    express.static( path.resolve(__dirname, "./public/admin/"))
);

app.use("/",
    express.static( path.resolve(__dirname, "./public/subService/"))
);

app.use(express.json());

app.use("/api", require("./routes/admin"));
app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/reviews"));

const start = () => {
    try {
        connectDB();
        server.listen(PORT, ()=> {
            console.log(`Server Is Running on Port: ${PORT}`);
        })
    } catch (error) {
        console.log("Error :", error);
    }
};

start();