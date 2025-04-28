export const responseMessage = async (business_phone_number_id: string, to_phone_number: string, WEBHOOK_VERIFY_TOKEN: string, template: object) => {
  // Send a reply message
  let result = null;
  try {
    const response = await fetch(
      `https://graph.facebook.com/v22.0/${business_phone_number_id}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WEBHOOK_VERIFY_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(template),
      }
    );

    result = await response.json();

    console.log("Message sent successfully:", result);
  } catch (error) {
    console.error("Error sending message:", error);
  }

  const api_w2w = 'https://faceapp.techbank.ai/wa/';
  await fetch(api_w2w + 'send', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      payload: template,
      response: result
    }),
  });

  return result;
};

// Ejemplo de la respuesta de la API de whatsapp cuando un mensaje es enviado correctamente guardado en "result"
// Respuesta de la api de whatsapp cuando un mensaje es enviado correctamente
// const responseMessage = {
//   messaging_product: "whatsapp",
//   contacts: [{ input: "+542214371684", wa_id: "5492214371684" }],
//   messages: [
//     {
//       id: "wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABEYEjkwOUE1Q0NCRDRGMkE1QThEMwA=", // el id del mensaje dentro de wsp
//     },
//   ],
// };