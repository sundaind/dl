const db = require('quick.db');
const fs = require("fs");
var ms = require('parse-ms');

exports.run = async(client, message, args, color) => {
  if (message.channel.type == "dm") return;  
  
    let cooldown = 8.64e+7,
    amount = 200
  
  let lastdaily = await db.fetch(`lastDaily_${message.author.id}`)
  if (lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
        let timeObj = ms(cooldown - (Date.now() - lastdaily))
        let eh = require('../../../src/handle/cooldownAns.json');
        let ops = eh[Math.floor(Math.random() * eh.length)];
        message.channel.send(`**${message.author.username}**, ${ops} (Ratelimited)\n**Kamu bisa Mulung lagi dalam ${timeObj.hours} Jam, ${timeObj.minutes} Menit Dan ${timeObj.seconds} Detik**`)
    } else  {
        db.set(`lastDaily_${message.author.id}`, Date.now());        
          client.eco.AddToBalance(message.author.id, amount);
          message.reply(`Mulung Harian ${client.config.coin_icon}${amount} ${client.config.coin}`) 
  } 
}

exports.conf = {
    aliases: ["dailies", 'dly'],
    cooldown: "3"
}

exports.help = {
    name: 'daily',
    description: 'To get your daily everyday',
    usage: 'daily', 
    example: ['daily'] 
}
