# Integração com CRM (Go High Level, trocável)

## Decisão

Formulário próprio (Next.js exportado como site estático) → endpoint PHP
`/api/lead.php` na hospedagem (Hostinger) → Go High Level. Trocar de CRM no
futuro significa alterar só o envio dentro de `lead.php`, nunca o formulário
nem o design.

```
[Formulário LP] → POST /api/lead.php → valida payload → POST no webhook do CRM
                                                          │
                                                          └── hoje: Go High Level
```

## Adaptador ativo: Go High Level (Inbound Webhook)

Caminho mais simples e robusto para o franqueado: no GHL, criar um Workflow com
gatilho **"Inbound Webhook"**, copiar a URL gerada e colar em
`api/config.php` no servidor. Não exige gerenciar token de API nem Location ID
no código. O `.htaccess` da pasta `api/` bloqueia o acesso direto ao
`config.php`.

Payload enviado (JSON):

```json
{
  "name": "string",
  "phone": "string, formato internacional (+5511999998888)",
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

Alterar o trecho de envio (curl) no fim de `web/public/api/lead.php` para o
formato do novo CRM. A validação e o formulário continuam iguais.

## Pendência do cliente antes de produção

1. Criar o Workflow "Inbound Webhook" no GHL da unidade Burle Marx e enviar a
   URL gerada (é um segredo — nunca commitar no repositório, apenas colar em
   `public_html/api/config.php` na Hostinger).
2. Confirmar quais campos de UTM o time de mídia paga já usa nas campanhas do
   Google Ads, para garantir que o mapeamento de origem bate no CRM.
