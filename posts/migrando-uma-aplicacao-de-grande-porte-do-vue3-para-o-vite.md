---
title: Migrando uma Aplicação de Grande Porte do Vue 3 para o Vite
description: 'Minha experiência de migrar uma aplicação Vue 3 para Vite, em uma aplicação real e de grande porte.'
slug: migrando-uma-aplicacao-de-grande-porte-do-vue3-para-o-vite
canonical_url: https://michelrodrigues.net/blog/migrando-uma-aplicacao-de-grande-porte-do-vue3-para-o-vite
image: '/static/images/posts/migrando-uma-aplicacao-de-grande-porte-do-vue3-para-o-vite.webp'
date: '2025-01-27'
---

Atualmente, trabalho como engenheiro de software na Capim, e uma das iniciativas mais interessantes que temos semestralmente é o que chamamos de Contrato Capim. Basicamente,
trata-se de um compromisso com ações de desenvolvimento pessoal ou profissional que desejamos realizar ao longo do semestre.

Um dos itens em que me comprometi foi melhorar a experiência de desenvolvimento do nosso principal projeto front-end, além de otimizar o tempo de build e merge das PRs. Bem, confesso que não planejei os detalhes das ações ou como implementá-las, mas sempre que posso reservo 20% do meu tempo semanal para estudar melhorias e contribuir com a evolução da codebase. Faço isso a muito tempo desde outras empresas que passei, sempre me ajudou no futuro.

### Conhecendo um pouco mais a Capim

A Capim nasceu como uma fintech oferecendo serviços financeiros como, por exemplo, financiamento odontológicas e passou a ter também um SaaS para seus já clientes "clínicas odontológicas" terem funcionalidades como agenda, controle de paciente, maquininha de cartão (também temos) e muitas outras funcionalidades.

Toda a aplicação hoje roda em um monólito, com uma base de código bem grande, que foi iniciada no `Vue 2` e posteriormente migrada para `Vue 3`.

### Problemas que enfrentávamos no momento

- O tempo de build era muito longo.
- O live-reload era demorado e recarregava a tela inteira.
- Executar todos os testes de unidade localmente era inviável, mesmo em máquinas mais fortes demorava muito. Temos mais de 6k de testes só de unidade.

### Como conheci o vite?

Procurando como resolver os problemas já citados encontrei o `Vite` é uma ferramenta de build para aplicações front-end. E segundo sua própria documentação abre aspas `O nome vem do francês "vite", que significa rápido`, e foi exatamente o que me pareceu.
Foi criado para resolver problemas comuns enfrentados em projetos grandes, especialmente aqueles que dependem de ferramentas de bundling mais antigas, como `Webpack`.

#### **Principais benefícios**
1. Build mais rápido e eficiente
2. O `Vite` utiliza uma abordagem diferente para construir e servir o projeto. Durante o desenvolvimento, ele não `empacota` toda a aplicação em um único arquivo como o Webpack. Em vez disso, ele carrega módulos de forma incremental usando o `ES Modules` nativo do navegador.

**Primeiro problema: Build muito longo:**
1. O tempo de build diminuiria drasticamente.

**Segundo problema: Experiência de desenvolvimento:**

Diferentemente de outras ferramentas, o `Vite` faz `Hot Module Replacement (HMR)` em nível de módulo. Isso significa que apenas os módulos alterados são atualizados no navegador, sem a necessidade de recarregar toda a página, ou seja, alterações no código seriam refletidas quase instantaneamente no navegador.

1. Feedback instantâneo enquanto codamos.
2. Fluxo de trabalho mais produtivo e menos frustrante.

#### Então resumindo, iriamos resolver exatamente os dois problemas

### Apresentando o Vite para o time de engenharia

Mais uma das coisas legais que temos na Capim são as `Teck Talks`, apresentações realizadas, em média, quinzenalmente, onde qualquer desenvolvedor, independentemente do nível, pode compartilhar um assunto ou apresentar algo relevante para a empresa. Agendei uma Tech Talk sobre o `Vite` e preparei uma pequena `POC` para demonstrar como ele funcionava.

Na minha apresentação, destaquei os problemas que enfrentávamos com nosso build atual, introduzi o `Vite` como solução e expliquei como ele poderia resolver essas questões. E claro, mostrei a `POC` rodando ao vivo.

Posteriormente em uma das nossas reuniões da Guilda de Front-end, mais uma coisa legal que temos aqui, batemos o martelo e importante foi decidido em time que iriamos migrar nosso build do `vue-cli` para o `vite`.

### Problemas enfrentados na pesquisa
Falta de artigos sobre migração em projetos reais principalmente de grande porte. A maioria abordava apenas aplicações pequenas e simples.

### Plano de migração

Após entender o funcionamento do `Vite` e criar algumas POC`s, deixo aqui alguns dos artigos, posts que me ajudaram:

- https://vite.dev/guide/
- https://srivastavaankita080.medium.com/vue-cli-vite-migration-e1aba37e649d
- https://vueschool.io/articles/vuejs-tutorials/how-to-migrate-from-vue-cli-to-vite/


Dividi então a migração em diversas tarefas menores, todas apontadas para uma branch base.

#### **Corrigir imports sem .vue**

Atualizar todos os imports de componentes Vue para incluir a extensão .vue.

**ex:**
```
import HelloWorld from components/HelloWorld.vue
```

#### **Ajustar imports com require**

Imports com `require` não são suportados no `Vite`, então precisei atualizá-los para o padrão `ES Modules`.

#### **Separar libs externas**

Arquivos de bibliotecas gerados por terceiros foram movidos para a pasta public e importados globalmente com tags `<script>`.

Passo importante para evitar erros no build ou alertas.

**OBS**: É um projeto grande que passou por diversos contextos, desenvolvedores e momentos, sei que não é o ideal, mas já estava assim, então
não é a primeira vez que vi e acho que não vai ser a última onde arquivos de libs externas eram adicionados e
importados diretamente no projeto. Acho importante citar isso para evitar julgamentos desnecessários.

#### **Ajustar componentes carregados por demanda**

Um dos beneficios extra do `Vite` é que ele avisa sobre componentes muito grandes. Então foi muito bom para mapear
e ajustar seu import para ser usado junto do `defineAsyncComponent`.

#### **Migrar variáveis de ambiente**

As variáveis de ambiente no `Vite` devem começar com `VITE_` e ser acessadas via `import.meta`. Então esse passo
inicialmente seria um desafio. No projeto durante o tempo variáveis de ambiente foram implementadas de diversas
maneiras e muitas estavam espalhadas pela code base. E a questão, não é só fazer o clássico `find-replace`.
Dependendo do servidor onde se está hospedado, nosso caso, precisa se alterar variável a variável. Muito trabalho,
e potenciamente com risco de erros.

A solução foi um plugin que mantém a compatibilidade com `process.env` e `VUE_APP` chamada [vite-plugin-env-compatible](https://github.com/IndexXuan/vite-plugin-env-compatible). Instalação bem simples.

De bônus para padronizar, adicionei uma regra de `LINT` que gera um erro ao utilizar ou criar `env-vars` da maneira antiga.

#### **A migração do vite de fato**

Aqui, sem muitos segredos: em resumo, foi necessário remover bibliotecas que não eram mais utilizadas, de acordo com os guias, e instalar o `Vite`, no nosso caso, a versão 6. Atualizamos alguns pacotes para serem compatíveis com o `Vite` e substituímos o `vue-cli` pelo `vite`.

Removemos o arquivo `vue.config` e configuramos o `vite.config`, mantendo algumas configurações personalizadas do `Vite`, como, por exemplo, a porta de desenvolvimento local, import alias, bibliotecas externas para o `Rollup` ignorar, arquivos ou diretórios que não queremos que o `Vite` observe, e alguns componentes globais do nosso Design System.

É um pouco difícil dizer claramente o que cada projeto precisará remover ou atualizar além do recomendado, pois cada um tem suas particularidades, tamanho, etc. Mas, se fosse para resumir, diria o seguinte:

- O `Vite` não utiliza o `Babel`, e se você não pretende usar o Jest, como foi o nosso caso, pode remover qualquer biblioteca ou configuração relacionada ao `Babel`.
- Não é mais necessária uma biblioteca adicional para suporte ao `Sass` no `Vite`. Portanto, bibliotecas como `sass-loader` podem ser removidas, já que o `Vite` vem configurado para transpilar esses arquivos no build.
- Caso seu projeto utilize o `i18n`, como o nosso, a versão compatível deve ser superior à 10, com pequenos ajustes no setup.

#### **Instalar e configurar o Vitest**

Comecei removendo o `Jest`, incluindo qualquer plugin relacionado a ele, e instalamos o `Vitest`. Após isso, bastou substituir os scripts.

Partilarmente nesse projeto, temos muitas configurações personalizadas no `Jest` que precisaram ser mantidas também no `Vitest`, como plugins, import aliases,
dependências, arquivos de setup, mocks globais e pastas que queríamos excluir, como documentações.

O `Vitest` utiliza o ambiente `happy-dom`, que, segundo benchmarks, é muito mais rápido que o `jsdom`. No entanto, com ele, quase todos os nossos testes falharam.
Para manter a compatibilidade, decidimos continuar utilizando o `jsdom`.

Fizemos um pequeno ajuste em um dos nossos arquivos globais de mock para evitar ter que substituir em milhares de testes:
```
import { vi, describe } from vitest

globalThis.vi = vi
globalThis.jest = vi
globalThis.context = describe
```

Com isso, mocks como `jest.fn()` continuaram funcionando normalmente.

Como nem tudo são flores, o `Vitest` não é o `Jest` e possui muitas diferenças. Foi necessário ajustar cerca de 400 arquivos, com aproximadamente 3.000 testes
falhando após a migração. Grande parte desses problemas era causada por particularidades do `Vitest`, como funções que se comportam de maneira diferente, ex
o `spyOn`, que precisou ser atualizado.

Essa é uma tarefa meio desesperadora, como fazer para atualizar todos os testes no tempo que tenho e garantir que novos testes não entrem errado e seja um problema
no momento final da migração?

Em uma das reuniões da guilda, apresentei as dificuldades e demonstrei ao time como criar mocks e observar a execução e o retorno de funções de forma que não iria
gerar um erro no `Vitest`. Uma das principais diferenças é que, no `Vitest`, os `spy` precisam ser declarados antes do render do componente, por exemplo. Tivemos
outras diferenças, mas não foram significativamente grandes.

Esse foi o passo mais demorado de toda a migração, como o tempo que dedicado não é muito durou em torno de um pouco mais de um mês.

### **Ajustes finais**

Instalei também dois plugins adicionais no `Vite` para otimizar o bundle gerado durante o build e melhorar o desempenho geral da aplicação. São eles:

1. [vite-plugin-compression](https://www.npmjs.com/package/vite-plugin-compression): Responsável por comprimir os arquivos do bundle
2. [vite-plugin-imagemin](https://github.com/vbenjs/vite-plugin-imagemin): Utilizado para comprimir imagens

Existem diversos outros, mas para aquele momento achei relevante já ter eles desde o dia zero da migração orque eles trouxeram uma diferença significativa
no tamanho do bundle final

#### **Virada de chave.**

Agendei o dia do deploy e bloqueamos a branch principal. Em seguida, fizemos o merge da branch base da migração na branch de staging, e todos os times se uniram
para testar a aplicação.

Todos os testes automatizados que temos `Cypress`, `Vitest` e `Snapshot` estavam ok e surpreendentemente, os únicos problemas identificados durante os testes manuais foram
erros que já existiam, e aproveitando, corrigidos muitos deles. Foi bem legal e colaborativo, com a participação de muitos outros desenvolvedores.

Subimos a nova versão em produção e foi sem ocorrências relatadas.


### Concluindo
Uma migração de um caso caso real, baseado em uma aplicação de grande porte e utilizada diariamente por
milhares de clínicas. O resultado final foi melhor que o planejado, porque, além de ganharmos em experiência de desenvolvimento com todos os pontos já citados aqui,
temos um ganho consideravel relacionado a perfomance agora com os chunks do bundle divididos em partes menores, não é mais necessário carregar tudo de uma vez
para abrir a aplicação.