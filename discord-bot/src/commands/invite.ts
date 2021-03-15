import { FunctionResponse } from "../types";

module.exports = {
  name: "invite",
  alias: "Ticket Invitation",
  description: "Invites a member to the ticket",
  permissionRequired: ["MANAGER", "TICKETOWNER"],
  argumentsSchema: ["<@User>"],
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, args: string): Promise<FunctionResponse> {
    //    {
    //     channel.updateOverwrite(user, {VIEW_CHANNEL: true, SEND_MESSAGES:true, READ_MESSAGE_HISTORY:true} );

    //     const success = new Discord.MessageEmbed()
    //         .setColor(style.color1)
    //         .setDescription(`<@${user.id}> was invited.`)
    //         .setTimestamp()
    //         .setFooter('\u200b', `${style.logo}`);
    //     channel.send(success).then((m) => {m.delete({ timeout: 10000 });});;
    //     return;
    // }

    const user = msg.guild.members.get(args.replace(/[^a-zA-Z0-9]/g, ""));

    await msg.channel.updateOverwrite(user.id, {
      VIEW_CHANNEL: true,
      SEND_MESSAGES: true,
      READ_MESSAGE_HISTORY: true,
    });

    return {
      status: true,
      message: null,
    };
    // const closureEmbed = await buildEmbed(
    //   `${LOGO_EMOJI.text} Closing the Ticket`,
    //   "This ticket channel will be closed in **20 seconds**, type **anything** to cancel its closure.",
    //   null,
    //   this.alias,
    //   true
    // );

    // await msg.channel.send(closureEmbed);

    // const closureCompleted = new Promise(async (resolve, _reject) => {
    //   await msg.channel
    //     .awaitMessages(filter, { max: 1, time: 20000, errors: ["time"] })
    //     .then(async () => {
    //       const closureCancelledEmbed = buildEmbed(
    //         `${LOGO_EMOJI.text} Ticket closure cancelled`,
    //         "The channel closure was cancelled, type `-close` to try again.",
    //         null,
    //         this.alias,
    //         true
    //       );
    //       await msg.channel.send(closureCancelledEmbed);
    //       resolve(false);
    //     })

    //     .catch(() => {
    //       msg.channel.delete();
    //       resolve(true);
    //     });
    // });

    // const result = await closureCompleted.then(
    //   (value): FunctionResponse => {
    //     switch (value) {
    //       case true:
    //         return {
    //           status: true,
    //           message: null,
    //         };
    //     }
    //     return {
    //       status: false,
    //       message: ["Closure cancelled"],
    //     };
    //   }
    // );

    // return result;
  },
};
