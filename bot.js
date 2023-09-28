const axios = require("axios");
const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_TOKEN);

const start = async () => {
  bot.start((ctx) => {
    ctx.reply(`Привет`);
    setTimeout(() => {
      ctx.reply(`Введите своё имя`);
    }, 1000);
  });

  bot.on("message", async function (ctx) {
    let text = ctx.update.message.text.toLowerCase();

    const url = "http://localhost:5000/api/users";
    const res = await axios.get(url);

    const users = res.data;

    const result = [];

    for (const user of users) {
      result.push(user.name.toLowerCase());
    }

    const owner = result.find((b) => b === text);

    if (owner === text) {
      ctx.replyWithHTML(
        "Посмотри что я умею 👇",
        Markup.inlineKeyboard([
          [Markup.button.callback("Список команд", "btn_3")],
        ])
      );
      text = null;
      marker = "marker_0";
    }
    if (text && marker === "marker_0") {
      ctx.reply(`Вам надо зарегестрироваться`);
      setTimeout(() => {
        ctx.reply(`Введите своё имя`);
      }, 1000);
      text = null;
      marker = "marker_1";
    }
  });

  bot.action("btn_1", async (ctx) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=btc`;
    const response = await axios.get(url);
    const usd = (1 / response.data.usd.btc).toFixed(2);
    ctx.replyWithHTML(
      `На <b>1$</b> можно купить <b>${response.data.usd.btc}</b> Bitcoin`
    );
    ctx.replyWithHTML(`Стоимость <b>1</b> Bitcoin <b>${usd} $</b>`);
  });

  bot.action("btn_2", async (ctx) => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=usd&vs_currencies=Eth`;
    const response = await axios.get(url);
    const usd = (1 / response.data.usd.eth).toFixed(2);
    ctx.replyWithHTML(
      `На <b>1$</b> можно купить <b>${response.data.usd.eth}</b> Ethereum`
    );
    ctx.replyWithHTML(`Стоимость <b>1</b> Ethereum <b>${usd} $</b>`);
  });

  bot.action("btn_3", (ctx) => {
    ctx.replyWithHTML(
      "<b>Курсы крипты</b>",
      Markup.inlineKeyboard([
        [
          Markup.button.callback("Курс Ethereum", "btn_2"),
          Markup.button.callback("Курс Bitcoin", "btn_1"),
        ],
      ])
    );
  });

  bot.launch();
  process.once("SIGINT", () => bot.stop("SIGINT"));
  process.once("SIGTERM", () => bot.stop("SIGTERM"));
};

module.exports = start;
