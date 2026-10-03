<?php
// Recebe o lead do formulário da LP, valida e repassa ao Go High Level.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, ['error' => 'Método não permitido.']);
}

$body = json_decode(file_get_contents('php://input'), true);
if (!is_array($body)) {
    respond(400, ['error' => 'Corpo da requisição inválido.']);
}

$str = fn($key) => (isset($body[$key]) && is_string($body[$key])) ? trim($body[$key]) : '';

$name = $str('name');
if (mb_strlen($name) < 2) {
    respond(400, ['error' => 'Informe um nome válido.']);
}

$phone = preg_replace('/\D/', '', $str('phone'));
if (strlen($phone) < 10 || strlen($phone) > 13) {
    respond(400, ['error' => 'Telefone deve ter DDD + número.']);
}
// Formato internacional (+55...) para o CRM não interpretar como número de outro país.
$phone = '+' . (strlen($phone) <= 11 ? '55' . $phone : $phone);

// Textos iguais aos do formulário (LeadForm.tsx), para e-mails e notificações do CRM.
$careForLabels = ['idoso' => 'Um idoso da família', 'outro' => 'Outra pessoa'];
$urgencyLabels = ['imediata' => 'O quanto antes', 'planejando' => 'Estou me planejando'];

$careFor = $str('careFor');
if (!isset($careForLabels[$careFor])) {
    respond(400, ['error' => 'Selecione para quem é o cuidado.']);
}

$urgency = $str('urgency');
if (!isset($urgencyLabels[$urgency])) {
    respond(400, ['error' => 'Selecione a urgência.']);
}

$payload = [
    'name' => mb_substr($name, 0, 120),
    'phone' => $phone,
    'careFor' => $careFor,
    'urgency' => $urgency,
    'careFor_label' => $careForLabels[$careFor],
    'urgency_label' => $urgencyLabels[$urgency],
    'utm_source' => mb_substr($str('utm_source'), 0, 200) ?: null,
    'utm_campaign' => mb_substr($str('utm_campaign'), 0, 200) ?: null,
    'utm_medium' => mb_substr($str('utm_medium'), 0, 200) ?: null,
    'page_url' => mb_substr($str('page_url'), 0, 500),
    'submitted_at' => gmdate('c'),
];

$config = require __DIR__ . '/config.php';
$webhook = $config['ghl_webhook_url'] ?? '';
if (!filter_var($webhook, FILTER_VALIDATE_URL)) {
    error_log('lead.php: URL do webhook do GHL não configurada em api/config.php');
    respond(502, ['error' => 'Não foi possível enviar seus dados agora. Tente novamente.']);
}

$ch = curl_init($webhook);
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($payload, JSON_UNESCAPED_UNICODE),
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT => 15,
]);
curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($status < 200 || $status >= 300) {
    error_log("lead.php: GHL respondeu {$status} {$error}");
    respond(502, ['error' => 'Não foi possível enviar seus dados agora. Tente novamente.']);
}

respond(200, ['ok' => true]);
