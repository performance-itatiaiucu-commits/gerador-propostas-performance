# Histórico de versões

Este projeto segue, de forma simplificada, o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/).

---

## [1.11] — 2026-09-21

### Alterado
- **Rodapé das páginas** passa a exibir o **bairro** junto ao endereço das
  unidades: Itatiaiuçu (Centro), Itabira (Centro) e São José do Rio Preto
  (Redentora).
- Endereço da unidade de **São José do Rio Preto** atualizado para
  **Rua Ondina, 156 e 182** (rodapé e tabela "Nossas Unidades").
- As colunas do rodapé agora se ajustam ao conteúdo, mantendo cada endereço em
  uma única linha e a altura do rodapé inalterada.

---

## [1.10] — 2026-09-18

### Adicionado
- **2 novas regras no item "Regras Automáticas"** (cartão 5 do formulário),
  ambas emitidas no PDF como seções próprias com numeração dinâmica, logo após
  as Condições Comerciais:
  - **Serviço de Transporte "Leva e Traz"** — entra **automaticamente** quando a
    proposta contém exames ocupacionais (códigos `EX_*`); pode ser desmarcada
    manualmente. O painel de Verificações avisa quando o total de exames fica
    abaixo do mínimo de 3 colaboradores do serviço sem custo adicional.
  - **Atendimento In Loco** — marcada quando os exames serão realizados nas
    instalações da CONTRATANTE (agenda com antecedência mínima de 7 dias
    corridos, espaço físico adequado, cabine audiométrica laudada quando
    necessária e infraestrutura elétrica 220/127 V com tomada industrial STECK).
- Compatibilidade com rascunhos antigos: propostas salvas antes da mudança
  (sem as chaves `transp`/`inloco`) continuam funcionando, com as regras
  resolvidos pelo modo automático.

---

## [1.9] — 2026-09-01

### Alterado
- **Novo favicon** com o símbolo oficial da marca Grupo Performance Ocupacional
  (círculos sobrepostos ciano e roxo com lente índigo e pétala verde), recriado
  em SVG vetorial a partir da identidade visual (Missão/Visão/Valores).

### Adicionado
- Pacote completo de ícones: `favicon.svg`, `favicon.ico` (16/32/48px),
  PNGs 16/32/48/192/512px e `apple-touch-icon.png` (180px) para iOS.
- `site.webmanifest` (PWA) e `meta theme-color` para dispositivos móveis.

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
- Nota sobre o sistema ESO.

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
