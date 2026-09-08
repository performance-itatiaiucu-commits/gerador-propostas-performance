# Gerador de Propostas Comerciais — Performance Saúde e Segurança Ocupacional

Aplicação web desenvolvida para elaboração, pré-visualização em tempo real e emissão em PDF das propostas comerciais da **Performance Saúde e Segurança Ocupacional**.

A ferramenta está **disponível online** via GitHub Pages e também pode ser executada offline como arquivo único (`index.html`), sem necessidade de instalação, banco de dados ou dependências externas.

[![Acessar Online](https://img.shields.io/badge/Acessar-Online-1F386E?style=for-the-badge&logo=github&logoColor=white)](https://performance-itatiaiucu-commits.github.io/gerador-propostas-performance/)
[![Versão](https://img.shields.io/badge/vers%C3%A3o-1.8-1F386E)](CHANGELOG.md)
[![Status Online](https://img.shields.io/badge/GitHub_Pages-Online-7FCC0E)](#)
[![Uso Offline](https://img.shields.io/badge/funciona-offline-04CCFF)](#)
[![Dependências](https://img.shields.io/badge/depend%C3%AAncias-nenhuma-9A66CB)](#)

---

## 🌐 Como Acessar e Usar

### 1. Acesso Online (Recomendado)
Acesse diretamente no navegador através do link oficial:  
👉 **[performance-itatiaiucu-commits.github.io/gerador-propostas-performance](https://performance-itatiaiucu-commits.github.io/gerador-propostas-performance/)**

### 2. Uso Local / Offline (Opcional)
Se preferir utilizar sem conexão à internet ou manter uma cópia local:
1. Abra o arquivo `index.html` em qualquer navegador moderno (Google Chrome ou Microsoft Edge recomendados).
2. O sistema funciona com todos os recursos locais disponíveis imediatamente.

---

## 🚀 Passo a Passo para Emissão

1. **Selecione o modelo** de proposta desejado (Tipos A a G).
2. **Preencha os dados do cliente e da proposta** (utilize o botão 🔎 para buscar CNPJ automaticamente pela Receita Federal).
3. **Selecione os serviços** no catálogo oficial ou adicione itens personalizados.
4. **Defina as condições comerciais**, formas de pagamento, prazos de entrega e descontos.
5. **Confira a pré-visualização** página a página em tempo real.
6. Clique em **⬇ Gerar PDF / Baixar PDF**.

### 🖨️ Configuração de Impressão (Salvar em PDF)
Na janela de impressão do navegador:
- **Destino:** `Salvar como PDF`
- **Papel:** `A4`
- **Margens:** `Nenhuma` (o layout já traz as margens e cabeçalhos embutidos)
- **Gráficos de segundo plano:** ✅ **Marcado** (necessário para preservar cores das tabelas e cabeçalhos)

> 📘 Guia completo de uso com todas as regras de negócio: [`docs/COMO_USAR.md`](docs/COMO_USAR.md)  
> 🎬 Vídeo tutorial passo a passo (4 min): [`docs/tutorial/tutorial-passo-a-passo.mp4`](docs/tutorial/tutorial-passo-a-passo.mp4) · [roteiro](docs/tutorial/ROTEIRO.md)

---

## 📋 Recursos e Funcionalidades

### 7 Tipos de Proposta
| Tipo | Modelo |
|:---:|:---|
| **A** | Proposta Comercial Padrão |
| **B** | Mensalista |
| **C** | eSocial — modelo por número de vidas |
| **D** | eSocial — modelo CFC |
| **E** | eSocial — contabilidade |
| **F** | LTCAT + Avaliações Ambientais (com GHE e deslocamento) |
| **G** | Fatores Psicossociais |

### Principais Recursos
- **Catálogo Oficial com 90 serviços** em 7 categorias (Exames, Programas SST, Laudos, Medições Ambientais, Psicossociais, Treinamentos e eSocial).
- **Consulta Automática de CNPJ**: busca razão social, endereço e dados cadastrais diretamente na base da Receita Federal via BrasilAPI (com fallback para CNPJá Open).
- **Upload de Logotipo do Cliente**: exibido na capa da proposta ao lado do logotipo institucional.
- **Gestão de Descontos**: desconto individual por item, desconto em lote (%) e desconto geral sobre o subtotal.
- **Condições e Formas de Pagamento**: à vista, PIX (com verificação automática se a empresa é optante pelo Simples Nacional), cartão de crédito (2x a 6x) e faturamento (15, 20, 30, 60 dias ou personalizado).
- **Prazos de Entrega Inteligentes**: 13 textos padronizados com seleção automática baseada nos serviços inseridos na proposta.
- **Regras Automáticas do LTCAT**: inclusão automática das 7 cláusulas comerciais ao adicionar medições ambientais.
- **Painel de Verificações**: aponta pendências e campos obrigatórios antes da impressão.
- **Persistência Local**: salvamento automático do rascunho em edição e histórico de até 40 propostas salvas no navegador.

---

## 📁 Estrutura do Repositório

```
gerador-propostas-performance/
├── index.html                   ← Aplicação web completa (HTML + CSS + JS embutidos)
├── .nojekyll                    ← Configuração para publicação no GitHub Pages
├── docs/
│   ├── COMO_USAR.md             ← Manual de uso e regras de negócio
│   └── github-pages-workflow.yml.txt
├── CHANGELOG.md                 ← Histórico de versões
├── LICENSE                      ← Licença do projeto
└── README.md                    ← Documentação principal
```

---

## 🛠️ Manutenção e Personalização

Toda a lógica e apresentação residem no arquivo `index.html`. Para atualizar parâmetros do sistema:

| O que alterar | Onde encontrar no `index.html` |
|---|---|
| Tabela de preços e serviços | `const CAT = [` |
| Consultores comerciais | `const VENDEDORES = [` |
| Prazos de entrega padrão | `const PRAZOS = [` |
| Cláusulas comerciais LTCAT | `const COND_LTCAT = [` |
| Textos contratuais padrão | `const TXT = {` |
| Dados cadastrais da empresa | `const CONTRATADA = {` |

---

## 🌐 Requisitos e Compatibilidade

- **Navegadores suportados**: Google Chrome, Microsoft Edge, Mozilla Firefox, Apple Safari.
- **Recomendação**: Chrome ou Edge para máxima fidelidade de quebra de página na geração do PDF.
- **Conectividade**: Totalmente funcional online e offline (a busca por CNPJ é o único recurso opcional que necessita de internet).

---

## 📄 Licença

© **Performance Saúde e Segurança Ocupacional**. Todos os direitos reservados.  
Uso interno e comercial exclusivo da empresa.
