# Home: cabeçalho inteligente + chamado para profissionais

Data: 2026-11-25
Tamanho: mudança pequena (design curto)
Arquivos afetados: `agreste soluciona/dev-core/src/screen/Home/index.tsx` e `styles.ts`

## Intenção e o porquê
Quem abre o app pela primeira vez não encontra onde entrar, se cadastrar ou ver o perfil
sem "fuçar". Hoje Entrar e Cadastrar só existem dentro do menu hambúrguer, e o ícone de
pessoa não faz nada quando o usuário não está logado (`handleProfile` só navega se existir
usuário em `@user`). O objetivo é deixar essas ações claras e à vista na tela inicial.

## Objetivos
- Deslogado: botões escritos "Entrar" e "Cadastrar" visíveis no cabeçalho.
- Deslogado: cartão de destaque "Quer oferecer seus serviços? Cadastre-se como profissional".
- Logado: botão com o nome do usuário no cabeçalho que leva ao Perfil.
- O toque no perfil nunca cai no vazio.

## Fora do escopo
- Barra de navegação inferior (opção B, fica para depois).
- Tela de boas-vindas antes da Home (opção C).
- Novo cadastro separado para profissional. Continua uma conta só; o profissional
  vira prestador depois, em Perfil → "Tornar-se Prestador".
- Qualquer mudança no backend, em Login, Register ou Profile.

## Anti-objetivos
- A busca e "Top Serviços requisitados" não podem perder destaque nem ficar fora da primeira tela.
- Não exigir login para navegar pelos serviços.

## Restrições
- Sem biblioteca nova. Reaproveitar `Feather`, cores e estilos existentes
  (laranja `#F58634`, cartões brancos arredondados).
- Seguir o estilo atual do código (StyleSheet em `styles.ts`, navegação com `navigation.navigate`).

## Abordagens consideradas
- **A) Cabeçalho inteligente + chamado para profissionais** (escolhida pelo usuário): só Home, sem dependência nova.
- B) A + barra inferior fixa: melhor navegação a longo prazo, mas exige `@react-navigation/bottom-tabs` e mexer nas rotas.
- C) Tela de boas-vindas antes da Home: muito clara, mas cria barreira antes de o cliente ver os serviços.

## Design
1. **Cabeçalho deslogado:** logo à esquerda; à direita "Entrar" (botão com borda laranja) e
   "Cadastrar" (botão laranja cheio). Os botões levam a `Login` e `Register`.
2. **Cabeçalho logado:** logo à esquerda; à direita botão com ícone de pessoa e o primeiro
   nome, que leva a `Profile`.
3. **Menu hambúrguer:** continua como está (Admin, Logout, e Entrar/Cadastrar para deslogado).
4. **Cartão para profissionais** (só deslogado), logo abaixo do "Olá" e antes da busca:
   título "Quer oferecer seus serviços?", subtítulo curto e botão que leva a `Register`.
5. **`handleProfile`:** se não houver usuário, navega para `Login` em vez de não fazer nada.
6. **`loadUser`:** quando não há usuário salvo, limpa `user` e `userName`
   (hoje o nome antigo continua na tela depois do logout).

## Decisões minhas (o usuário pode corrigir)
- O cartão de profissional só aparece para quem não está logado. Quem já tem conta
  encontra "Tornar-se Prestador" no Perfil, como hoje.
- Mostrar só o primeiro nome no cabeçalho logado, para não quebrar o layout em telas pequenas.
- O cartão de profissional leva ao Register (cadastro único); depois de entrar, o caminho é pelo Perfil.

## Deixado para quem for construir
- Espaçamentos, tamanhos e textos exatos dos botões, seguindo o visual atual.
- Ajustar o `description` (margem de 50) se o novo cartão deixar a tela apertada.
