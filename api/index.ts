import { OpenAI, VectorStoreIndex, storageContextFromDefaults, serviceContextFromDefaults } from "llamaindex";
import { Router } from "express";

const router = Router();
const llm = new OpenAI({ model: "gpt-3.5-turbo-1106", temperature: 0.1 });
//const llm = new MistralAI({ model: "mistral-tiny" });

// load the index
const storageContext = await storageContextFromDefaults({
  persistDir: "./storage",
});

const serviceContext = serviceContextFromDefaults({ llm });


const index = await VectorStoreIndex.init({
  storageContext: storageContext,
  serviceContext: serviceContext,
});

// Query the index
const queryEngine = index.asQueryEngine();
console.log(queryEngine);
router.post('/chat', async (req, res) => {
  try {
    //const response = await llm.chat([{ content: req.body.content, role: "user" }]);
    const response = await queryEngine.query("You are an AI assistant. Your name is Sienna. " + req.body.content);
    // Output response
    //console.log(response.toString());
    console.log(response.response)
    res.json({ message: response.response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
