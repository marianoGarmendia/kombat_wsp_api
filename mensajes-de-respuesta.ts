// Mnesajes de respuesta de la API de WhatsApp Business cuando el usuario presiona el boton de confirmar asistencia
// ********************************************************************************************************************
const mensaje_de_confirmacion_de_asistencia = {
  object: "whatsapp_business_account",
  entry: [
    {
      id: "487260501146994",
      changes: [
        {
          value: {
            messaging_product: "whatsapp",
            metadata: {
              display_phone_number: "15551930100",
              phone_number_id: "483538154853563",
            },
            contacts: [
              {
                profile: { name: "Mariano Garmendia" },
                wa_id: "5492214371684",
              },
            ],
            messages: [
              {
                context: {
                  from: "15551930100",
                  id: "wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABEYEjdGRUNEMjczNENFNUYyMzExRQA=",
                },
                from: "5492214371684",
                id: "wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABIYFDNBN0JEMDQ0OEI0OEI2OEQwQUIxAA==",
                timestamp: "1740091381",
                type: "button",
                button: {
                  payload: "Confirmo asistencia",
                  text: "Confirmo asistencia",
                },
              },
            ],
          },
          field: "messages",
        },
      ],
    },
  ],
};
