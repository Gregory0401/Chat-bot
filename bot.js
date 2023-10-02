const axios = require("axios");
const { Telegraf, Markup } = require("telegraf");

const API_KEY_BOT = process.env;
const bot = new Telegraf(API_KEY_BOT, { polling: true });

bot.start((ctx) => {
  ctx.reply(`Привет`);
  setTimeout(() => {
    ctx.reply(`Введите своё имя`);
  }, 1000);
});

let marker = 1;

bot.on("message", async function (ctx) {
  const text = ctx.update.message.text.toLowerCase();
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
  }
  if (owner !== text && marker === 1) {
    ctx.reply(`Вам надо зарегестрироваться`);
    setTimeout(() => {
      ctx.replyWithHTML("Введите своe имя для регистрации");
    }, 1000);
    setTimeout(() => {
      marker = 2;
    }, 1500);
  }
  if (owner !== text && marker === 2) {
    ctx.reply(`Введите свой email`);
    const dataName = { name: text };
    data = { ...dataName };
    setTimeout(() => {
      marker = 3;
    }, 1000);
  }
  if (owner !== text && marker === 3) {
    ctx.reply(`Введите свой пароль`);
    const dataEmail = { email: text };
    data = { ...data, ...dataEmail };
    setTimeout(() => {
      marker = 4;
    }, 1000);
  }
  if (owner !== text && marker === 4) {
    data.password = text;
    const dataPas = { password: text };
    data = { ...data, ...dataPas };
    await axios.post(url, data);
    ctx.reply(`Поздравляем`);
    setTimeout(() => {
      ctx.replyWithHTML(
        "Посмотри что я умею 👇",
        Markup.inlineKeyboard([
          [Markup.button.callback("Список команд", "btn_3")],
        ])
      );
      marker = 5;
    }, 1000);
  }
  if (owner !== text && marker === 5) {
    ctx.reply(`Я не понимаю`);
    setTimeout(() => {}, 1000);
    marker = 1;
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

module.exports = start;
