import ServerController from "./server/app/ServerController";
import SocketsController from "./server/app/SocketsController";
import GameControl from "./server/app/Game/GameControl";


// Controladora do servidor
const serverC = new ServerController();
serverC.initServer();

const gameController = new GameControl([1000, 1000]);

// Controlador dos sockets ligados ao servidor
const socketsC = new SocketsController(serverC, gameController);
socketsC.initConnectionsHandler();
