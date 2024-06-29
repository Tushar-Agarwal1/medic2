import express from "express";
import run from "../utility/api.js"
import sendMail from '../utility/sendMail.js';
import jwt from "jsonwebtoken";
import sendNotification from "../utility/sendNotification.js";
import Subscribe from "../Model/Subscribers.js"

const router = express.Router();


// router.post("/suitabilityAssesment", async (req, res) => {



//     try {
//         const prompt = req.body.msg;
//         console.log(req.body);

//         const output = await run(prompt);
//         res.send(output);
//     } catch (error) {
//         res.send("Unappropriate question violates our policy")

//     }
// })

// router.post("/Subscribe", (req, res) => {

//     const email = req.body.email;
//     console.log(email);
//     const token = jwt.sign({ email }, 'shhhhh');
//     sendMail(email, "Farmer 's Friend", "click on the link to receive updates and news from Farmer 's Friend", token);
//     res.status(200).send({ msg: "okkk" });


// })
// router.get("/:token", (req, res) => {

//     const token = req.params;

//     //console.log(token);
//     const decoded = jwt.verify(req.params.token, 'shhhhh');
//     const email = decoded.email;

//     //console.log(decoded.email);
//     Subscribe.create({ email });


//     res.status(200).send("done");


// })

// router.post("/PushMails", async (req, res) => {
//     const sub = req.body.sub;
//     const msg = req.body.msg;
//     const token = req.body.token;
//     const email = await Subscribe.find({});
//     console.log(email);
//     email.forEach(element => {
//         sendNotification(element.email, sub, msg, token)


//     });
//     res.send("workin");





// })



export default router;