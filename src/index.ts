import ServerController from "./server/app/ServerController";
import SimulationSocketsController from "./server/app/Sockets/SimulationSocketController";
import FlappyGame from "./server/app/Game/Controller/FlappyGame";


// Controladora do servidor
const serverC = new ServerController();
serverC.initServer();

const socketsC = new SimulationSocketsController(
  serverC, 
  new FlappyGame([800,2000])
)

socketsC.initConnectionsHandler();
