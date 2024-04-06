import { serve } from "https://deno.land/std/http/server.ts";
import { json } from "https://deno.land/x/sift/mod.ts";

console.log("Serving request from the edge!");

async function handler(req: Request): Promise<Response> {
  if (req.method !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  try {
    const openAIKey = Deno.env.get("OPENAI_KEY");
    if (!openAIKey) {
      throw new Error("OpenAI API key is not defined in the environment variables.");
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openAIKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo-instruct",
        messages: [
          {
            role: "user",
            content: "Say hi to me in Chinese!",
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      }),
    });

    if (!response.ok) {
      // It's a good practice to handle non-2xx responses as well
      console.log(response)
      throw new Error(`Failed to fetch from OpenAI: ${response.statusText}`);
    }

    const data = await response.json();
    return json(data); // Using Sift's `json` helper for convenience
  } catch (error) {
    console.error("Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// Start the server
serve(handler);
