# Gerador de Propostas — Como usar

## Como Acessar
- **Online (Recomendado):** Acesse diretamente pelo link: [performance-itatiaiucu-commits.github.io/gerador-propostas-performance](https://performance-itatiaiucu-commits.github.io/gerador-propostas-performance/)
- **Offline / Local:** Dê **duplo clique** em `index.html` para abrir no navegador (Chrome ou Edge recomendados). Não requer instalação ou servidor local.

## Fluxo de preenchimento

| Etapa | O que fazer |
|---|---|
| **1 · Tipo de proposta** | Escolha entre os 7 modelos (A–G). Isso já liga automaticamente os blocos, o foro, o emissor de NF e sugere os itens típicos. |
| **2 · Dados da proposta** | Nº, revisão, data, validade, vendedor (preenche e-mail/telefone sozinho), emissor de NF e responsável pela aprovação. |
| **3 · Dados do cliente** | Razão social, CNPJ (com validação de dígito verificador), endereço, representante e **upload da logo**. |
| **4 · Itens negociados** | Escolha do catálogo ou crie item livre. Cada linha tem Qtd, Unidade, Valor e **% de desconto**. Abaixo há o **desconto geral** sobre o subtotal. |
| **5 · Regras automáticas** | Mostra o que foi ligado sozinho e permite forçar/desligar qualquer bloco. |
| **6 · Formas de pagamento** | À Vista, PIX, Crédito (2x a 6x) e Faturamento (15/20/30/60 dias ou data personalizada). Pode combinar várias. |
| **7 · Prazo de entrega** | Usa o texto padrão do tipo ou um texto livre seu. |

O **preview A4 à direita atualiza a cada tecla**. Quando estiver certo, clique em **⬇ Baixar PDF**.

## A regra do LTCAT é automática
Ao adicionar **qualquer item do grupo "Medições Ambientais"** (Ruído, Poeira, Vibração, BTX, Fumos, Tricloroetileno, Calor, Químicos), o app **inclui sozinho** a seção **Condições Comerciais** com as 7 cláusulas do modelo LTCAT:

1. Planejamento dos deslocamentos
2. Deslocamentos adicionais
3. Escopo e precificação
4. **Manutenção do valor contratado** (reduções não geram desconto proporcional)
5. Reprogramação por responsabilidade do contratante
6. Alterações de escopo
7. Inclusão de novas medições ou serviços

Um aviso verde confirma na tela. Também alerta se houver medição **sem item de Deslocamento**.
Na seção 5 você pode desmarcar manualmente, se em algum caso não quiser.

## Salvar o PDF corretamente
Ao clicar em **Baixar PDF** abre a janela de impressão. Configure:
- **Destino:** "Salvar como PDF"
- **Margens:** Nenhuma (ou Padrão)
- **Gráficos de segundo plano:** ✅ **marcado** (senão as tabelas saem sem cor)

## Salvamento automático
- O preenchimento é salvo sozinho no navegador — feche e reabra que continua onde parou.
- **Salvar no histórico** guarda uma cópia nomeada (até 40 propostas).
- **Histórico** lista e recarrega qualquer proposta salva.
- **Nova** começa do zero.

> ⚠️ Os dados ficam no navegador daquele computador. Trocar de máquina ou limpar os dados do navegador apaga o histórico. Guarde sempre o PDF gerado.


## Identidade visual aplicada

O logotipo do **Grupo Performance** está **embutido dentro do arquivo** (não depende de imagem externa) e aparece em:
- **Capa** — em destaque no topo esquerdo, com a logo do cliente à direita
- **Cabeçalho de todas as páginas** — primeira coluna
- **Rodapé de todas as páginas** — junto aos endereços das unidades
- **Barra superior do app**

### Paleta extraída do logotipo
| Cor | Código | Uso no documento |
|---|---|---|
| Azul institucional | `#1F386E` | Títulos, cabeçalhos de tabela, textos de destaque |
| Ciano | `#04CCFF` | Barra de seção, faixa tricolor, detalhes |
| Verde | `#7FCC0E` | Subtítulos, caixa de validade, borda do box da capa |
| Roxo | `#9A66CB` | Faixa tricolor, borda inferior da capa |
| Índigo (sobreposição) | `#6766CC` | Gradiente da barra do app |

A **faixa tricolor** (ciano → verde → roxo), que remete aos três círculos do logotipo, aparece sob o título da capa, no topo do app e acima do rodapé de cada página.

> Para trocar o logotipo no futuro, procure `const LOGO_POP="data:image/png;base64,...` no arquivo e substitua pelo novo base64. As cores estão em `:root{` no topo do CSS.

## Recursos por tipo

| Tipo | Particularidade automática |
|---|---|
| **A** eSocial Contábil | Sem seção de Contratante; sem coluna de aprovação na capa; foro Itatiaiuçu |
| **B** eSocial CFC | Itens mensais somam "Total da Mensalidade" (PGR/24 + PCMSO/12 + valor/vida) |
| **C** eSocial por vidas | Faixas 1–100 / 101–180 / 181+ |
| **D** Mensalista | Valor por colaborador ativo/mês, PPRA+PCMSO inclusos |
| **E** Documentação Legal | Bloco de NF (2 CNPJs), foro Itaúna, sem vigência/rescisão |
| **F** LTCAT | GHE + deslocamento + condições comerciais + linha TOTAL |
| **G** Psicossociais | Relação de empregados calcula **Método 1** (todos) e **Método 2** (mín. 3 por cargo) |

### Botões que economizam tempo
- **Aplicar aos itens de documentação** — insere "e requisitos da [Cliente Final]" nas descrições.
- **Sincronizar quantidades com o Objeto** (GHE) — copia os totais por agente para as quantidades cotadas, eliminando a divergência que existia nos PDFs antigos.
- **Aplicar M1 / M2** (psicossociais) — lança o item já com a quantidade correta calculada.

## Verificações antes de gerar
O painel avisa sobre: razão social vazia, proposta sem itens, item sem descrição ou **sem valor**, CNPJ inválido, nenhuma forma de pagamento, prazo não informado, medição sem deslocamento, **divergência entre GHE e Objeto**, e foro diferente do padrão do emissor de NF.

## Personalizar preços e textos
Abra o arquivo em um editor de texto (Bloco de Notas, VS Code) e procure:
- `const CAT=[` — catálogo de serviços e preços
- `const VENDEDORES=[` — equipe comercial
- `const TXT={` — textos das cláusulas
- `const COND_LTCAT=[` — as 7 cláusulas de condições comerciais

---

## Nota técnica — correção de digitação (v1.1)

**Sintoma:** ao digitar, apenas a primeira letra era aceita e o cursor saía do campo.

**Causa:** cada tecla disparava a reconstrução completa do formulário, destruindo o campo que estava em foco.

**Correção:** a digitação agora é separada das mudanças de estrutura.
- **Campos de texto/número** usam um caminho leve: atualizam o estado e o preview, **sem recriar o formulário** — o cursor nunca é perdido.
- **Caixas de seleção e listas** (que precisam mostrar/ocultar campos, como "Crédito" abrindo as parcelas) continuam reconstruindo o formulário, com **foco e posição de rolagem preservados**.
- O preview é atualizado com um pequeno atraso (160 ms) após a última tecla, deixando a digitação fluida.
- Totais, validações, contagens do GHE e dos métodos psicossociais são atualizados **no lugar**, sem recriar campos.

---

## v1.2 — Nota do sistema SOC removida

O parágrafo institucional sobre o software SOC ("O Grupo Performance Ocupacional utiliza o sistema operacional SOC…") foi **removido do app**: saiu o texto, a caixa de seleção do formulário e a lógica que o inseria no PDF.

As propostas dos tipos A, B, C e D não trazem mais esse bloco de observação após a tabela do Objeto.

> As descrições dos **serviços de eSocial** continuam mencionando "com utilização do sistema SOC", pois isso faz parte do nome do serviço nos modelos originais. Se quiser tirar também, edite o `const CAT=[` e remova o trecho das descrições `ESOC_VIDA` e `ESOC_EMP`.

---

## v1.3 — Alerta do PIX e desconto em lote

### Alerta de retenção de imposto (PIX)
Ao marcar **PIX**, aparece um aviso em destaque logo abaixo da opção:

> ⚠ **Atenção — retenção de imposto**
> Confirme com o **Setor Financeiro** a necessidade de **retenção de impostos**, pois algumas empresas optantes pelo **Simples Nacional** possuem regra específica de retenção.

O mesmo aviso é repetido no painel **Verificações**, no rodapé do formulário, para não passar despercebido antes de gerar o PDF.

> É um **aviso interno da equipe**: não é impresso na proposta do cliente. No PDF, o PIX continua aparecendo normalmente apenas como forma de pagamento aceita.

### Aplicar desconto % em todos os serviços
Na seção **4 · Itens negociados**, abaixo da tabela, há uma caixa nova:

- Digite o percentual (ex.: `10`) e clique em **Aplicar a todos os itens** — preenche a coluna *Desc.%* de todas as linhas de uma vez.
- Depois você pode **ajustar linha a linha** normalmente; o valor em lote é só o ponto de partida.
- **Zerar descontos** limpa os descontos por item, o desconto geral e o campo de lote, voltando aos valores de tabela.

Continua valendo o **desconto geral sobre o subtotal**, que é aplicado *depois* dos descontos por item.

---

## v1.4 — Prazos de entrega por programa (caixas de seleção)

A seção **7 · Prazo de entrega** agora tem 4 modos:

| Modo | Como funciona |
|---|---|
| **Automático** *(padrão)* | Marca sozinho os prazos dos serviços que estão na proposta. Cada um ganha o selo verde **"na proposta"**. |
| **Escolher** | Libera as caixas para marcar/desmarcar manualmente. Ao entrar neste modo, já vem com a seleção automática como ponto de partida. |
| **Texto padrão do tipo** | Usa o texto genérico do modelo (comportamento anterior). |
| **Texto livre** | Você escreve o prazo do zero. |

### Prazos cadastrados

| Programa | Prazo |
|---|---|
| PGR | 5 dias após o recebimento de todas as informações completas por parte do cliente |
| PCMSO | 5 dias após o recebimento de todas as informações completas por parte do cliente |
| LTCAT | 30 dias após a conclusão dos levantamentos ambientais (medições) |
| APR | Prazo mínimo de 10 dias |
| PPR | 3 dias após a aprovação da proposta |
| PCA | 3 dias após a aprovação da proposta |
| Laudo de Insalubridade | 5 dias após a aprovação da proposta |
| Laudo de Periculosidade | 5 dias após a aprovação da proposta |
| AET (Laudo de Ergonomia) | 20 dias após os levantamentos de campo |
| Plano de Assédio Moral e Sexual | 2 dias após o recebimento das informações completas por parte do cliente |
| Fatores/Riscos Psicossociais | 15 dias úteis após a coleta de informações em campo |
| Exames complementares / ASO | 3 dias após realização; ASO com laboratoriais de 5 a 7 dias |

Só entram no PDF os prazos marcados — nada de prazo de serviço que o cliente não contratou.

Há ainda um campo de **observação adicional sobre prazos**, que sai como um parágrafo extra ao final da seção.

> Se a proposta só tiver serviços sem prazo específico (ex.: apenas gestão de eSocial), o modo Automático usa o **texto padrão do tipo**, para a seção nunca sair vazia.

### Editar os prazos no futuro
Procure `const PRAZOS=[` no arquivo. Cada linha tem `rot` (o nome no formulário), `txt` (o texto que sai no PDF) e `cods` (os códigos de serviço que disparam a marcação automática).

---

## v1.5 — Mais espaço para assinatura

O espaço entre a **data** e a **linha de assinatura** aumentou de 12 mm para **28 mm** (+3 linhas), deixando a área mais confortável para assinar à mão no documento impresso.

Aproveitei para corrigir um problema que já existia: em propostas com muitas condições de pagamento (várias parcelas + vários prazos de faturamento + observações), a página de Pagamento/Faturamento **estourava o limite da folha** e o conteúdo era cortado no PDF.

Agora o gerador **estima o peso do conteúdo** e, quando não cabe, move a seção de Faturamento para a página seguinte automaticamente. Em propostas enxutas nada muda — as duas seções continuam na mesma página, sem folha extra.

---

## v1.6 — Nova tabela de produtos, serviços e valores

O catálogo (`const CAT=[`) foi **totalmente substituído** pela tabela oficial
`Tabela_de_Servicos_e_Valores_Performance.pdf`. São **90 itens** em **7 grupos**:

| # | Grupo (aparece no seletor) | Itens | Faixa de valores |
|---|---|---|---|
| 1 | Exames Ocupacionais | 22 | R$ 11,87 – R$ 260,00 |
| 2 | Programas de SST | 10 | R$ 400,00 – R$ 650,00 |
| 3 | Laudos e Análises Técnicas | 4 | R$ 230,00 – R$ 600,00 |
| 4 | Medições Ambientais | 17 (16 + Deslocamento) | R$ 190,00 – R$ 980,00 |
| 5 | Psicossociais | 3 | R$ 200,00 – R$ 400,00 |
| 6 | Treinamentos | 30 | R$ 300,00 – R$ 6.500,00 |
| 7 | eSocial / Mensal | 4 | R$ 12,80 – R$ 80,00 |

### Unidades que NÃO são "un" (atenção ao cotar)
- **Laudo Ergonômico / AET** → `função` (R$ 230,00 **por função**).
- **Treinamentos** → `turma` (valor fechado por turma, **sem carga horária definida**).
- **Supervisor Seguro – Mineração Usiminas** → `pessoa` (R$ 300,00 por pessoa).
- **Riscos Psicossociais Método 1** → `grupo de até 3 colab.`; **Método 2** → `colab.`.
- **Gestão eSocial por colaborador** → `vida/mês` (item **mensal**, entra no bloco
  "Serviços Recorrentes"); **Gestão eSocial por empresa** → `mês`.
- **Medições ambientais** → `aval.` (por avaliação/ponto).

### Observações da tabela oficial (repassadas pelo PDF)
- Onde havia **faixa de preço**, foi adotado o **valor mínimo**. Ajuste manualmente
  na coluna "Valor unit." quando o escopo justificar valor maior.
- **Não** estão embutidos adicionais de **urgência**.
- Programas de SST, Laudos e Análises Técnicas usam **valor mínimo**;
  Medições Ambientais usam **valor padrão**.

### O que continua funcionando igual
- Os **16 itens de Medições Ambientais** mantêm `med:1` + `ag:"<agente>"`, então
  continuam **disparando automaticamente as 7 cláusulas do LTCAT** e alimentando a
  lista de agentes na tela de Verificações.
- **Deslocamento** mantém `desl:1`.
- Os itens mensais (`mensal:1`) seguem indo para a tabela de **mensalidade**.
- **Prazos de entrega**: além dos 12 existentes, foi acrescentado o prazo
  **"Treinamentos"** (agendamento entre as partes), e os prazos de PGR e Exames
  passaram a reconhecer também os novos códigos (PGR com ART, NR-18, NR-22,
  PGRTR, PGRSS; EEG, Raio-X lombossacra, toxicológicos, TGO/TGP/GGT/VDRL etc.).
- **Sugestões por tipo de proposta** foram remapeadas para códigos existentes
  (os antigos `PPRA`, `PCMSO15` e `PACOTE` deixaram de existir).

### Como alterar um preço
Localize `const CAT=[` e edite o campo `v:` do item desejado. Exemplo:

```js
{g:"Programas de SST",c:"PGR",d:"PGR – Programa de ...",u:"un",v:450},
                                                              ^^^^^ altere aqui
```

Para **acrescentar** um serviço, copie uma linha do grupo e troque `c` (código único),
`d` (descrição), `u` (unidade) e `v` (valor). Se for medição ambiental, inclua
`med:1,ag:"Nome do Agente"`; se for mensal, `mensal:1`.

---

## v1.7 — Equipe comercial atualizada

A lista `const VENDEDORES=[` passou a ter **8 opções**: 7 consultores + o
**Setor de Segurança do Trabalho**.

| Nome | E-mail | Telefone |
|---|---|---|
| Robson L. S. Sica | robson@performanceocupacional.med.br | (31) 9 8684-0042 |
| Gladston G. Nascimento | consultorcomercial@performanceocupacional.med.br | (31) 9 9817-7023 |
| Peterson C. Silva | peterson@performanceocupacional.med.br | (31) 9 9693-4451 |
| Filipe G. A. Resende | filipe@performanceocupacional.med.br | (31) 9 8511-1991 |
| Patrícia C. Rezende | patricia@performanceocupacional.med.br | (31) 9 8511-1991 |
| Thiago H. F. Queiroz | thiago@performanceocupacional.med.br | (31) 9 8511-1991 |
| Jaíne Ap. Guedes | esocial@performanceocupacional.med.br | (31) 9 9753-8533 |
| Setor de Segurança do Trabalho | seguranca.ita@performanceocupacional.med.br | (31) 3572-1818 |

> Filipe, Patrícia e Thiago compartilham o mesmo telefone **(31) 9 8511-1991**,
> exatamente como informado. Se algum for número próprio, basta corrigir o `t:`.

### Opção "— outro (preencher manualmente) —"
Continua disponível no seletor, para quem **não está na lista**. Ao escolhê-la,
os três campos (nome, e-mail e telefone) são **limpos** e o cursor vai direto
para o nome — antes ela mantinha os dados do vendedor anterior, o que dava
margem a enviar proposta com o contato errado. Os dados digitados à mão são
preservados no autosave e saem normalmente na capa e no fecho da proposta.

### Como editar a equipe
Localize `const VENDEDORES=[` e edite/adicione linhas no formato:

```js
{n:"Nome do Consultor",e:"email@performanceocupacional.med.br",t:"(31) 9 0000-0000"},
```

O **primeiro da lista** é o vendedor carregado por padrão em toda proposta nova.

---

## v1.8 — Busca automática de dados pelo CNPJ

Ao lado do campo **CNPJ** há agora o botão **🔎 Buscar** (ou tecle **Enter** no campo).
O sistema consulta a base pública da **Receita Federal** e preenche sozinho:

**Razão Social · Endereço · Nº · Complemento · Bairro · CEP · Cidade · UF**
e, se estiverem em branco, também **Contatos (telefone)** e **E-mail**.

### Como funciona
1. Valida o **dígito verificador** antes de consultar (não gasta consulta à toa).
2. Consulta a **BrasilAPI** (`brasilapi.com.br/api/cnpj/v1/`).
3. Se ela falhar, tenta automaticamente a **CNPJá Open** (`open.cnpja.com/office/`).
4. Se as duas falharem, avisa e **mantém o preenchimento manual** normal.

Os textos vêm em CAIXA ALTA da Receita e são convertidos para
"Nome Próprio" (preservando LTDA, S/A, ME, EPP, EIRELI). CNPJ, CEP e telefone
são formatados automaticamente.

### Dois avisos úteis que a consulta traz
- **Situação cadastral**: se a empresa não estiver **ATIVA** (baixada, suspensa,
  inapta), aparece um alerta em vermelho para conferir antes de emitir a proposta.
- **Simples Nacional**: o alerta do PIX passa a informar, com base na Receita, se
  aquele contratante **é** ou **não é** optante — em vez do texto genérico.
  Continua sendo **aviso interno**, não é impresso na proposta.

### ⚠ Requisito: internet
Esta é a **única** função do sistema que precisa de conexão. Todo o resto
(incluindo gerar o PDF) continua funcionando **100% offline**. Sem internet, o
botão apenas avisa e você preenche à mão, como sempre.

> Os dados vêm de bases públicas e podem estar **desatualizados** em relação a
> uma alteração contratual recente. Sempre confira a razão social e o endereço
> antes de emitir — os campos ficam totalmente editáveis após a busca.

### Trocar a fonte de dados
Se um dia quiser usar uma API paga/própria (com token), edite a função
`buscarCNPJ()` e troque a URL do `fetch`. O mapeamento dos campos está logo
abaixo de cada chamada, no objeto `d={...}`.
