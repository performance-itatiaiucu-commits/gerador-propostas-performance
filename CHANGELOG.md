# Histórico de versões

Este projeto segue, de forma simplificada, o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/).

---

## [1.8] — 2026-09-01

### Adicionado
- **Busca automática de dados pelo CNPJ**, com botão ao lado do campo (ou tecla Enter).
  Preenche razão social, endereço, número, complemento, bairro, CEP, cidade e UF;
  telefone e e-mail só quando os campos estão vazios.
- Consulta em cascata: **BrasilAPI** e, em caso de falha, **CNPJá Open**.
- Aviso de **situação cadastral** quando a empresa não está ATIVA.
- O alerta do PIX agora informa, com base na Receita, se o contratante **é ou não**
  optante pelo Simples Nacional.

### Notas
- Único recurso que exige internet. Sem conexão, o preenchimento manual segue normal.
- Validação do dígito verificador acontece **antes** da consulta.

---

## [1.7] — 2026-09-01

### Alterado
- **Equipe comercial atualizada**: 7 consultores + Setor de Segurança do Trabalho.

### Corrigido
- A opção **"— outro —"** do seletor de vendedor não limpava os campos, mantendo
  o contato do vendedor anterior — havia risco de emitir proposta com e-mail e
  telefone errados. Agora zera os três campos e foca no nome.

---

## [1.6] — 2026-09-01

### Alterado
- **Catálogo substituído pela tabela oficial**: 90 itens em 7 grupos, incluindo
  o grupo novo de **Treinamentos** (30 itens).
- Unidades específicas preservadas: `função` (AET), `turma` (treinamentos),
  `pessoa`, `vida/mês` e `aval.` (medições).
- Prazo de entrega novo para **Treinamentos**; prazos de PGR e exames passaram
  a reconhecer os códigos novos.

### Corrigido
- Sugestões de itens apontavam para códigos que deixaram de existir
  (`PPRA`, `PCMSO15`, `PACOTE`) — remapeadas.

---

## [1.5] — 2026-09-01

### Alterado
- Espaço entre a data e as assinaturas ampliado de 12 mm para **28 mm**,
  acomodando assinatura manuscrita.

### Corrigido
- **Estouro de página** no bloco de Pagamento/Faturamento (bug pré-existente,
  confirmado por teste A/B). A seção de Faturamento passa a migrar para uma
  página própria quando o conteúdo excede a área útil.

---

## [1.4] — 2026-09-01

### Adicionado
- **Prazos de entrega por programa**, com 12 textos padronizados, seleção por
  caixas e 4 modos de operação (automático, manual, padrão e livre).
- Campo de observação adicional sobre prazos.

---

## [1.3] — 2026-09-01

### Adicionado
- **Desconto em lote**: aplica um percentual a todos os serviços de uma vez.

---

## [1.2] — 2026-09-01

### Adicionado
- Alerta interno ao selecionar **PIX**, sobre retenção de imposto em optantes
  do Simples Nacional. Não é impresso na proposta.

### Removido
- Nota sobre o sistema SOC.

---

## [1.1] — 2026-09-01

### Corrigido
- Bug em que os campos aceitavam **apenas a primeira letra** digitada, causado
  por re-renderização do formulário a cada tecla.

### Alterado
- Identidade visual aplicada: paleta oficial da marca e logos na capa,
  cabeçalho e rodapé.

---

## [1.0] — 2026-09-01

### Adicionado
- Versão inicial, a partir da análise de 7 modelos de proposta.
- 7 tipos de proposta (A–G), cadastro de cliente com upload de logo,
  itens com desconto, formas de pagamento, prazo de entrega, preview,
  salvamento do último preenchimento e geração de PDF.
- Regra automática das cláusulas do LTCAT quando há medições ambientais.
