const Discord = require(`discord.js`);
const style   = require(`../assets/embeds.json`);


// TOS
const tosOne = new Discord.MessageEmbed()
    .setColor(style.color1)
    .setTitle("**Mia Studios Terms of Service**")
    .setDescription(`**1.0 Commissions**\n\n**1.1** When purchase any commissions you agree to our Terms of Service.\n**1.2** You may not claim any work from a commission as your own. This includes claiming any artwork of our builds as your own **e.g. a render**.\n**1.3** You may not resell any commissions without purchasing the rights to do so.\n**1.4** If resell rights are purchased you may still not claim any work as your own. You will only receive the rights to sell the build completed, while crediting Mia Studios.\n**1.5** Once a commission has been completed we will not store any files to ensure you are the sole owner of the product. It is your responsibility to keep the file safe, and if you lose it then it is not our responsibility to send you another copy.\n**1.6** We are allowed to deny service to any potential customers for any reason we see fair.\n**1.7** We may stop a commission if it breaches our terms of service or rules. If this happens while the commission is being built, you may not be refunded. More information in our refund policy.\n**1.8** We have a strict no refund policy. Once a commission has been completed we will not provide a refund unless there is a major issue with the product that makes it unusable. More information is in our refund policy.\n**1.9** We require a 50% upfront payment on commissions above 100 USD. You will not receive any refunds unless we can not finish the commission for some reason.\n**1.10** For orders less than $100. Full advance.\n**1.11** For orders above $100. 50% advance and 50% when work is done.\n**1.12** All commissions will be provided as a .schematic file once complete - unless agreed otherwise.\n**1.13** We reserve the rights to display any completed projects on our social media and in our portfolio. If a product must however be kept secret until a given date however we may comply.\n**1.14** If payments are sent over Paypal they will be made as an invoice on Paypal.`)

const tosTwo = new Discord.MessageEmbed()
    .setColor(style.color1)
    .setDescription(`**2.0 Build Shop**\n\n**2.1** When you purchase any build from our discord store you agree to our Terms of Service.\n**2.2** You may not claim any work from our shop as your own. This includes claiming any artwork of our builds as your own. **e.g. a render**.\n**2.3** You may not resell any builds from our shop, or redistribute them in any way.\n**2.4** Once you have made a purchase you will be given a schematic to the product. We will not store any files to ensure you are the sole owner of the product. It is your responsibility to keep the file safe.\n**2.5** We are allowed to deny service to any potential customers for any reason we see fair.\n**2.6** You accept that the product(s) you’re purchasing are not exclusive. This means they may be resold by us after your purchase.\n**2.7** We have a strict no refund policy. Once a build has been purchased no refunds can be made. More information is in our refund policy.\n**2.8** You understand that you must come to us if you have an issue before contacting any other party. There are sometimes issues with the automated system, and we will be more than happy to help resolve any issues.\n**2.9** All products will be provided as a .schematic file inside of a .zip folder. If you have any issues with this format we are more than happy to help convert it.\n**2.10** You understand that the images provided of the products are in-game pictures (some using shader packs to enhance the products), and some renders. When purchasing any of our products you agree that you are happy with the amount of images provided - and understand the build you are buying.`);

const tosThree = new Discord.MessageEmbed()
    .setColor(style.color1)
    .setDescription(`**Refund Policy**\n\nCommissions will not be refunded once they have been completed and paid for. If your commission goes over an agreed deadline we may offer a refund of up to 50%, and will work our hardest to finish the build shortly after. The amount refunded will depend on how lenient the deadline was, changes requested and the size of the job - as well as any other factors we see fit.\n\nIf an issue on behalf of Mia Studios comes up which cause Mia Studios to have to close your commission, we will offer a full 100% refund, and will offer to send any unfinished or finished work completed in the time over.\n\nIf you break our Terms Of Service, Rules or break the Law we will be required to close your commission - and will not offer a refund. This includes if you are to verbally harass our builders or managers while the commission is underway.`);

const tosFour = new Discord.MessageEmbed()
    .setColor(style.color1)
    .setDescription(`If you are unhappy with the finished product we may offer a refund of up to 50%. This depends on the overall price of the commission, and we will base this off of weather we see a refund fair in the situation - based on the finished result and brief given. Overall, if a partial refund is sent or not will be decided by the owner of Mia Studios or a Manager. It is however the client’s job to feedback on any progress images given, and if no issue is outlined before the product is done the refund may be lowered.\nPre-Made Builds will not be refunded unless there is a major issue with the product - which will be decided by the owner of Mia Studios or a Manager. If this is the case, the product will also be removed from the shop.\n\nAs the products are downloads and are non-returnable, there is no way to ensure a product has been returned - and so we don’t allow for people to return products for a refund.\n\nIf the wrong download is provided for a build, please contact us and we will send the correct download. We may offer a partial refund of up to 50% if the build is large scale and has taken you a long time to load in as a result of the wrong product being sent, or of up to 25% if you have to wait over 24 hours for support getting the correct product.\n\n**Please react with <:check:714075451458322452> to accept these Terms and Conditions.**`);


exports.tosOne = tosOne;
exports.tosTwo = tosTwo;
exports.tosThree = tosThree;
exports.tosFour = tosFour;



/* Mia Studios Terms of Service
1.0 Commissions

1.1 When purchase any commissions you agree to our Terms of Service.
1.2 You may not claim any work from a commission as your own. This includes claiming any artwork of our builds as your own e.g. a render
1.3 You may not resell any commissions without purchasing the rights to do so.
1.4 If resell rights are purchased you may still not claim any work as your own. You will only receive the rights to sell the build completed, while crediting Mia Studios.
1.5 Once a commission has been completed we will not store any files to ensure you are the sole owner of the product. It is your responsibility to keep the file safe, and if you lose it then it is not our responsibility to send you another copy.
1.6 We are allowed to deny service to any potential customers for any reason we see fair.
1.7 We may stop a commission if it breaches our terms of service or rules. If this happens while the commission is being built, you may not be refunded. More information in our refund policy.
1.8 We have a strict no refund policy. Once a commission has been completed we will not provide a refund unless there is a major issue with the product that makes it unusable. More information is in our refund policy.
1.9 We require a 50% upfront payment on commissions above 100 USD. You will not receive any refunds unless we can not finish the commission for some reason.
1.10 For orders less than $100. Full advance.
1.11 For orders above $100. 50% advance and 50% when work is done.
1.12 All commissions will be provided as a .schematic file once complete - unless agreed otherwise.
1.13 We reserve the rights to display any completed projects on our social media and in our portfolio. If a product must however be kept secret until a given date however we may comply.
1.14 If payments are sent over Paypal they will be made as an invoice on Paypal.
2.0 Build Shop

2.1 When you purchase any build from our discord store you agree to our Terms of Service.
2.2 You may not claim any work from our shop as your own. This includes claiming any artwork of our builds as your own. e.g. a render
2.3 You may not resell any builds from our shop, or redistribute them in any way.
2.4 Once you have made a purchase you will be given a schematic to the product. We will not store any files to ensure you are the sole owner of the product. It is your responsibility to keep the file safe.
2.5 We are allowed to deny service to any potential customers for any reason we see fair.
2.6 You accept that the product(s) you’re purchasing are not exclusive. This means they may be resold by us after your purchase.
2.7 We have a strict no refund policy. Once a build has been purchased no refunds can be made. More information is in our refund policy.
2.8 You understand that you must come to us if you have an issue before contacting any other party. There are sometimes issues with the automated system, and we will be more than happy to help resolve any issues.
2.9 All products will be provided as a .schematic file inside of a .zip folder. If you have any issues with this format we are more than happy to help convert it.
2.10 You understand that the images provided of the products are in-game pictures (some using shader packs to enhance the products), and some renders. When purchasing any of our products you agree that you are happy with the amount of images provided - and understand the build you are buying.
Refund Policy

Commissions will not be refunded once they have been completed and paid for. If your commission goes over an agreed deadline we may offer a refund of up to 50%, and will work our hardest to finish the build shortly after. The amount refunded will depend on how lenient the deadline was, changes requested and the size of the job - as well as any other factors we see fit.

If an issue on behalf of Mia Studios comes up which cause Mia Studios to have to close your commission, we will offer a full 100% refund, and will offer to send any unfinished or finished work completed in the time over.

If you break our Terms Of Service, Rules or break the Law we will be required to close your commission - and will not offer a refund. This includes if you are to verbally harass our builders or managers while the commission is underway.
If you are unhappy with the finished product we may offer a refund of up to 50%. This depends on the overall price of the commission, and we will base this off of weather we see a refund fair in the situation - based on the finished result and brief given. Overall, if a partial refund is sent or not will be decided by the owner of Mia Studios or a Manager. It is however the client’s job to feedback on any progress images given, and if no issue is outlined before the product is done the refund may be lowered.
Pre-Made Builds will not be refunded unless there is a major issue with the product - which will be decided by the owner of Mia Studios or a Manager. If this is the case, the product will also be removed from the shop.

As the products are downloads and are non-returnable, there is no way to ensure a product has been returned - and so we don’t allow for people to return products for a refund.

If the wrong download is provided for a build, please contact us and we will send the correct download. We may offer a partial refund of up to 50% if the build is large scale and has taken you a long time to load in as a result of the wrong product being sent, or of up to 25% if you have to wait over 24 hours for support getting the correct product.

Accept these Terms to Continue
Please react with :checkmark: to accept these Terms and Conditions and be granted access to the rest of the server. Thank you and have a great day!
 */