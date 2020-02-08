const ms = require('ms')
let interval;
module.exports.run = (client, msg, args, config) => {

    if (!args[0]) return msg.reply('you forgot to specify an interval to send the message at.')
    let time = ms(args[0])
    if(!time) return msg.reply('that was not a valid time!')
    let message = args.join(" ").slice(args[0].length)
    
    if(!interval) {
        interval = setInterval(function() { send(msg, message) }, time)
        msg.channel.send('starting')
        return;
    }

    clearInterval(interval)
    interval = null;
    msg.channel.send('Stopped annoying.')
    
}

function send(msg, message) {
    msg.channel.send(message)
}

module.exports.help = {
    name:"annoy",
    usage:"*annoy <interval> <message>",
    ownerOnly: true,
    group: "user",
    example:"*annoy 2s hello there",
}