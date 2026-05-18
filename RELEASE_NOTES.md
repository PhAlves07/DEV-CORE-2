# Release v0.2.0 - Integracao backend/frontend

## Resumo

Esta release conecta o app Expo/React Native ao backend Spring Boot de forma real, removendo as simulacoes locais de login e cadastro. O front agora envia requisicoes HTTP para o backend, e o backend passa a oferecer endpoints para cadastro e autenticacao de usuarios.

## Melhorias entregues

- Criado cliente HTTP no front em `dev-core/src/services/api.ts`.
- Cadastro do app conectado ao endpoint `POST /users`.
- Login do app conectado ao endpoint `POST /users/login`.
- Usuario autenticado salvo localmente no app com `AsyncStorage`.
- Criado DTO de login no backend para validar `email` e `password`.
- Criado DTO de resposta de usuario para nao devolver senha no JSON.
- Login no backend validando senha criptografada com BCrypt.
- E-mail normalizado antes de cadastrar ou autenticar usuario.
- CORS configurado no Spring para permitir acesso do Expo/web/emulador.
- Banco H2 local configurado como padrao para facilitar execucao sem MySQL.
- MySQL continua suportado via variaveis de ambiente Spring.
- Corrigido `groupId` Maven de `com.agestesoluciona` para `com.agrestesoluciona`.
- Corrigido pacote do teste `BackendApplicationTests`.
- READMEs atualizados com stack e comandos reais do projeto.

## Endpoints

### Cadastro

```http
POST /users
Content-Type: application/json
```

```json
{
  "name": "Usuario Teste",
  "email": "usuario@email.com",
  "phone": "(11) 99999-9999",
  "password": "123456"
}
```

### Login

```http
POST /users/login
Content-Type: application/json
```

```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

## Como executar

### Backend

```powershell
cd "c:\Users\cezar\Desktop\DEV-CORE-2-main\agreste soluciona\backend"
.\mvnw.cmd spring-boot:run
```

### Frontend

```powershell
cd "c:\Users\cezar\Desktop\DEV-CORE-2-main\agreste soluciona\dev-core"
npm install
npm run web
```

Para celular fisico, iniciar o app apontando para o IP local do computador:

```powershell
$env:EXPO_PUBLIC_API_URL="http://SEU-IP-LOCAL:8080"
npm start
```

## Validacao feita

- `npm install` executado com sucesso no frontend.
- `npx tsc --noEmit` executado com sucesso no frontend.
- Validacao Maven do backend nao foi executada nesta maquina porque o Java/JDK nao esta instalado/configurado no PATH.

## Observacao para publicar no GitHub

Sugestao de tag: `v0.2.0`

Titulo da release:

```text
v0.2.0 - Integracao backend/frontend
```

Descricao curta:

```text
Conecta o app Expo/React Native ao backend Spring Boot com cadastro e login reais, endpoints dedicados, CORS configurado e banco local H2 para facilitar testes.
```
