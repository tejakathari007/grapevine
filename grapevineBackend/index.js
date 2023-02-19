require("module-alias/register");
process.on("uncaughtException", function (err) {
  console.log("Caught exception: " + err);
});
require("dotenv").config();
var cron = require("node-cron");
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const corsOptions = require("./Config/corsConfig");
const { v4: uuidv4 } = require("uuid");
const { tiktoks, instagrams } = require("@services");
const socket = require("socket.io");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const multer = require("multer");

const {
  middleware: { verifyBearerToken },
} = require("@utils");
const upload = multer({ dest: "uploads/" });
require("dotenv").config();
const {
  Login,
  Posts,
  Likes,
  Comments,
  CommentLikes,
  FriendShip,
  ChatRoom,
  UserProfile,
  Chats,
  Notification,
  Activity,
  PaymentHistory,
} = new PrismaClient();

var winston = require("winston"),
  expressWinston = require("express-winston");
require("dotenv").config();
const passport = require("passport");
var session = require("express-session");
app.use(passport.initialize());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
if (process.env.NODE_ENV === "production") {
  app.use(
    expressWinston.logger({
      transports: [
        new winston.transports.File({ filename: "every_prod_request.log" }),
        new winston.transports.Console(),
      ],
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
      ),
      meta: true,
      msg: "HTTP {{req.method}} {{req.url}}",
      expressFormat: true,
      colorize: false,
      ignoreRoute: function (req, res) {
        return false;
      },
    })
  );
}
app.use(express.static(path.join(__dirname, "./_client_callback/build")));
app.use(express.json());

app.use(cors(corsOptions));

app.use("/api", require("./Api/api"));

app.get("/data", async (req, res) => {
  const user = await Login.findMany({
    include: {
      user: true,
    },
  });

  res.json(user);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./_client_callback/build", "index.html"));
});
app.get("/privacy-policy", (req, res) => {
  res.sendFile(path.join(__dirname, "./_client_callback/build", "index.html"));
});
app.get("/terms-of-service", (req, res) => {
  res.sendFile(path.join(__dirname, "./_client_callback/build", "index.html"));
});
app.get("/users", (req, res) => {
  res.sendFile(path.join(__dirname, "./_client_callback/build", "index.html"));
});

app.get("/user-profile/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "./_client_callback/build", "index.html"));
});

app.use("/tiktok", require("./Tiktok/index"));
app.use("/google", require("./Google/index"));
app.use("/instagram", require("./Instagram/index"));
app.use("/stripe", require("./Stripe/index"));

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, console.log("server running on", PORT));
const io = socket(server);
io.on("connection", (socket) => {
  console.log("connected");
  const uuid = socket.handshake.query.chatRoomid.toString();
  console.log("user connected in room ", uuid);
  socket.join(uuid);
  socket.on("messageSent", (data) => {
    console.log({
      from_user: data.user_id,
      content: data.content,
      room_uuid: uuid,
      uuid: uuidv4(),
    });
    Chats.create({
      data: {
        from_user: data.user_id,
        content: data.content,
        room_uuid: uuid,
        uuid: uuidv4(),
      },
    })
      .then((chat) => {
        io.to(uuid).emit("messageReceive", chat);
      })
      .catch((err) => {
        console.log(err);
      });
  });
});

cron.schedule("0 0 * * *", () => {
  tiktoks.updateTiktokTokenAndPost();
});
