import { z } from "zod";
import { retrieverPalasKombat  } from "./loader.ts";
import { DynamicStructuredTool } from "langchain/tools";


export const retrieverToolPalasKombat = retrieverPalasKombat.asTool({
  name: "como_elegir_palas_kombat",
  description:
    "Ésta funcion se utiliza para responder preguntas sobre como elegir palas kombat. que tener en cuenta a la hora de elegir una pala, que tipo de pala elegir, etc.",
  schema: z.string().describe("Consulta sobre como elegir palas kombat, que tener en cuenta a la hora de elegir una pala, que tipo de pala elegir, etc."),
  
});

export const toolPalas = new DynamicStructuredTool({
  name: "como_elegir_palas_kombat",
  description:
    "Ésta funcion se utiliza para responder preguntas sobre como elegir palas kombat. que tener en cuenta a la hora de elegir una pala, que tipo de pala elegir, etc.",
  schema: z.string().describe("Consulta sobre como elegir palas kombat, que tener en cuenta a la hora de elegir una pala, que tipo de pala elegir, etc."),
  func: async (input:any) => {
    return await retrieverToolPalasKombat.invoke(input);
  },
})