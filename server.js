const express = require("express");
const notes = require("./data/notes");
const app = express();
const fileUpload = require("express-fileupload");
const cors = require("cors");
const razorpay  = require("./routes/razorpay")




// Apply CORS middleware
// app.use(cors({ origin: 'http://localhost:3000' }));
app.use(
    fileUpload({
        useTempFiles: true,
    })
    );
    app.use(cors())

app.use(express.json());
const userRoute = require("./routes/userRoute");
const noteRoute = require("./routes/noteRoute");

const dotenv = require("dotenv");
dotenv.config();
const connectDB = require("./db/conn");
connectDB();

// Enable CORS middleware
// app.use(function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });
app.get("/", (req, res) => {
    res.send("Hii...");
});
// app.get("/api/notes",(req,res)=>{
//     res.json(notes)
// });

app.use("/api/users", userRoute);
app.use("/api/notes", noteRoute);
app.use("/api/payment", razorpay);


const PORT = 1213;
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
});
