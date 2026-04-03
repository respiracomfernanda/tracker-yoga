# Respira com Fernanda — Tracker de Alunas

## Arquivos

| Arquivo | Função |
|---|---|
| `index.html` | O tracker completo (hospedar no GitHub Pages) |
| `apps-script.js` | Código para colar no Google Apps Script |

---

## Passo 1 — Criar a planilha no Google Sheets

1. Acesse [sheets.google.com](https://sheets.google.com) e crie uma planilha nova
2. Copie o **ID da planilha** da URL:
   `https://docs.google.com/spreadsheets/d/**ESTE_TRECHO_É_O_ID**/edit`

---

## Passo 2 — Configurar o Google Apps Script

1. Acesse [script.google.com](https://script.google.com) → **Novo projeto**
2. Apague o código que aparece e cole todo o conteúdo de `apps-script.js`
3. Na linha `const SPREADSHEET_ID = 'COLE_AQUI_O_ID_DA_SUA_PLANILHA'`, substitua pelo ID copiado no passo anterior
4. Salve (Ctrl+S) e dê um nome ao projeto (ex: *Respira Tracker*)
5. Clique em **Implantar → Nova implantação**
6. Em "Tipo", escolha **Aplicativo da Web**
7. Configure assim:
   - Executar como: **Eu (seu e-mail)**
   - Quem tem acesso: **Qualquer pessoa**
8. Clique em **Implantar** e autorize quando pedir
9. Copie a **URL da implantação** (começa com `https://script.google.com/macros/s/...`)

---

## Passo 3 — Colar a URL no index.html

Abra o `index.html` e localize esta linha perto do início do `<script>`:

```js
const SHEETS_URL = 'COLE_AQUI_A_URL_DO_APPS_SCRIPT';
```

Substitua pelo endereço copiado no passo anterior.

---

## Passo 4 — Hospedar no GitHub Pages

1. Crie um repositório no GitHub (pode ser privado)
2. Faça upload do `index.html` (só este arquivo é necessário)
3. Vá em **Settings → Pages**
4. Em "Source", selecione **main branch → / (root)**
5. Aguarde 1-2 minutos e acesse o link gerado (ex: `seuusuario.github.io/nome-do-repo`)

---

## Como funciona a estrutura no Google Sheets

A cada registro, o script cria automaticamente uma aba com o nome do mês, separada por tipo:

| Aba criada | Conteúdo |
|---|---|
| `Abr 2026 · pagamento` | Pagamentos das alunas |
| `Abr 2026 · frequencia` | Presenças nas aulas |
| `Abr 2026 · checkin` | Check-ins Gympass/Totalpass |
| `Abr 2026 · repasse` | Repasses mensais dos apps |
| `Abr 2026 · espaco` | Seus pagamentos ao espaço |

---

## Observações

- Os dados ficam salvos **localmente no navegador** (localStorage) E **na planilha** simultaneamente
- Se abrir em outro dispositivo, os dados locais não aparecem — mas tudo está na planilha
- O indicador de conexão no topo da página mostra se o Sheets está respondendo
