module.exports = {
    gameOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Number 1", callback_data: "1"}, {text: "Number 2", callback_data: "2"}, {
                    text: "Number 3",
                    callback_data: "3"
                },],
                [{text: "Number 4", callback_data: "4"}, {text: "Number 5", callback_data: "5"}, {
                    text: "Number 6",
                    callback_data: "6"
                },],
                [{text: "Number 7", callback_data: "7"}, {text: "Number 8", callback_data: "8"}, {
                    text: "Number 9",
                    callback_data: "9"
                },],
                [{text: "Number 0", callback_data: "0"}],
            ]
        })
    },

    againOptions: {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{text: "Play again", callback_data: "/again"}],
            ]
        })
    }
}