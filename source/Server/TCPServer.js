
const net = require('net');
const TCPClientStates = {
    UNKNOWN: "UNKNOWN",
    AUTH: "AUTH",
    READY: "READY",
    DISCONNECTED: "DISCONNECTED"
}

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
        this.write('auth');
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
        let command = message.split(" ");
        if (this.state == TCPClientStates.AUTH) {
            if (length(command) < 3) {
                this.write("auth");
                return;
            }
            if (command[0] != 'auth') {
                this.write('auth');
                return;
            }
            this.approve(command[1]);
            this.write("ok");
        } else {
            this.handler(message, this);
        }
    }

    approve(username) {
        this.username = username;
        state = TCPClientStates.READY;
    }

    write(message) {
        this.socket.write(message + "\n");
        return "ok";
    }

    disconnect() {
        if (!this.is_active()) {
            return "not active";
        } else {
            try {
                this.socket.destroy();
                this.state = TCPClientStates.DISCONNECTED;
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
    /** @type {net.Server} */
    server = undefined;
    clients = [];
    port = 0;
    _isrunning = false;

    constructor(port) {
        this.port = port;
    }

    run() {
        if (this.isRunning()) {
            return "enabled";
        }
        try {
            this.server = net.createServer(function(socket) {
                let client = new TCPClient(socket);
                
            });
            this.server.listen(this.port);
            this._isrunning = true;
        } catch(e) {
            return e;
        }
        return "ok";
    }

    stop() {
        if (!this.isRunning()) {
            return "disabled";
        }
        this.clients.forEach(element => {
            element.disconnect();
        });
        this.server.destroy();
        this._isrunning = false;

        return "ok";
    }

    isRunning() {
        return this._isrunning;
    }
}

exports.Server = TCPServer;
exports.Cleint = TCPClient;
exports.ClientStates = TCPClientStates;