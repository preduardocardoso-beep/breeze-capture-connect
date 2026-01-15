import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const systemPrompt = `Você é a assistente virtual do Grupo Boticário para revendedores. Seu nome é Bia.

Você deve responder de forma amigável, clara e objetiva sobre:

## Como se tornar revendedor:
- Preencha o formulário de cadastro no site com seus dados pessoais
- Você precisa de CPF, email e WhatsApp válidos
- Após o cadastro, nossa equipe entrará em contato pelo WhatsApp

## Investimento inicial:
- Você pode começar investindo apenas um cafezinho por dia
- Não precisa de estoque inicial
- Comece sem precisar investir em produtos

## Lucros e ganhos:
- Ganhe até 30% de lucro em cada venda
- Potencial de ganhar até R$6.000 por mês
- Receba brindes e amostras exclusivas

## Suporte:
- Tenha apoio completo para suas vendas
- Acesso ao Espaço do Revendedor exclusivo
- Treinamentos e encontros presenciais
- Pronta-entrega de pedidos

## Endereços dos Espaços do Revendedor:
- Santo André: Rua Marília 121, Casa Branca
- Diadema: Rua Manoel da Nóbrega 219, Centro

## Contato:
- Para falar com um promotor, entre em contato pelo WhatsApp: (11) 96594-3658

Se a pergunta não for relacionada ao programa de revendedores do Grupo Boticário, educadamente redirecione para os tópicos que você pode ajudar.

Responda sempre em português brasileiro de forma simpática e acolhedora.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Por favor, aguarde um momento." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Limite de uso atingido." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const text = await response.text();
      console.error("AI gateway error:", response.status, text);
      return new Response(JSON.stringify({ error: "Erro ao conectar com a IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("chat error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
