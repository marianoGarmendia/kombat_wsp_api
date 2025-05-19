// import { TavilySearchResults ,TavilySearchAPIRetrieverFields} from "@langchain/community/tools/tavily_search";
import {
  AIMessage,
  SystemMessage
} from "@langchain/core/messages";
import { tool } from "@langchain/core/tools";
import { Annotation, MemorySaver, MessagesAnnotation, StateGraph } from "@langchain/langgraph";
import {retrieverToolPalasKombat} from "./retriever.ts";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";
import {systemprompt_original} from "../prompt_original.ts";

// process.env.LANGCHAIN_CALLBACKS_BACKGROUND = "true";
import * as dotenv from "dotenv";
import { TavilySearchAPIRetriever } from "@langchain/community/retrievers/tavily_search_api";
dotenv.config();

// const tavilySearch = new TavilySearchAPIRetriever({
//   apiKey: process.env.TAVILY_API_KEY,
//   includeDomains:["https://kombatpadel.com.ar/es/palas-padel","https://kombatpadel.com.ar/es/palas-formato-diamante","https://kombatpadel.com.ar/es/palas-formato-redondo","https://kombatpadel.com.ar/es/palas-formato-lagrima","https://kombatpadel.com.ar/es/nueva-coleccion-vulcano","https://kombatpadel.com.ar/es/kombat/test-point-kombat"],
//   searchDepth: "advanced",
// });

// const tavilySearch = new TavilySearchAPIRetriever({
//   apiKey: process.env.TAVILY_API_KEY,
//   includeDomains:["https://kombatpadel.com.ar/es/kombat/hotsale"],
//   searchDepth: "advanced",
// });

// const tavily = tavilySearch.asTool({
//   name: "tavilySearch",
//   description: "Utiliza esta herramienta cuando consulten por precios o promociones, esta semana es HOT SALE asi que debes redirigir a la pagina de promociones",
 
 
//   schema: z.string()

// })

// const ejecutar_widget_api = tool(
//   async ({ wa_id, cel_number }) => {
//     await fetch("https://urbanevents.techbank.ai:4001/whatsapp/ejecutar_widget", {})
//   }
//   , {
//     name: "ejecutar_widget_api",
//     description: "Utiliza esta herramienta cuando... ",
//     schema: z.object({
//       wa_id: z.string(),
//       cel_number: z.string(),
//     }),
//   })


// const tools = [];
// for (const t of tools) {
//   if (t === 'tavilySearch') tools.push(tavilySearch);
//   if (t === 'ejecutar_widget_api') tools.push(ejecutar_widget_api);
// }
  

const tools: any = [ retrieverToolPalasKombat];

const stateAnnotation = MessagesAnnotation;

const contextAnnotation = Annotation.Root({
  context: Annotation<string>,
  cel_number: Annotation<string>,
  authentication: Annotation<boolean>,
  ...stateAnnotation.spec
});

export const model = new ChatOpenAI({
  model: "gpt-4o",
  apiKey: process.env.OPENAI_API_KEY_WIN_2_WIN,
  temperature: 0,
}).bindTools(tools);

const toolNode = new ToolNode(tools);

async function callModel(state: typeof contextAnnotation.State) {
  const { messages, context } = state;


// WIN 2 WIN
  // const systemsMessage = new SystemMessage(
  //   `
  //       ${context}
    
  //     ### Información de horario
  //     El dia de hoy es ${new Date().toLocaleDateString()} y la hora actual es ${new Date().toLocaleTimeString()}.
  //     `
  // );

  const systemsMessage = new SystemMessage(systemprompt_original)

// @ts-expect-error
  const response = await model.invoke([systemsMessage, ...messages]);

  // We return a list, because this will get added to the existing list
  return { messages: [response] };
}

function checkToolCall(state: typeof contextAnnotation.State) {
  const { messages } = state;
  console.log("Ckeck tool call");

  console.log(messages);

  const lastMessage = messages[messages.length - 1] as AIMessage;

  // If the LLM makes a tool call, then we route to the "tools" node
  if (lastMessage?.tool_calls?.length) {
    return "tools";
  } else {
    return "__end__";
  }

  // Otherwise, we stop (reply to the user)
}
const graph = new StateGraph(contextAnnotation);


graph
  .addNode("agent", callModel)
  .addNode("tools", toolNode)
  .addEdge("__start__", "agent")
  .addConditionalEdges("agent", checkToolCall, ["tools", "__end__"])
  .addEdge("tools", "agent");

const checkpointer = new MemorySaver();

// Implementacion agente interfazp personalizada
export const workflow = graph.compile({ checkpointer });

// Implementacion langgraph studio sin checkpointer
// export const workflow = graph.compile();



// const response = await workflow.invoke(
//   { messages: "Hola, quiero saber que paso en bahia blanca en estos dias por la inundacion" },
//   { configurable: { thread_id: "124" } }
// );

// console.log(response);
