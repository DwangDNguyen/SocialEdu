const io = require("socket.io")(8900, {
    cors: {
        origin: "http://localhost:3000",
    },
});
const io2 = require("socket.io")(8901, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let users = [];
let onlUsers = [];
const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};
const addUserNotifications = (username, socketId) => {
    !onlUsers.some((user) => user.username === username) &&
        onlUsers.push({ username, socketId });
};
const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};
const removeUserNotifications = (socketId) => {
    onlUsers = onlUsers.filter((user) => user.socketId !== socketId);
};
const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
const getUserNotifications = (username) => {
    return onlUsers?.find((user) => user.username === username);
};
io.on("connection", (socket) => {
    console.log("a user connected");

    // io.emit("welcome", "this is socket server");
    socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);

        io.to(user.socketId).emit("getMessage", {
            senderId,
            text,
        });
        // io.emit("new-message");
    });

    // socket.on("sendNotification", ({ senderId, receiverId, type }) => {
    //     const receiver = getUser(receiverId);
    //     console.log(users);
    //     io.to(receiver.socketId).emit("getNotification", {
    //         senderId,
    //         type,
    //     });
    // });
    // console.log(users);
    socket.on("disconnect", () => {
        console.log("user disconnected");
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});

io2.on("connection", (socket) => {
    console.log("a user notify connected");

    socket.on("addUserNotifications", (username) => {
        addUserNotifications(username, socket.id);
        console.log(onlUsers);
    });
    console.log(onlUsers);
    socket.on(
        "sendNotification",
        ({ senderName, avatarImg, receiverName, type }) => {
            const receiver = getUserNotifications(receiverName);
            io2.to(receiver.socketId).emit("getNotification", {
                senderName,
                avatarImg,
                type,
            });
            console.log(receiverName);
        }
    );

    socket.on("disconnect", () => {
        removeUserNotifications(socket.id);
    });
});
