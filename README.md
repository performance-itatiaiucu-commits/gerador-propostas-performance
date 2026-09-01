# Gerador de Propostas Comerciais — Performance Saúde e Segurança Ocupacional

Aplicação web de **arquivo único** para montar, pré-visualizar e imprimir em PDF as
propostas comerciais da Performance Saúde e Segurança Ocupacional.

Não tem instalação, não tem servidor, não tem dependência externa: é um `.html` que
abre com dois cliques em qualquer navegador moderno e **funciona offline**.

![versão](https://img.shields.io/badge/versão-1.8-1F386E)
![offline](https://img.shields.io/badge/funciona-offline-7FCC0E)
![sem dependências](https://img.shields.io/badge/dependências-nenhuma-04CCFF)

---

## Começando

1. Baixe o arquivo [`src/gerador_propostas.html`](src/gerador_propostas.html).
2. Dê duplo clique nele (ou arraste para o navegador).
3. Preencha, confira o preview e clique em **Gerar PDF**.

Na janela de impressão, escolha **"Salvar como PDF"**, papel **A4** e deixe
**margens em "Nenhuma"** — o layout já traz as margens corretas embutidas.

> Guia completo de uso, com todas as regras: [`docs/COMO_USAR.md`](docs/COMO_USAR.md)

---

## O que ele faz

**7 tipos de proposta** (A–G), cada um com seu conjunto de blocos, cláusulas e textos:

| Tipo | Modelo |
|------|--------|
| A | Proposta Comercial padrão |
| B | Mensalista |
| C | eSocial — modelo por número de vidas |
| D | eSocial — modelo CFC |
| E | eSocial — contabilidade |
| F | LTCAT + Avaliações Ambientais (com GHE e deslocamento) |
| G | Fatores Psicossociais |

**Principais recursos**

- **Catálogo com 90 serviços** em 7 grupos (exames, programas de SST, laudos,
  medições ambientais, psicossociais, treinamentos e eSocial), com valores oficiais.
- **Busca automática pelo CNPJ** — preenche razão social e endereço direto da
  base da Receita Federal (único recurso que exige internet).
- **Upload da logo do cliente**, exibida na capa ao lado da logo da contratada.
- **Descontos** por item, em lote (aplica um % em todos de uma vez) e desconto geral.
- **Formas de pagamento**: à vista, PIX, crédito em 2× a 6× e faturamento
  (15, 20, 30, 60 dias ou data personalizada).
- **Prazos de entrega por programa**, com 13 textos padronizados e modo manual.
- **Preview fiel** do PDF na própria tela, página a página.
- **Salva automaticamente** o último preenchimento e mantém histórico de 40 propostas.

**Regras automáticas**

- Ao incluir qualquer **medição ambiental** (ruído, poeira, vibração, calor etc.),
  as **7 cláusulas comerciais do LTCAT** entram sozinhas na proposta.
- Itens **mensais** são separados num bloco próprio de "Serviços Recorrentes".
- Selecionando **PIX**, aparece um aviso interno sobre retenção de imposto —
  e, se o CNPJ já foi consultado, o sistema informa se aquela empresa **é ou não**
  optante pelo Simples Nacional. Esse aviso **nunca é impresso** na proposta.
- Uma aba de **Verificações** aponta pendências antes de gerar o PDF.

---

## Estrutura

```
gerador-propostas-performance/
├── src/
│   └── gerador_propostas.html   ← a aplicação inteira (~180 KB)
├── docs/
│   └── COMO_USAR.md             ← guia de uso e manutenção
├── CHANGELOG.md
└── README.md
```

Tudo — HTML, CSS, JavaScript, as logos em base64 e os textos jurídicos — vive
dentro do único `.html`. Isso é proposital: o arquivo pode ser copiado para um
pen drive, anexado num e-mail ou colocado numa pasta de rede, e continua funcionando.

---

## Manutenção rápida

Abra o `.html` em qualquer editor de texto e procure por:

| O que mudar | Onde |
|---|---|
| Preços e serviços | `const CAT=[` |
| Equipe comercial | `const VENDEDORES=[` |
| Prazos de entrega | `const PRAZOS=[` |
| Cláusulas do LTCAT | `const COND_LTCAT=[` |
| Textos padrão | `const TXT={` |
| Dados da contratada | `const CONTRATADA={` |

O [guia de uso](docs/COMO_USAR.md) detalha o formato de cada um.

---

## Requisitos

Qualquer navegador atual (Chrome, Edge, Firefox ou Safari). Recomendado o
**Chrome ou Edge** para gerar o PDF, que respeitam melhor as quebras de página.

A **busca por CNPJ** consulta [BrasilAPI](https://brasilapi.com.br) e, como
alternativa, [CNPJá Open](https://open.cnpja.com) — ambas públicas e gratuitas.
Sem internet, o botão apenas avisa e o preenchimento manual segue normal.

---

## Licença

© Performance Saúde e Segurança Ocupacional. Todos os direitos reservados.

Software proprietário de uso interno. Não é permitida a redistribuição ou o uso
por terceiros sem autorização expressa.
