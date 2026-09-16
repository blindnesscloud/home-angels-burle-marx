# Integração com CRM (Go High Level, trocável)

## Decisão

Formulário próprio (Next.js, controle total de design/performance) → rota de
API interna `/api/lead` → adaptador de CRM. Trocar de CRM no futuro significa
trocar a implementação de um adaptador, nunca o formulário nem o design.

```
[Formulário LP] → POST /api/lead → valida payload → adapter.sendLead(payload)
                                                          │
                                                          └── hoje: Go High Level
                                                              amanhã: outro CRM
```

## Adaptador ativo: Go High Level (Inbound Webhook)

Caminho mais simples e robusto para o franqueado: no GHL, criar um Workflow com
gatilho **"Inbound Webhook"**, copiar a URL gerada e configurar como variável de
ambiente. Não exige gerenciar token de API nem Location ID no código.

Variável de ambiente necessária (não commitar valor real):

```
GHL_INBOUND_WEBHOOK_URL=<url do webhook fornecida pelo workflow do GHL>
```

Payload enviado (JSON):

```json
{
  "name": "string",
  "phone": "string (E.164 ou formato BR)",
  "careFor": "idoso | outro",
  "urgency": "imediata | planejando",
  "utm_source": "string | null",
  "utm_campaign": "string | null",
  "utm_medium": "string | null",
  "page_url": "string",
  "submitted_at": "ISO 8601"
}
```

## Trocar de CRM no futuro

Implementar um novo arquivo em `web/src/lib/crm/<novo-crm>.ts` respeitando a
mesma assinatura `sendLead(payload): Promise<void>` usada pelo adapter do GHL
(`web/src/lib/crm/ghl.ts`), e apontar `web/src/lib/crm/index.ts` para o novo
adapter. Nenhuma outra parte do código muda.

## Pendência do cliente antes de produção

1. Criar o Workflow "Inbound Webhook" no GHL da unidade Burle Marx e enviar a
   URL gerada (é um segredo — nunca commitar no repositório, apenas em
   variável de ambiente no provedor de deploy).
2. Confirmar quais campos de UTM o time de mídia paga já usa nas campanhas do
   Google Ads, para garantir que o mapeamento de origem bate no CRM.
