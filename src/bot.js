import {Client, Intents } from 'discord.js';
import cron from 'node-cron'
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

import dotenv from 'dotenv'
dotenv.config()

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const subjects = {
    AI: "Artificial Inteligence",
    AI_LAB: "Artificial Inteligence Lab",
    CD: "Compiler Design",
    CD_LAB: "Compiler Design Lab",
    DS: "Data Science",
    DS_LAB: "Data Science Lab",
    IS: "Information Security",
    LUNCH: "LUNCH",
    SE: "Software Engineering",
    SE_LAB: "Software Engineering Lab",
    NO_PERIOD: "No Period"
}

const tt = {
    9_10: {
        Monday: subjects.NO_PERIOD,
        Tuesday: subjects.CD,
        Wednesday: subjects.SE_LAB,
        Thursday: subjects.NO_PERIOD,
        Friday: subjects.SE
    },
    10_11: {
        Monday: subjects.AI,
        Tuesday: subjects.CD,
        Wednesday: subjects.SE_LAB,
        Thursday: subjects.CD_LAB,
        Friday: subjects.NO_PERIOD
    },
    11_12: {
        Monday: subjects.DS_LAB,
        Tuesday: subjects.AI,
        Wednesday: subjects.AI_LAB,
        Thursday: subjects.CD_LAB,
        Friday: subjects.NO_PERIOD
    },
    12_13: {
        Monday: subjects.DS_LAB,
        Tuesday: subjects.IS,
        Wednesday: subjects.AI_LAB,
        Thursday: subjects.NO_PERIOD,
        Friday: subjects.DS
    },
    13_14: {
        Monday: subjects.LUNCH,
        Tuesday: subjects.LUNCH,
        Wednesday: subjects.LUNCH,
        Thursday: subjects.LUNCH,
        Friday: subjects.LUNCH
    },
    14_15: {
        Monday: subjects.NO_PERIOD,
        Tuesday: subjects.DS_LAB,
        Wednesday: subjects.NO_PERIOD,
        Thursday: subjects.DS,
        Friday: subjects.CD
    },
    15_16: {
        Monday: subjects.NO_PERIOD,
        Tuesday: subjects.DS_LAB,
        Wednesday: subjects.IS,
        Thursday: subjects.CD,
        Friday: subjects.DS
    },
    16_17: {
        Monday: subjects.NO_PERIOD,
        Tuesday: subjects.NO_PERIOD,
        Wednesday: subjects.AI,
        Thursday: subjects.NO_PERIOD,
        Friday: subjects.NO_PERIOD
    }
}

function printTable(tt){
    console.log("--------------------------------------------------------------------------------------------------------------")
    console.log("Time\tMonday\t\tTuesday\t\tWednesday\tThursday\tFriday")
    console.log("--------------------------------------------------------------------------------------------------------------")
    for (const [key, value] of Object.entries(tt)) {
    //    console.log(`${key}`);
       let valuesarr = [key + " | "]
       for(const [key, value_] of Object.entries(value)){
           valuesarr += value_ +" | ";
        //    console.log(`${value_}`);
       }
       console.log(valuesarr);
    }
}
printTable(tt)

const rr = async(message)=> {
    cron.schedule('55 8-17 * * 1-5', () => {
        message.reply(`@everyone ${whichPeriod()} is going to start`)
        console.log('running');
    }, {
        scheduled: true,
        timezone: "Asia/India"
    });
}

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

function whichPeriod() {
    const d = new Date();
    let hour = d.getHours() + 1
    let day = weekday[d.getDay()];
    console.log(`${day} and ${hour}`)
    let period = "No Period"
    for (const [key, value] of Object.entries(tt)) {
            if(key.startsWith(hour)) {
            for(const [key, value_] of Object.entries(value)){
                if(key.startsWith(day))
                period = value_
            }
        }
    }
    return period
}

client.on('messageCreate', async (message) => {
    if(message.content == '~help'){
        message.reply('works')
        rr(message)
    }
    else if(message.content == '~period') {
        let now = whichPeriod()
        console.log(now)
        message.reply(now)
    }
})

client.login(process.env.DJS_TOKEN);