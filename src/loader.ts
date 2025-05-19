import { OpenAIEmbeddings } from "@langchain/openai";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import dotenv from "dotenv";
dotenv.config();

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = path.join(
  __dirname,
  "./docs/palas_kombat.pdf"
);

// const pdfPathNormas = path.join(
//   __dirname,
//   "../docs/normas-de-internacion-uti-2019.pdf"
// );



const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-large",
  openAIApiKey: process.env.OPENAI_API_KEY_WIN_2_WIN,
});

const vectorStore = new MemoryVectorStore(embeddings);


const loader = new PDFLoader(pdfPath, { parsedItemSeparator: "" });
// const loaderNormas = new PDFLoader(pdfPathNormas, { parsedItemSeparator: "" });

const docs = await loader.load();
// const docsNormas = await loaderNormas.load();
await vectorStore.addDocuments(docs);
// await vectorStoreNormas.addDocuments(docsNormas);

// asRetriever(kOrFields?, filter?, callbacks?, tags?, metadata?, verbose?): VectorStoreRetriever<VectorStore>
export const retrieverPalasKombat = vectorStore.asRetriever({
  k: 5,
  tags: ["info_general", "pdf_general"],
  metadata: {
    source: pdfPath,
    type: "pdf",
    name: "como_elegir_palas_kombat",
    description: "Como elegir palas Kombat",
  },
});


// asRetriever(kOrFields?, filter?, callbacks?, tags?, metadata?, verbose?): VectorStoreRetriever<VectorStore>
// export const retrieverNormasInternación = vectorStoreNormas.asRetriever({
//   k: 5,
//   tags: ["info_general", "pdf_general", "internacion", "normas"],
//   metadata: {
//     source: pdfPath,
//     type: "pdf",
//     name: "normas_de_internacion_uti_2019",
//     description: "Normas de internación UTI 2019",
//   },
// });