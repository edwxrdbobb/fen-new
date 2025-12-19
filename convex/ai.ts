import { action } from "./_generated/server";
import { v } from "convex/values";

export const chat = action({
  args: {
    message: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Use the bundled OpenAI API
      const response = await fetch(`${process.env.CONVEX_OPENAI_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.CONVEX_OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-nano",
          messages: [
            {
              role: "system",
              content: `You are a helpful AI assistant for Freetown, Sierra Leone. You help users discover locations, events, and experiences in Freetown. You have knowledge about:

- Popular attractions like Cotton Tree, Lumley Beach, National Museum
- Hotels like Radisson Blu Mammy Yoko, Bintumani Hotel
- Restaurants and local cuisine
- Cultural sites and historical landmarks
- Transportation options including Aberdeen Ferry Terminal
- Events and festivals
- Local markets and shopping
- Nature spots like Tacugama Chimpanzee Sanctuary

Provide helpful, accurate, and friendly responses about Freetown. If asked about specific locations or events, provide details about what makes them special, how to get there, and what to expect. Keep responses concise but informative.`
            },
            {
              role: "user",
              content: args.message
            }
          ],
          max_tokens: 500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";
    } catch (error) {
      console.error("AI Chat error:", error);
      return "I'm experiencing some technical difficulties right now. Please try asking your question again in a moment.";
    }
  },
});
