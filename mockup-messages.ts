// Mensaje que llega de respuesta cuando presiona el boton de reachzo asistencia
// El mensaje enviado está en la funcion initConversation()
const messageRechazoAsistencia = {
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
                  id: "wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABEYEjcwQjdDQTk0NzJBOUUxQjIxNAA=",
                },
                from: "5492214371684",
                id: "wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABIYFjNFQjBCMDk3N0RGOUZBOTFGREQ2QzQA",
                timestamp: "1739848256",
                type: "interactive",
                interactive: {
                  type: "button_reply",
                  button_reply: {
                    id: "rechazar_asistencia",
                    title: "Rechazo asistencia",
                  },
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

// Un usuario envía un mensaje de texto
const messageTextoDeUsuario = 
{
  object: 'whatsapp_business_account',
  entry: [
    {
      id: '473853462488396',
      changes: [
        {
          value: {
            messaging_product: 'whatsapp',
            metadata: {
              display_phone_number: '5492216559075',
              phone_number_id: '561091527089092'
            },
            contacts: [
              {
                profile: { name: 'Mariano Garmendia' },
                wa_id: '5492214371684'
              }
            ],
            messages: [
              {
                from: '5492214371684',
                id: 'wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABIYFDNBMzE0MTE5Q0ZBMzBFMDAyRjc5AA==',
                timestamp: '1740525442',
                text: { body: 'Hola' },
                type: 'text'
              }
            ]
          },
          field: 'messages'
        }
      ]
    }
  ]
}


// Cuerpo del mensaje que llega como actualizacion, llega con la propiedad statuses

const update_msg_texto = {
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
            statuses: [
              {
                id: "wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABEYEkMyN0JBRDlDRjJGQjBCOEQ1QgA=",
                status: "sent", // marca esta propiedad como enviado
                timestamp: "1739998248",
                recipient_id: "5492214371684",
                conversation: {
                  id: "21e4ba8c43a2aa9122468d80c9f4744c",
                  expiration_timestamp: "1740057480",
                  origin: { type: "utility" },
                },
                pricing: {
                  billable: true,
                  pricing_model: "CBP",
                  category: "utility",
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

// Cuerpo del mensaje que llega como "read" llega con la propiedad statuses
const read_msg_texto = {
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
            statuses: [
              {
                id: "wamid.HBgNNTQ5MjIxNDM3MTY4NBUCABEYEjk1OUREMDQ5NjdDQTNDMjBGOAA=",
                status: "read", // marca esta propiedad como leído
                timestamp: "1739662570",
                recipient_id: "5492214371684",
              },
            ],
          },
          field: "messages",
        },
      ],
    },
  ],
};








// Todos llegan al mismo webhook configurado como POST y llegan porque habilitamos los servicios que queremos escuchar en el webhook

// Tipo de mensaje tambien válido sin botones



// mensaje interactivo con botones
export const messageInteractive = {
  messaging_product: "whatsapp",
  to: "+542214371684",
  type: "interactive",
  interactive: {
    type: "button",
    body: {
      text: "Elige una opción:",
    },
    action: {
      buttons: [
        {
          type: "reply",
          reply: {
            id: "opcion1",
            title: "Opción 1",
          },
        },
        {
          type: "reply",
          reply: {
            id: "opcion2",
            title: "Opción 2",
          },
        },
      ],
    },
  },
};

// Ejemplo de array de componentes para una plantilla de mensajes

const components = [
  {
    type: "BODY",
    text: "Thank you for your order, {{1}}! Your confirmation number is {{2}}. If you have any questions, please use the buttons below to contact support. Thank you for being a customer!",
    example: {
      body_text: [["Pablo", "860198-230332"]],
    },
  },
  {
    type: "BUTTONS",
    buttons: [
      {
        type: "PHONE_NUMBER",
        text: "Call",
        phone_number: "15550051310",
      },
      {
        type: "URL",
        text: "Contact Support",
        url: "https://www.luckyshrub.com/support",
      },
    ],
  },
];

export const messageComponentes = {
  messaging_product: "whatsapp",
  recipient_type: "individual",
  to: "+542214371684",
  type: "components",

  components: components,
};

// ejemplo mensaje de documents
const messageDocuments = {
  recipient_type: "individual",
  to: "whatsapp-id",
  type: "document",
  document: {
    link: "http(s)://the-url",
    provider: {
      name: "provider-name",
    },
  },
};



// Ejemplo de parametro nominal

const parametroNominal = {
  type: "BODY",
  text: "Your {{order_id}}, is ready {{customer_name}}.",
  example: {
    header_text_named_params: [
      {
        param_name: "order_id",
        example: "335628",
      },
      {
        param_name: "customer_name",
        example: "Shiva",
      },
    ],
  },
};
