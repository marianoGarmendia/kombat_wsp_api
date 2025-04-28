import { url } from "inspector";
import { text } from "stream/consumers";

// PLANTILLA APROBADA POR META PARA ENVIAR MENSAJES DE CONFIRMACIÓN DE EVENTO
export const messageExampleTemplateConfirm_event_4 = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "+34637573771", // Número de teléfono del destinatario en formato internacional
    type: "template",
  
    // Nombre de la plantilla aprobada
    template: {
      namespace: "835d9e77_50da_4594_b5c5_3c4b3e5bd736", // ID del espacio en la cuenta de meta
      name: "confirm_event_v4", // Nombre de la plantilla aprobada
      language: {
        code: "es", // Código de idioma y localización, por ejemplo, "es_ES" para español de España, "es" es toda España
      },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", parameter_name: "nombre", text: "Martin" }, // Valor para {{1}}
            {
              type: "text",
              parameter_name: "nombre_evento",
              text: "Evento test Febrero",
            }, // Valor para {{2}}
            {
              type: "text",
              parameter_name: "nombre_empresa",
              text: "Empresa Win2Win",
            },
            {
              type: "text",
              parameter_name: "fecha_evento",
              text: "24-02-25 al 27-02-25",
            },
            {
              type: "text",
              parameter_name: "horario_evento",
              text: "14:00 a 18:00",
            },
          ],
        },
      ],
    },
  };

  // *********************************************************************************
// PLANTILLA APROBADA Y QUE FUNCIONA PARA ENVIAR MENSAJE DE CONFIRMACIÓN DE EVENTO v1
export const messageExampleTemplate = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "+542214371684", // Número de teléfono del destinatario en formato internacional
    type: "template",
  
    // Nombre de la plantilla aprobada
    template: {
      namespace: "1ccd7b5a_58fd_4886_8baa_09eef28c2b8c",
      name: "confirm_event", // Nombre de la plantilla aprobada
      language: {
        code: "es", // Código de idioma y localización, por ejemplo, "es_ES" para español de España
      },
      components: [
        {
          type: "body",
          parameters: [
            { type: "text", parameter_name: "nombre", text: "Mariano" }, // Valor para {{1}}
            {
              type: "text",
              parameter_name: "evento",
              text: "Evento uno: desde 22-02-205 hasta 25-02-2025",
            }, // Valor para {{2}}
          ],
        },
      ],
    },
  };


  // *********************************************************************************
  // Template generico para enviar mensajes de texto
  export const messageTemplateGeneric = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "",
   
    text: {
      preview_url: true,
      body: `
      `,
    },
   
  };
  

  // *********************************************************************************
  // Template aprobada para enviar QR
  export const messageTemplateQR = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "",
    type: "template",
    // Nombre de la plantilla aprobada
    template: {
      namespace: "1ccd7b5a_58fd_4886_8baa_09eef28c2b8c",
      name: "event_rsvp_confirmation_2", // Nombre de la plantilla aprobada
      language: {
        code: "es", // Código de idioma y localización, por ejemplo, "es_ES" para español de España
      },
      components: [
        {
          type: "header",
          parameters: [
            {
              type: "image",
              image: {
                link: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzMhzRl7hve_k_ayTiwWZNhxt-vpIv8GBGvw&s"
              },
            },
          ]
        },
        {
          type: "body",
          parameters: [
            {
              type: "text",
              parameter_name: "nombre_evento", // Esperar a que sea aprobada con la "e" minúscula
              text: "Evento de prueba 03-03"
            }
          ]
        }
      ],
    },
  };


  // *********************************************************************************
  // Template aprbada para enviar enlace de link para completar la documentacion
  export const messageTemplateLinkDoc = {
    messaging_product: "whatsapp",
    recipient_type: "individual",
    to: "",
    type: "template",
    // Nombre de la plantilla aprobada
    template: {
      namespace: "1ccd7b5a_58fd_4886_8baa_09eef28c2b8c",
      name: "account_creation_confirmation_3", // Nombre de la plantilla aprobada
      language: {
        code: "es", // Código de idioma y localización, por ejemplo, "es_ES" para español de España
      },
      components: [
        {
          type: "body",
          parameters: [
            {
              type: "text",
              parameter_name: "nombre", 
              text: "Mariano" // dinamico
            }
          ]
        },
        {
          type: "button",
          sub_type: "url",
          index: "0",
          parameters: [
            {
              type: "text",
              text: "", // dinamico
            }
          ]
        }
      ],
    }}