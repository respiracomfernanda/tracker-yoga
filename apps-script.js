// ============================================================
// GOOGLE APPS SCRIPT — Respira com Fernanda
// Cole este código em: script.google.com → novo projeto
// ============================================================

const SPREADSHEET_ID = 'COLE_AQUI_O_ID_DA_SUA_PLANILHA';

// Cabeçalhos de cada aba
const HEADERS = {
  pagamento:  ['ID', 'Mês', 'Nome da Aluna', 'Data Pagamento', 'Repasse Escola', 'Observação', 'Registrado em'],
  frequencia: ['ID', 'Nome da Aluna', 'Data da Aula', 'Modalidade', 'Registrado em'],
  checkin:    ['ID', 'Nome da Aluna', 'Aplicativo', 'Data Check-in', 'Registrado em'],
  repasse:    ['ID', 'Aplicativo', 'Mês', 'Valor (R$)', 'Data Recebimento', 'Observação', 'Registrado em'],
  espaco:     ['ID', 'Nome do Espaço', 'Mês', 'Valor (R$)', 'Data Pagamento', 'Forma', 'Observação', 'Registrado em'],
};

// Nome da aba no formato "Abr 2026"
function nomeMes(mesStr) {
  if (!mesStr) return 'Sem mês';
  const [y, m] = mesStr.split('-');
  const nomes = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'];
  return nomes[parseInt(m) - 1] + ' ' + y;
}

// Retorna (ou cria) a sub-aba correta dentro da planilha do mês
function getSheet(ss, nomeMesAba, tipoLabel) {
  const nomeAba = nomeMesAba + ' · ' + tipoLabel;
  let sheet = ss.getSheetByName(nomeAba);
  if (!sheet) {
    sheet = ss.insertSheet(nomeAba);
    // Cabeçalho
    const headers = HEADERS[tipoLabel] || ['ID','Dados','Registrado em'];
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length)
      .setFontWeight('bold')
      .setBackground('#f0ede8');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  try {
    const dados = JSON.parse(e.postData.contents);
    const tipo = dados.tipo;
    const agora = new Date().toLocaleString('pt-BR', {timeZone: 'America/Sao_Paulo'});
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    let linha, mesAba;

    if (tipo === 'pagamento') {
      mesAba = nomeMes(dados.mes);
      const sheet = getSheet(ss, mesAba, 'pagamento');
      linha = [dados.id, dados.mes, dados.nome, dados.pgto||'', dados.rep||'', dados.obs||'', agora];
      sheet.appendRow(linha);

    } else if (tipo === 'frequencia') {
      mesAba = nomeMes(mesDeData(dados.data));
      const sheet = getSheet(ss, mesAba, 'frequencia');
      linha = [dados.id, dados.nome, dados.data, dados.mod||'', agora];
      sheet.appendRow(linha);

    } else if (tipo === 'checkin') {
      mesAba = nomeMes(mesDeData(dados.data));
      const sheet = getSheet(ss, mesAba, 'checkin');
      linha = [dados.id, dados.nome, dados.app, dados.data, agora];
      sheet.appendRow(linha);

    } else if (tipo === 'repasse') {
      mesAba = nomeMes(dados.mes);
      const sheet = getSheet(ss, mesAba, 'repasse');
      linha = [dados.id, dados.app, dados.mes, dados.valor||'', dados.data||'', dados.obs||'', agora];
      sheet.appendRow(linha);

    } else if (tipo === 'espaco') {
      mesAba = nomeMes(dados.mes);
      const sheet = getSheet(ss, mesAba, 'espaco');
      linha = [dados.id, dados.nome, dados.mes, dados.valor||'', dados.data||'', dados.forma||'', dados.obs||'', agora];
      sheet.appendRow(linha);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok: false, erro: err.toString()}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Necessário para ping de conexão
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ok: true, status: 'online'}))
    .setMimeType(ContentService.MimeType.JSON);
}

// Utilitário local (espelha o JS do front)
function mesDeData(d) {
  return d ? d.slice(0, 7) : null;
}
