import {
  APPLICATION_EMOJI,
  COMMISSION_EMOJI,
  LOGO_EMOJI,
  SUPPORT_EMOJI,
} from "./Emojis";

// tickets
export const COMMISSION_TICKET_EMBED: string[] = [
  `**${COMMISSION_EMOJI.text} Commission Tickets**`,
  `You may order a commission from Mia Studios using our commission ticket system. Once you have created a ticket, you will be asked multiple short questions to help give us an idea of what you are looking to order. Make sure to read #📑│terms-of-service before creating a ticket. A manager will then help give a budget for your project. Once a budget has been given, and if you agree to continue, one of our builders will claim the commission.

    __Estimated Support Time__: **15** minutes.
    
    **React with ${COMMISSION_EMOJI.text} to open a Commission Ticket.**`,
  null,
  "Commission Tickets",
];
export const SUPPORT_TICKET_EMBED: string[] = [
  `**${SUPPORT_EMOJI.text} Support Tickets**`,
  `If you have an issue, or just require information on a product, we recommend opening a support ticket. Once you have opened a ticket you will be asked a few questions about what you require support for, before a member of our support team is found.

    __Estimated Support Time__: **20** minutes.
    
    **React with ${SUPPORT_EMOJI.text} to open a Support Ticket.**`,
  null,
  "Support Tickets",
];
export const APPLICATION_TICKET_EMBED: string[] = [
  `**${APPLICATION_EMOJI.text} Terms of Service**`,
  `You may work with us from Mia Studios by applying for a job with our ticket system. Once the ticket is opened we will ask multiple questions to get an idea of whom you are, what you do and other things that may vary depending on the role you are applying for, and hopefully you will be a part of our team.

  __Estimated Support Time__: **20** minutes.
  
  **React with ${APPLICATION_EMOJI.text} to open an Application Ticket.**`,
  null,
  "Application Tickets",
];

export const TERMS_OF_SERVICE_EMBED: string[] = [
  `**${LOGO_EMOJI.text} Mia Studios Terms of Service**`,
  `sashumga sisi msi msiadm iasmdi samid asoid jsaoijd soiaj**`,
  null,
  "Terms of Service",
];

// priority tickets

//priority
export const PRIORITY_COMMISSION_TICKET_MESSAGE: string = "697735178638065745";
export const PRIORITY_SUPPORT_TICKET_MESSAGE: string = "697735180064129044";

//         "Error!",
//         `${errorMessage}

//         Correct usage:
//         ${getCorrectUsage(this.argumentsSchema, this.name)}`,
//         null,
//         this.name
