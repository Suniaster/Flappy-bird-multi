import ServerController from "./server/app/ServerController";
import FlappyGame from "./server/app/Simulation/Controller/FlappyGame";

import SimulationSocketsController from "./server/app/Sockets/SimulationSocketController";
import NeuralFlappyController from "./server/app/Simulation/Controller/NeuralFlappyController";


// Controladora do servidor
const serverC = new ServerController();
serverC.initServer();

let simulatorNeural = new NeuralFlappyController([800, 2000])
let simulatorGame = new FlappyGame([800,2000])

const socketsC = new SimulationSocketsController(
  serverC, 
  simulatorNeural
)

socketsC.initConnectionsHandler();
