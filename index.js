import { api, data, params,events } from "@serverless/cloud";
import SibApiV3Sdk from  "sib-api-v3-sdk" ;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
var defaultClient = SibApiV3Sdk.ApiClient.instance;
// Configure API key authorization: api-key
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = params.SENDINBLUE_API_KEY;

api.post("/signup", async (req, res) => {
  const {email, firstName, lastName} = req.body;

  const result = data.set(`user:${email}`, {
    email, 
    firstName,
    lastName
  })

  res.send({message: "user signed up!"});

}); 

data.on("created:user:*", async(event) => {
  const record = event.item.value;
  const contactsApiInstance = new SibApiV3Sdk.ContactsApi();
  const createContact = new SibApiV3Sdk.CreateContact();
  createContact.email = record.email; 
  createContact.attributes = {
    FIRSTNAME: record.firstName,
    LASTNAME: record.lastName,
  }; 
  contactsApiInstance.createContact(createContact).then(function(data) {
    console.log('API called successfully. Returned data: ' + JSON.stringify(data));
  }, function(error) {
    console.error(error);
  });
  await events.publish("contact.created", {after: "10 seconds"}, record); 
});

events.on("contact.created",async({body}) => {
 const sendSmtpEmail = {
  to: [{
      email: body.email,
      name: body.firstName
  }],
  templateId: 1, 
};
apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
console.log('API called successfully. Returned data: ' + data);
}, function(error) {
console.error(error);
});

console.log ("welcome email sent!");
});
