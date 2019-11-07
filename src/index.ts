import ServerController from "./server/app/ServerController";
import SocketsController from "./server/app/SocketsController";


// Controladora do servidor
var serverC = new ServerController();
serverC.initServer();

// Controlador dos sockets ligados ao servidor
var socketsC = new SocketsController(serverC);
socketsC.initConnectionsHandler();
