import express from "express"
const app = express.Router();
import {addteacher , assignclass, assignsubject, deleteteacher, getteacher, showteacher, updateteacher} from "../controllers/teacher.controller.js"
import { authenticate } from "../middleware/AuthenticateUser.js";
app.get("/test", ()=>{
    console.log("testing teacher route");
    res.send("testing teacher admin route")
});

app.post("/add",authenticate, addteacher);
app.get("/show",authenticate, showteacher);
app.get("/get/:id", authenticate, getteacher);
app.post("/update/:id", authenticate, updateteacher);
app.post("/delete/:id", authenticate, deleteteacher);
app.post("/assignclass/:id", authenticate, assignclass);
app.post("/assignsubject/:id", authenticate, assignsubject);


export default app;