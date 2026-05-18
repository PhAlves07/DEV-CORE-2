# 🌵 Agreste Soluciona

**Agreste Soluciona** é um site criado com o objetivo de **facilitar o dia a dia das pessoas**, conectando **prestadores de serviços** e **usuários que precisam de ajuda** de forma simples, rápida e intuitiva.

A plataforma funciona como uma **rede social de serviços gerais**, onde quem **oferece** e quem **procura** um serviço podem se cadastrar, conversar e combinar os detalhes diretamente, promovendo praticidade e oportunidades para todos.

---

## 🚀 Objetivo do Projeto

O projeto surgiu com a ideia de **aproximar profissionais e clientes** em uma única plataforma.  
Queremos simplificar o processo de encontrar pessoas qualificadas para serviços como:

- 🔧 Encanadores  
- 💡 Eletricistas  
- 🪚 Marceneiros  
- 🔑 Chaveiros  
- 🧰 Montadores de móveis  
- 🚚 Serviços de frete e muito mais!

---

## 🧩 Funcionalidades Principais

- Cadastro de usuários e prestadores de serviço  
- Sistema de busca e filtragem por tipo de serviço  
- Perfis personalizados com informações e avaliações  
- Sistema de mensagens entre usuário e prestador  
- Interface simples e responsiva  

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** Expo / React Native / TypeScript
- **Backend:** Java / Spring Boot
- **Banco de Dados:** H2 local por padrão, com suporte a MySQL via variáveis de ambiente
- **Controle de versão:** Git & GitHub

---

## 📦 Como Executar o Projeto

```powershell
cd "c:\Users\cezar\Desktop\DEV-CORE-2-main\agreste soluciona\dev-core"
npm install
npm run web
```

Antes de usar login e cadastro, suba o backend:

```powershell
cd "c:\Users\cezar\Desktop\DEV-CORE-2-main\agreste soluciona\backend"
.\mvnw.cmd spring-boot:run
```

Se for testar no celular físico, configure a URL do backend com o IP da sua máquina:

```powershell
$env:EXPO_PUBLIC_API_URL="http://SEU-IP-LOCAL:8080"
npm start
```
