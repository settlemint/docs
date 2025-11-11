import { ProvideLinksToolSchema } from '../../../lib/inkeep-qa-schema';
import { createOpenAI } from '@ai-sdk/openai';
import { convertToModelMessages, streamText } from 'ai';

export const runtime = 'edge';

const openai = createOpenAI();

export async function POST(req: Request) {
  const reqJson = await req.json();

  // Option 1: System message via the 'system' parameter
  const systemMessage = `You are a helpful AI assistant for SettleMint documentation.
Answer questions about blockchain, smart contracts, and the SettleMint platform.
Always provide relevant links when available using the provideLinks tool.`;

  // Option 2: Extract context from request (if provided)
  const context = reqJson.context || '';
  const currentPage = reqJson.currentPage || '';

  // Build system message with dynamic context
  let fullSystemMessage = systemMessage;
  if (currentPage) {
    fullSystemMessage += `\n\nCurrent page context: ${currentPage}`;
  }
  if (context) {
    fullSystemMessage += `\n\nAdditional context: ${context}`;
  }

  const result = streamText({
    model: openai('gpt-5-chat-latest'),
    system: fullSystemMessage,
    tools: {
      provideLinks: {
        inputSchema: ProvideLinksToolSchema,
      },
    },
    messages: convertToModelMessages(reqJson.messages, {
      ignoreIncompleteToolCalls: true,
    }),
    toolChoice: 'auto',
  });

  return result.toUIMessageStreamResponse();
}
