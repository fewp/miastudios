// import log from "../../utils/betterLogger";

import {
  CREATE_A_TICKET_CHANNEL,
  INFORMATION_CHANNEL,
  INFORMATION_MIRROR_CHANNEL,
  PRIORITY_TICKET_CHANNEL,
  TERMS_OF_SERVICE_CHANNEL,
} from "../../assets/Channels";

export default async (guild: any): Promise<string> => {
  let messageContent: string = "";

  const informationChannel = await guild.channels.cache.get(
    INFORMATION_CHANNEL
  );
  const informationMirrorChannel = await guild.channels.cache.get(
    INFORMATION_MIRROR_CHANNEL
  );
  const tosChannel = await guild.channels.cache.get(TERMS_OF_SERVICE_CHANNEL);
  const ticketChannel = await guild.channels.cache.get(CREATE_A_TICKET_CHANNEL);
  const pTicketChannel = await guild.channels.cache.get(
    PRIORITY_TICKET_CHANNEL
  );

  const tosMessage = await tosChannel.messages.fetch({ limit: 1 });
  const informationMessage = await informationChannel.messages.fetch({
    limit: 1,
  });
  const informationMirrorMessage = await informationMirrorChannel.messages.fetch(
    { limit: 1 }
  );
  const ticketMessages = await ticketChannel.messages.fetch({ limit: 3 });

  const application = await ticketMessages.first().id;
  await ticketMessages.delete(ticketMessages.first().id);
  const support = await ticketMessages.first().id;
  await ticketMessages.delete(ticketMessages.first().id);
  const commission = await ticketMessages.first().id;

  const pTicketMessages = await pTicketChannel.messages.fetch({ limit: 2 });

  const pSupport = await pTicketMessages.first().id;
  await pTicketMessages.delete(pTicketMessages.first().id);
  const pCommission = await pTicketMessages.first().id;

  messageContent += `export const TERMS_OF_SERVICE_MESSAGE: string = "${
    tosMessage.first().id
  }"; // TOS MESSAGE (${tosChannel.name})\n`;
  messageContent += `export const INFORMATION_MESSAGE: string = "${
    informationMessage.first().id
  }"; // INFORMATION MESSAGE (${informationChannel.name})\n`;
  messageContent += `export const INFORMATION_MIRROR_MESSAGE: string = "${
    informationMirrorMessage.first().id
  }"; // MIRROR FOR MANAGERS MESSAGE (${informationMirrorChannel.name})\n`;
  messageContent += `export const APPLICATION_TICKET_MESSAGE: string = "${application}"; // APPLICATION TICKET MESSAGE (${ticketChannel.name})\n`;
  messageContent += `export const SUPPORT_TICKET_MESSAGE: string = "${support}"; // SUPPORT TICKET MESSAGE (${ticketChannel.name})\n`;
  messageContent += `export const COMMISSION_TICKET_MESSAGE: string = "${commission}"; // COMMISSION TICKET MESSAGE (${ticketChannel.name})\n`;

  messageContent += `export const PRIORITY_COMMISSION_TICKET_MESSAGE: string = "${pCommission}"; // PRIORITY COMMISSION TICKET MESSAGE (${pTicketChannel.name})\n`;
  messageContent += `export const PRIORITY_SUPPORT_TICKET_MESSAGE: string = "${pSupport}"; // PRIORITY SUPPORT TICKET MESSAGE (${pTicketChannel.name})\n`;

  return messageContent;
};
