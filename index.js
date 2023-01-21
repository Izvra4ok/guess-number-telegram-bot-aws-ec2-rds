const TelegramApi = require("node-telegram-bot-api")
const {gameOptions, againOptions} = require("./options")

const token = ""

const bot = new TelegramApi(token, {polling: true})

const chats = {};

const startGame = async (chatId) => {
    await bot.sendMessage(chatId, "I'll pick a number 0 to 9.")
    const randomNumber = Math.floor(Math.random() * 10);
    chats[chatId] = randomNumber;
    await bot.sendMessage(chatId, "Guess it!", gameOptions)
}


const start = () => {

    bot.setMyCommands([
        {command: "/start", description: "Hello my friend.",},
        {command: "/info", description: "Get information about user.",},
        {command: "/game", description: "Guess a number 0 to 9.",},
    ])

    bot.on("message", async msg => {

        const text = msg.text;
        const chatId = msg.chat.id

        if (text === "/start") {
            await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/039/535/0395358a-70e2-437f-9459-4101b904ede5/192/1.webp")
            return bot.sendMessage(chatId, "You're welcome.")
        }

        if (text === "/info") {
            await bot.sendSticker(chatId, "https://tlgrm.eu/_/stickers/039/535/0395358a-70e2-437f-9459-4101b904ede5/192/4.webp")
            return bot.sendMessage(chatId, `Your name is ${msg.from.first_name} ${msg.from.last_name}.`)
        }

        if (text === "/game") {
            return startGame(chatId)
        }
        return bot.sendMessage(chatId, "I don't understand you.");
    })

    bot.on("callback_query", async msg => {
        const data = msg.data
        const chatId = msg.message.chat.id

        if (data === "/again") {
            return startGame(chatId)
        }

        await bot.sendMessage(chatId, `You chose the number ${data}.`)

        if (Number(data) === Number(chats[chatId])) {
            return bot.sendMessage(chatId, `Congratulations! You guessed the number ${chats[chatId]}.`, againOptions)
        } else {
            return bot.sendMessage(chatId, `You didn't guess the number. Bot guessed the number ${chats[chatId]}`, againOptions)
        }
    })
}

start()