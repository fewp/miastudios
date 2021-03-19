import { Message, User } from "discord.js";
import { REVIEWS_CHANNEL } from "../assets/Channels";
import { REVIEW_FINISH_EMBED, TIME_LIMIT_EMBED } from "../assets/Embeds";
import {
  ARROWRIGHT_EMOJI,
  CHECK_EMOJI,
  CROSS_EMOJI,
  FIVE_EMOJI,
  FOUR_EMOJI,
  LOGO_EMOJI,
  ONE_EMOJI,
  THREE_EMOJI,
  TWO_EMOJI,
} from "../assets/Emojis";
import { createReview } from "../db/resolvers/review";
import { FunctionResponse } from "../types";
import buildEmbed from "../utils/buildEmbed";
import getConfirmation from "../utils/getConfirmation";
import getRating from "../utils/getRating";

module.exports = {
  name: "review",
  alias: "Ticket review",
  description: "Starts the reviewing process",
  permissionRequired: ["MANAGER"],
  argumentsSchema: ["<@User>"],
  isMultiWord: false, // if the arguments need to be separated by ""
  async run(msg: any, args: string): Promise<FunctionResponse> {
    const reviewerId: string = args.replace(/[^a-zA-Z0-9]/g, "");
    const managerId: string = msg.author.id;
    let errorMessage: string = null;

    // emoji reactions in order (1 to 5)
    const emojis: string[] = [
      ONE_EMOJI.id,
      TWO_EMOJI.id,
      THREE_EMOJI.id,
      FOUR_EMOJI.id,
      FIVE_EMOJI.id,
    ];

    // emojis used for confirmation (manager and user)
    const confirmationEmojis: string[] = [CHECK_EMOJI.id, CROSS_EMOJI.id];

    // initializing variables
    let managerRating: any[] = ["", 0];
    let buildersRating: any[] = ["", 0];
    let userWantsToLeaveAMessage: boolean = false;
    let reviewMessage: string = null;

    // review start and manager rating embed
    const managerRatingEmbed = buildEmbed(
      `${LOGO_EMOJI.text} New review`,
      `${ARROWRIGHT_EMOJI.text} React accordingly to rate the **manager** (<@${managerId}>).\n\n${ONE_EMOJI.text} being extremely unsatisfied and ${FIVE_EMOJI.text} being extremely satisfied.\n`,
      null,
      this.alias,
      true
    );

    const timeLimitEmbed = buildEmbed.apply(this, TIME_LIMIT_EMBED);

    // filter for the reactions
    // initializing it here since it will be used in every collector
    const filter = (reaction: any, user: User) =>
      !user.bot && // filtering bot's own reactions
      user.id == reviewerId && // making sure it's the reviewer's reaction and not someone else's
      emojis.includes(reaction.emoji.id); // making sure it's one of the numbers and not any other emoji

    const managerConfirmationFilter = (reaction: any, user: User) =>
      !user.bot && // filtering bot's own reactions
      user.id == managerId && // making sure it's the reviewer's reaction and not someone else's
      confirmationEmojis.includes(reaction.emoji.id); // making sure it's one of the numbers and not any other emoji

    // sending the first embed (manager's rating)
    await msg.channel
      .send(managerRatingEmbed)
      .then(async (managerRatingEmbedMessage: Message) => {
        // reacting with the 5 emojis so the reviewer can rate the manager
        emojis.forEach(async (emoji: string) => {
          await managerRatingEmbedMessage.react(emoji);
        });

        // reaction collector - lasts for 10 minutes
        const managerRatingCollector = managerRatingEmbedMessage.createReactionCollector(
          filter,
          {
            max: 1, // only one reaction
            time: parseInt(process.env.EXPIRY_TIME), // time limit
          }
        );

        // whenever a reaction is collected
        managerRatingCollector.on(
          "collect",
          async (managerRatingReaction: any) => {
            // getting the rating for the manager
            managerRating = getRating(managerRatingReaction.emoji.id);

            // sending confirmation to the user and manager
            const managerRatingConfirmationEmbed = buildEmbed(
              `${LOGO_EMOJI.text} Rating confirmation`,
              `${ARROWRIGHT_EMOJI.text} Manager <@${managerId}> - ${managerRating[0]}`,
              null,
              this.alias,
              true
            );

            msg.channel.send(managerRatingConfirmationEmbed);
          }
        );

        // will run when the manager's rating is collected
        managerRatingCollector.on("end", async (_: any, reason: string) => {
          // if no reactions were collected in the time limit
          if (reason === "time") {
            msg.channel.send(timeLimitEmbed);
            errorMessage = "time";
            return;
          }

          // builders' rating embed
          const buildersRatingEmbed = buildEmbed(
            `${LOGO_EMOJI.text} New review`,
            `${ARROWRIGHT_EMOJI.text} React accordingly to rate the **builders**.\n\n${ONE_EMOJI.text} being extremely unsatisfied and ${FIVE_EMOJI.text} being extremely satisfied.\n`,
            null,
            this.alias,
            true
          );

          await msg.channel
            .send(buildersRatingEmbed)
            .then(async (buildersRatingEmbedMessage: Message) => {
              // reacting with the five numbers again so the user can rate the builders
              emojis.forEach(async (emoji: string) => {
                await buildersRatingEmbedMessage.react(emoji);
              });

              // collector for the builders' rating
              const buildersRatingCollector = buildersRatingEmbedMessage.createReactionCollector(
                filter,
                {
                  max: 1, // only one reaction
                  time: parseInt(process.env.EXPIRY_TIME), // time limit
                }
              );

              // whenever a reaction is collected
              buildersRatingCollector.on("collect", async (reaction: any) => {
                // getting the rating for the manager
                buildersRating = getRating(reaction.emoji.id);

                // sending confirmation to the user and manager
                const buildersRatingConfirmationEmbed = buildEmbed(
                  `${LOGO_EMOJI.text} Rating confirmation`,
                  `${ARROWRIGHT_EMOJI.text} Builders - ${buildersRating[0]}`,
                  null,
                  this.alias,
                  true
                );

                msg.channel.send(buildersRatingConfirmationEmbed);
              });

              buildersRatingCollector.on(
                "end",
                async (_: any, reason: string) => {
                  // if no reactions were collected in the time limit
                  if (reason === "time") {
                    msg.channel.send(timeLimitEmbed);
                    errorMessage = "time";
                    return;
                  }

                  // question embed
                  const userWantsReviewMessageEmbed = buildEmbed(
                    `${LOGO_EMOJI.text} New review`,
                    `${ARROWRIGHT_EMOJI.text} Would you like to leave a message in your review?`,
                    null,
                    this.alias,
                    true
                  );

                  // filter for user confirmation
                  const userConfirmationFilter = (reaction: any, user: User) =>
                    !user.bot && // filtering bot's own reactions
                    user.id == reviewerId && // making sure it's the reviewer's reaction and not someone else's
                    confirmationEmojis.includes(reaction.emoji.id); // making sure it's one of the confirmation emojis

                  // sending the confirmation message to the user
                  await msg.channel
                    .send(userWantsReviewMessageEmbed)
                    .then(
                      async (userWantsReviewMessageEmbedMessage: Message) => {
                        // reacting with the confirmation emojis
                        confirmationEmojis.forEach(async (emoji: string) => {
                          await userWantsReviewMessageEmbedMessage.react(emoji);
                        });

                        // creating the reaction collector
                        const wantsMessageCollector = userWantsReviewMessageEmbedMessage.createReactionCollector(
                          userConfirmationFilter,
                          {
                            max: 1,
                            time: parseInt(process.env.EXPIRY_TIME), // time limit
                          }
                        );

                        // embed that will be sent when the review finishes
                        const reviewFinishedEmbed = buildEmbed.apply(
                          this,
                          REVIEW_FINISH_EMBED
                        );

                        // collecting user confirmation on whether he/she wants it or not
                        wantsMessageCollector.on(
                          "collect",
                          async (reaction: any) => {
                            userWantsToLeaveAMessage = getConfirmation(
                              reaction.emoji.id
                            );
                          }
                        );
                        wantsMessageCollector.on(
                          "end",
                          async (_: any, reason: string) => {
                            if (reason === "time") {
                              msg.channel.send(timeLimitEmbed);
                              errorMessage = "time";
                              return;
                            }
                            // if the user doesn't want to leave a message
                            if (!userWantsToLeaveAMessage) {
                              await msg.channel.send(
                                `<@${managerId}> please confirm.`
                              );

                              // creating the review embed with no message
                              // the manager will confirm this, if it is confirmed, it will be sent to the #reviews channel
                              const reviewEmbed = buildEmbed(
                                `New Review`,
                                `Review by <@${reviewerId}>`,
                                null,
                                this.name,
                                true
                              );
                              reviewEmbed
                                .addField(
                                  "Manager Rating",
                                  `<@${managerId}> - ${managerRating[0]}`,
                                  true
                                )
                                .addField(
                                  "Builders Rating",
                                  `${buildersRating[0]}`
                                );

                              // sending confirmation to the manager
                              await msg.channel
                                .send(reviewEmbed)
                                .then(
                                  async (
                                    managerConfirmationMessage: Message
                                  ) => {
                                    // reacting with the confirmation emojis
                                    confirmationEmojis.forEach(
                                      async (emoji: string) => {
                                        await managerConfirmationMessage.react(
                                          emoji
                                        );
                                      }
                                    );
                                    // creating the reaction collector for the manager's confirmation (NM = no message)
                                    const managerConfirmationNMCollector = managerConfirmationMessage.createReactionCollector(
                                      managerConfirmationFilter,
                                      {
                                        max: 1,
                                        time: parseInt(process.env.EXPIRY_TIME), // time limit
                                      }
                                    );

                                    // manager's confirmation
                                    managerConfirmationNMCollector.on(
                                      "collect",
                                      async (reaction: any) => {
                                        const managerConfirmation: boolean = getConfirmation(
                                          reaction.emoji.id
                                        );

                                        msg.channel.send(reviewFinishedEmbed);

                                        // if the manager has denied the review
                                        if (!managerConfirmation) {
                                          errorMessage = "denied";
                                          return;
                                        }

                                        // sending the review to the review's channel
                                        await msg.guild.channels.cache
                                          .get(REVIEWS_CHANNEL)
                                          .send(reviewEmbed);
                                      }
                                    );
                                  }
                                );
                            } else {
                              // if the user wants to leave a message
                              // filter for the review message
                              const messageFilter = (m: Message) =>
                                m.author.id === reviewerId; // will get the first message the user sends

                              const messageCollector = msg.channel.createMessageCollector(
                                messageFilter,
                                {
                                  max: 1,
                                  time: parseInt(process.env.EXPIRY_TIME), // time limit
                                }
                              );

                              // giving a prompt to the user
                              const leaveYourMessageEmbed = buildEmbed(
                                null,
                                `${ARROWRIGHT_EMOJI.text} Type in your message below:`,
                                null,
                                this.name,
                                true
                              );

                              await msg.channel.send(leaveYourMessageEmbed);

                              await messageCollector.on(
                                "collect",
                                async (m: Message) => {
                                  reviewMessage = m.content;
                                }
                              );

                              await messageCollector.on(
                                "end",
                                async (_: any, reason: string) => {
                                  if (reason === "time") {
                                    msg.channel.send(timeLimitEmbed);
                                    errorMessage = "time";
                                    return;
                                  }

                                  // building the review embed with message
                                  const reviewEmbed = buildEmbed(
                                    `New Review`,
                                    `Review by <@${reviewerId}>
                              “*${reviewMessage}*”`,
                                    null,
                                    this.name,
                                    true
                                  );
                                  reviewEmbed
                                    .addField(
                                      "Manager Rating",
                                      `<@${managerId}> - ${managerRating[0]}`,
                                      true
                                    )
                                    .addField(
                                      "Builders Rating",
                                      `${buildersRating[0]}`
                                    );

                                  await msg.channel.send(
                                    `<@${managerId}> please confirm.`
                                  );
                                  await msg.channel
                                    .send(reviewEmbed)
                                    .then(
                                      async (
                                        managerConfirmationMessageWM: Message
                                      ) => {
                                        // reacting with the confirmation emojis
                                        confirmationEmojis.forEach(
                                          async (emoji: string) => {
                                            await managerConfirmationMessageWM.react(
                                              emoji
                                            );
                                          }
                                        );
                                        // creating the reaction collector for the manager's confirmation
                                        const managerConfirmationCollector = managerConfirmationMessageWM.createReactionCollector(
                                          managerConfirmationFilter,
                                          {
                                            max: 1,
                                            time: parseInt(
                                              process.env.EXPIRY_TIME
                                            ), // time limit
                                          }
                                        );

                                        // manager's confirmation
                                        managerConfirmationCollector.on(
                                          "collect",
                                          async (reaction: any) => {
                                            const managerConfirmation: boolean = getConfirmation(
                                              reaction.emoji.id
                                            );
                                            msg.channel.send(
                                              reviewFinishedEmbed
                                            );

                                            // if the manager has denied the review
                                            if (!managerConfirmation) {
                                              errorMessage = "denied";
                                              return;
                                            }

                                            // sending the review to the review's channel
                                            await msg.guild.channels.cache
                                              .get(REVIEWS_CHANNEL)
                                              .send(reviewEmbed);
                                          }
                                        );
                                      }
                                    );
                                }
                              );
                            }
                          }
                        );
                      }
                    );
                }
              );
            });
        });
      });

    switch (errorMessage) {
      // time limit exceeded
      case "time":
        return {
          status: false,
          message: ["Time limit exceeded"],
        };

      // review denied
      case "denied":
        return {
          status: false,
          message: ["Manager denied the review"],
        };

      // no errors
      default:
        // saving review in DB so they can use the data on their website
        try {
          await createReview(
            reviewerId,
            managerId,
            reviewMessage,
            managerRating[1],
            buildersRating[1]
          );
          return {
            status: true,
            message: null,
          };
        } catch (error) {
          return {
            status: false,
            message: [error],
          };
        }
    }
  },
};
