const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models/index");
const multer = require("multer")

const { mongoose } = require("./models/index");

const userRoutes = require("./routes/user.routes");
const loginRoutes = require("./routes/login.routes");
const applicationRoutes = require("./routes/application.route");


const corsOptions = {
  origin: ["http://localhost:3000", "https://pie-technologies.com/login", "https://pie-technologies.com"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
};

app.get('/', (req, res)=>{
  res.send("Hello, world! PieTECH DEV");
})

app.use(cors(corsOptions));
app.use(express.json());
// app.use(multer);
const upload = multer();
app.use(upload.any());

app.use(userRoutes);
app.use(loginRoutes);
app.use(applicationRoutes);//applocation

const cvRoutes = require("./routes/cv.route");
app.use(cvRoutes);

mongoose.set("strictQuery", false);

require('dotenv').config();
const password = process.env.pietechDBUserpassword;
const dbName = process.env.pieTechDBName;
console.log(password , dbName)

db.mongoose
  .connect(
    //`mongodb+srv://${config.userName}:${config.password}@cluster1.qhcltxw.mongodb.net/test`,
    //`mongodb+srv://${userName}:${password}@cluster0.symtdxi.mongodb.net/${dbName}`,
    `mongodb+srv://pieTech-dev-fsl:${password}@pietechnologies.a57f8ub.mongodb.net/${dbName}`,
    {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      dbName: dbName,
    }
  )
  .then(() => console.log("connection to the database was successful"))
  .catch((err) => console.log("connection to the database failed", err));

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Server is runing on port ${PORT}`);
});
// app.listen(() => {
//   console.log(`Server is running`);
// });