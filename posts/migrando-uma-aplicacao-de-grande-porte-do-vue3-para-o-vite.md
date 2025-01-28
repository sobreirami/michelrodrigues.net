---
title: Migrando uma Aplicação de Grande Porte do Vue 3 para o Vite
description: '123'
slug: migrando-uma-aplicacao-de-grande-porte-do-vue3-para-o-vite
canonical_url: https://michelrodrigues.net/blog/migrando-uma-aplicacao-de-grande-porte-do-vue3-para-o-vite
date: '2025-01-27'
---

Atualmente trabalho como engenheiro de software na Capim e uma das coisas bem legais que temos aqui semestralmente é o que chamamos de
contrato capim, basicamente é um compromisso que mantemos em relações algumas ações de desenvolvimento pessoal ou profissional que
queremos no semestre.

Um dos meus itens que me comprometi foi melhorar a experiência de desenvolvimento do nosso principal projeto front-end e também o tempo que tinhamos de build e merge das PR`s.

Bem na hora não pensei muito bem nas ações, como iria fazer, plano, etc. Eu tenho como compromisso meu sempre reserva um tempo na semana cerca de 20% para
esdutar melhorias, e fazer PR`s contribuindo para evolução da nossa code-base, sempre fiz isso por onde passei, as vezes até mesmo fora do horário de trabalho só para facilitar
minha vida um pouco mais.

### Conhecendo um pouco mais a Capim
A Capim é um Saas para clínica odontológicas, temos diversas funcionalidades como agenda, financeiro e até financiamento odontológica ou maquininha de cartão. Também oferecemos
serviços financeiros e tudo isso roda em um monolito e em uma base de código bem grande, que iniciou no Vue 2 e depois migrou para o Vue3.

### Problemas que enfrentavamos no momento
Build demorava muito, codar com live-reload além de muito demorado sempre recarregava a tela inteira, era impossível rodar todos os testes de unidade localmente,
simplesmente trava sua maquina, pode ter 32GB de RAM kkkk

### Porque eu escolhi migrar nosso build para o Vite e Vitest?
build muito mais rápido, hot module replacement (HMR) otimizado, suporte a módulos ES nativos e melhor experiência de desenvolvimento.


### Problemas enfrentados na pesquisa:
Falta de artigos sobre migração em projetos reais principalmente de grande porte a maioria grande maioria aborda apps pequenos e simples.
