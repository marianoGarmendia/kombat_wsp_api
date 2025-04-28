import dotenv from "dotenv";
import express from "express";
import { workflow } from "./agent.ts";
import { parsePhoneNumber } from "./parser-phone-number.ts";
import { responseMessage } from "./response-message.ts";
import {
  conversationRouter
} from "./routes/conversation.route.ts";
import {
  messageTemplateGeneric
} from "./templates.ts";

const token_verify_webhook = process.env.TOKEN_VERIFY_WEBHOOK;

dotenv.config();
// const WEBHOOK_VERIFY_TOKEN = process.env.ACCESS_PERMANENT_TOKEN_AGENT_TEST_WSP;
export const WEBHOOK_VERIFY_TOKEN =
  process.env.ACCESS_PERMANENT_TOKEN_BARCELONA_TEST;

const url_system_public_wsp = process.env.URL_SYSTEM_PUBLIC_WSP;

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
app.use(conversationRouter);

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"]; // este es un token que lo definimos nosotros para validar en el backend ,puede ser cualquier palabra
  const challenge = req.query["hub.challenge"];
  console.log("Mode:", mode);
  console.log("Token:", token);
  console.log("Challenge:", challenge);

  // check the mode and token sent are correct
  if (mode === "subscribe" && token === token_verify_webhook) {
    // respond with 200 OK and challenge token from the request
    res.status(200).send(challenge);
    console.log("Webhook verified successfully!");
  } else {
    // respond with '403 Forbidden' if verify tokens do not match
    res.sendStatus(403);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//Recibo el mensaje AL NUMERO DE WHATSAPP aprobado +54 221 655 9075
app.post("/webhook", async (req, res) => {
  console.log("message body:");
  console.dir(req.body, { depth: null });

  const messages = req.body.entry[0]?.changes[0]?.value?.messages;
  if (!messages || messages.length <= 0) {
    console.error('El mensaje recibido no tiene el formato esperado o no contiene mensajes.');
    res.end()
    return
    res.sendStatus(400).end(); // Bad Request
    return;
  }

  // no tenemos muy bien en claro por que es un array pero agarramos el primer elemento
  // ya que es el unico que nos interesa por ahora
  const firstMessage = messages[0];

  console.log("firstMessage:", firstMessage);

  const business_phone_number_id = req.body.entry[0].changes[0].value.metadata.phone_number_id;
  const cel_number = parsePhoneNumber(firstMessage.from);

  // debemos analizar el numero que envía el mensaje en w2w_api
  // const api_w2w = process.env.API_WIN2WIN;
  let enterpriseContext: contextInterface | null = null;
  
  // try {
  //   const response = await fetch(api_w2w + "recive", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(req.body),
  //   });
  //   if (!response.ok) {
  //     throw new Error(`HTTP error! status: ${response.status}`);
  //   }
  //   enterpriseContext = await response.json();
  // } catch (error) {
  //   console.error("Error fetching enterprise context:", error);
  //   enterpriseContext = null;
  // }
  // const enterpriseContext: contextInterface = { // para probar sin la api de w2w
  //   sender: business_phone_number_id,
  //   id_gama: "1",
  //   bot_status: true,
  //   bot_context: "Sos un experto en recursos humanos y seleccion de candidatos",
  //   respuesta_template_w2w: null,
  // }

  if (firstMessage.type !== "text") {
    await responseMessage(
      business_phone_number_id,
      cel_number,
      WEBHOOK_VERIFY_TOKEN,
      {
        ...messageTemplateGeneric,
        to: cel_number,
        text: {
          body: "Solo recibimos mensajes de texto, por favor vuelve a intentarlo",
        },
      }
    );
    console.log("Message sent successfully, No es un mensaje de texto:", res);

    res.sendStatus(200).end();
     // Bad Request
    return; // descomentar para win 2 win
   } // para que no siga ejecutando el codigo
  // } else if (!enterpriseContext) {
  //   console.error("No hay contexto de empresa definido");
  //   await responseMessage(
  //     business_phone_number_id,
  //     cel_number,
  //     WEBHOOK_VERIFY_TOKEN,
  //     {
  //       ...messageTemplateGeneric,
  //       to: cel_number,
  //       text: {
  //         body: "Su número no está registrado en el sistema, por favor vuelva a intentarlo",
  //       },
  //     }
  //   );
  //   console.log("Su número no está registrado en el sistema, por favor vuelva a intentarlo:", res);

  //   res.sendStatus(200).end(); // Bad Request
  //   return; // para que no siga ejecutando el codigo
  // }

  // DESCOMENTAR PARA WIN2WIN
  // if (enterpriseContext.respuesta_template_w2w) {
  //   // respuesta customizada desde la api de w2w
  //   // no interfiere ni el agente ni nadie más...

  //   await responseMessage(
  //     business_phone_number_id,
  //     cel_number,
  //     WEBHOOK_VERIFY_TOKEN,
  //     enterpriseContext.respuesta_template_w2w
  //   );
  //   res.sendStatus(200).end(); // Bad Request
  //   return;
  // }

  // iniciamos el agente para que analice el mensaje
  if(firstMessage.text.body){
  const responseGraph = await workflow.invoke(
    {
      // context: enterpriseContext.bot_context,
      cel_number: cel_number,
      messages: firstMessage.text.body,
    },
    {
      configurable: { thread_id: cel_number },
      streamMode: "values"
    }
  );
  console.log(responseGraph.messages[responseGraph.messages.length - 1].content);

  const res2 = await responseMessage(
    business_phone_number_id,
    cel_number,
    WEBHOOK_VERIFY_TOKEN,
    {
      ...messageTemplateGeneric,
      to: cel_number,
      text: {
        body: responseGraph.messages[responseGraph.messages.length - 1]
          .content,
      },
    }
  );
  console.log("respuesta de agente");
  console.log("Message sent successfully:", res2);

  // Respond to the webhook
  res.sendStatus(200).end();}
});

const envioMensajeDeUsuario = async (req: any) => {
  // Enviar el mensaje al endpoint de charly
  try {
    const respuesta = await fetch(`http://localhost:3000/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req.body),
    });
    if (respuesta.status !== 200) {
      throw new Error("Failed to send message");
    }
    const result = await respuesta.json();
    console.log("Message sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};


/**
 * WA_JSON_PAYLOAD
 * 
 * {
 *    sender: "561091527089092", // numero que envia
 *    bot_to_use: "gpt-4o-mini", // modelo a usar
 *    bot_status: true, // si el bot esta activo o no
 *    bot_context: "Sos un experto en recursos humanos y seleccion de candidatos", // contexto del bot
 *    btn_tools: [
 *       'tavilySearch',
 *       'ejecutar_widget_api'
 *    ]
 * }
 */

// interface para el contexto de la empresa
interface contextInterface {
  sender: string; // numero real, el phone_number_id del telefono de IA Solutions de prueba creado en la app de whatsapp
  id_gama?: string; // 
  bot_status: boolean; // si el bot esta activo o no
  bot_context: string; // contexto del bot
  respuesta_template_w2w?: any; // respuesta del api de w2w
};

const contexts: contextInterface[] = [
  {
    sender: "561091527089092", // numero real, el phone_number_id del telefono de IA Solutions de prueba creado en la app de whatsapp
    id_gama: "1",
    bot_status: true,
    bot_context: "Sos un experto en recursos humanos y seleccion de candidatos",
  },
  {
    sender: "561091527089092", // numero real, el phone_number_id del telefono de IA Solutions de prueba creado en la app de whatsapp
    id_gama: "2",
    bot_status: true,
    bot_context: "Sos un experto en tecnologia financiera",
  },
  {
    sender: "561091527596423", // numero ficticio
    bot_status: true,
    bot_context:
      "Sos un experto en telecomunicaciones y servicios de telefonia",
  },
  {
    sender: "561091525963215", // numero ficticio
    bot_status: true,
    bot_context:
      "Eres un experto en atencion al cliente y soporte tecnico de software",
  },
  
];
