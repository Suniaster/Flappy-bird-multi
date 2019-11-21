# Flappy Bird - Thiago Chaves

## Introdução

Jogo da velha multiplayer, com possibilidade de treinamento de rede neural. Para mudar o modo de execução troque no arquivo index.js:

```js
let simulatorNeural = new NeuralFlappyController([800, 2000])
let simulatorGame = new FlappyGame([800,2000])

const socketsC = new SimulationSocketsController(
  serverC,
  simulatorNeural
)
```

Para:

```js
let simulatorNeural = new NeuralFlappyController([800, 2000])
let simulatorGame = new FlappyGame([800,2000])

const socketsC = new SimulationSocketsController(
  serverC,
  simulatorGame
)
```

## Execução

Para rodar basta digitar:

```bash
npm start
```
