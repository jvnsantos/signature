## Getting Started

Confgurar o ngrok (Consultar .env):

```bash
npm install -g ngrok
ngrok config add-authtoken <ngrok_auth_token>
```

Rodar ambiente desenvolvedor

```bash
yarn dev
ngrok http 3000
exemplo retorno: Forwarding https://da12-189-102-53-123.ngrok.io -> http://localhost:3000
```

# Processo para deploy

```bash
yarn build
yarn start
```