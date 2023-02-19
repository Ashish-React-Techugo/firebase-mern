
const Express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const cors = require("cors");

const serviceAccount = require("./firebase.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const tokens = [];

const app = new Express();
const router = Express.Router();
app.use(cors());
app.use(bodyParser.json());
app.use("/", router);

app.listen(8000, () => {
    console.log(`Server started on port 3000`);
});

router.post("/register", (req, res) => {
    const found = tokens.find(element => element == req.body.token);
    if (!found) {
        tokens.push(req.body.token);
    }
    res.status(200).json({ message: "Successfully registered FCM Token!" });
});

router.post("/notifications", async (req, res) => {
    try {
        const { title, body, imageUrl } = req.body;
        await admin.messaging().sendMulticast({
            tokens,
            notification: {
                title,
                body,
                imageUrl,
            },
        });
        res.status(200).json({ message: "Successfully sent notifications!" });
    } catch (err) {
        res
            .status(err.status || 500)
            .json({ message: err.message || "Something went wrong!" });
    }
});