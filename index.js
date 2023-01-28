const TelegramApi = require("node-telegram-bot-api");
const {gameOptions, againOptions} = require("./options");
require("dotenv").config();

const sequelize = require("./database");
const UserModel = require("./models");


const token = process.env.token;

const bot = new TelegramApi(token, {polling: true});
const chats = {};

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "I'll pick a number 0 to 9.");
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, "Guess it!", gameOptions);
};


const start = async () => {

    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error(`Unable to connect to the database: ${error}`, error);
    }

    bot.setMyCommands([
        {command: "/start", description: "Hello my friend.",},
        {command: "/info", description: "Get information about user.",},
        {command: "/game", description: "Guess a number 0 to 9.",},
    ])

    bot.on("message", async msg => {

        const text = msg.text;
        const chatId = msg.chat.id;

        try {
            if (text === "/start") {
                await UserModel.sync({chatId});
                await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/039/535/0395358a-70e2-437f-9459-4101b904ede5/192/1.webp");
                return bot.sendMessage(chatId, "You're welcome.");
            }
            if (text === "/info") {
                const user = await UserModel.findOne({where: {chatId: String( chatId ) }});
                await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/039/535/0395358a-70e2-437f-9459-4101b904ede5/192/4.webp");
                return bot.sendMessage(chatId, `Your name is ${msg.from.first_name ? msg.from.first_name : ""} ${msg.from.last_name ? msg.from.last_name : ""}. В игре у тебя правильных ответов ${user.right}, а неправильных ${user.wrong}.`);
            }
            if (text === "/game") {
                return startGame(chatId);
            }
            return bot.sendMessage(chatId, "I don't understand you.");
        } catch (e) {
            return bot.sendMessage(chatId, `Something wrong in bot_on.message: ${e}.`,e);
        }
    })

    bot.on("callback_query", async msg => {

        const data = msg.data;
        const chatId = msg.message.chat.id;

            if (data === "/again") {
                return startGame(chatId)
            }

        try{
            const user = await UserModel.findOne({where: {chatId: String( chatId ) }});
            await bot.sendMessage(chatId, `You chose the number ${data}.`);

            if ( data == chats[chatId] ) {
                await bot.sendSticker(chatId,"https://tlgrm.eu/_/stickers/039/535/0395358a-70e2-437f-9459-4101b904ede5/192/3.webp");
                await bot.sendMessage(chatId, `Congratulations! You guessed the number ${chats[chatId]}.`, againOptions);
                user.right += 1;
            } else {
                await bot.sendSticker(chatId,"https://tlgrm.eu/_/stickers/039/535/0395358a-70e2-437f-9459-4101b904ede5/192/11.webp");
                await bot.sendMessage(chatId, `You didn't guess the number. Bot guessed the number ${chats[chatId]}`, againOptions);
                user.wrong += 1;
            }
            await user.save();
        } catch (e) {
            console.log(`Something wrong in callback_query: ${e}`,e)
        }

    })
}

start();