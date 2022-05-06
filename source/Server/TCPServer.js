const net = require('net');
const TCPClientStates = {
    UNKNOWN: "UNKNOWN",
    AUTH: "AUTH",
    READY: "READY",
    DISCONNECTED: "DISCONNECTED"
}

var server = net.createServer(function(socket) {
	socket.write('Echo server\r\n');
	socket.pipe(socket);
});
server.listen(1337);

class TCPClient {
    state = TCPClientStates.UNKNOWN;
    username = "";
    group = "any";
    /**@type {net.Socket} */
    socket = undefined;
    command_buffer = "";
    handler = (data, client) => {client.write("recieved " + data)};
    on_disconnect = () => {};
    on_connect = () => {};

    constructor(socket) {
        this.socket = socket;
        if (socket != undefined) {
            this.state = TCPClientStates.AUTH;
            this.init();
        }
    }

    init() {
        socket.on('data', handle_message_raw);
        socket.on('end', socket.end);
    }

    handle_message_raw(message) {
        this.command_buffer += message;
        let command = "";
        for(let i = 0; i < length(command_buffer); i++) {
            if (command_buffer[i] == "\n") {
                command = command_buffer.substring(0, i);
                this.command_buffer = this.command_buffer.substring(i + 1);
                i = 0;
                handle_message(command);
            }
        }
    }

    handle_message(message) {
        if (state == )
    }

    write(message) {
        if (!this.is_connected()) {
            return "not active";
        }
        this.socket.write(message);
        return "ok";
    }

    disconnect() {
        if (!this.is_active()) {
            return "not active";
        } else {
            try {
                this.socket.destroy();
            } catch(e) {
                return e;
            }
            return "ok";
        }
    }

    is_connected() {
        return this.state == TCPClientStates.READY;
    }

    is_active() {
        if (this.socket == undefined) return false;
        return true;
    }
}

class TCPServer {
    
    server = net.createServer(function(socket) {
        socket.write('auth');
        socket.pipe(socket);
    });
    clients = [];

    constructor(port) {
        
    }

    run() {

    }

    stop() {

    }
}