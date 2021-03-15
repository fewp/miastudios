import { LOGO_EMOJI } from "../assets/Emojis";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";

module.exports = {
  name: "close",
  alias: "Ticket Closure",
  description: "Closes a ticket channel",
  permissionRequired: ["MANAGER", "TICKETOWNER"],
  argumentsSchema: null,
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, _args: string): Promise<FunctionResponse> {
    const filter = (m: any) => m.content.length > 0;

    const closureEmbed = await buildEmbed(
      `${LOGO_EMOJI.text} Closing the Ticket`,
      "This ticket channel will be closed in **20 seconds**, type **anything** to cancel its closure.",
      null,
      this.alias,
      true
    );

    await msg.channel.send(closureEmbed);

    const closureCompleted = new Promise(async (resolve, _reject) => {
      await msg.channel
        .awaitMessages(filter, { max: 1, time: 20000, errors: ["time"] })
        .then(async () => {
          const closureCancelledEmbed = buildEmbed(
            `${LOGO_EMOJI.text} Ticket closure cancelled`,
            "The channel closure was cancelled, type `-close` to try again.",
            null,
            this.alias,
            true
          );
          await msg.channel.send(closureCancelledEmbed);
          resolve(false);
        })

        .catch(() => {
          msg.channel.delete();
          resolve(true);
        });
    });

    const result = await closureCompleted.then(
      (value): FunctionResponse => {
        switch (value) {
          case true:
            return {
              status: true,
              message: null,
            };
        }
        return {
          status: false,
          message: ["Closure cancelled"],
        };
      }
    );

    return result;
  },
};
