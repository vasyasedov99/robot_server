const net = require('net');
const TCPClientStates = {
    UNKNOWN: "UNKNOWN",
    AUTH: "AUTH",
    READY: "READY",
    DISCONNECTED: "DISCONNECTED"
}

class TCPClient {
    socket = new net.Socket();
    state = TCPClientStates.UNKNOWN;
    port = 0;
    host = "";
    user = "guest";
    pass = ".";
    message_buffer = "";
    handler = (data) => {
        console.log(data);
    }

    connect(port, host, user = this.user, pass = this.pass) {
        if (state != TCPClientStates.UNKNOWN && state != TCPClientStates.DISCONNECTED) {
            return "enabled";
        }
        try {
            this.port = port;
            this.host = host;
            this.user = user;
            this.pass = pass;
            this.socket.connect(port, socket, function() {
                state = TCPClientStates.AUTH;
            })
            this.socket.on('data', function(data) {

            })
        } catch(e) {
            return e;
        }

        
        return "ok";
    }

    disconnect() {
        if (state == TCPClientStates.UNKNOWN || state == TCPClientStates.DISCONNECTED) {
            return "disabled";
        }
        
        this.socket.destroy();

        state = TCPClientStates.DISCONNECTED;
        return "ok";
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
        if (state == TCPClientStates.AUTH) {
            if (message == 'auth') {
                this.socket.write("auth");
                return;
            }
            if (message == 'ok') {
                state = TCPClientStates.READY;
                return;
            }
            this.approve(command[1]);
            this.write("ok");
        } else {
            if (message == 'auth') {
                state = TCPClientStates.AUTH;
                return this.handle_message(message);
            }
            this.handler(message, this);
        }
    }

    write(message) {
        this.socket.write(message);
        return "ok";
    }
}

var client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected');
	client.write('Hello, server! Love, Client.');
});

client.on('data', function(data) {
	console.log('Received: ' + data);
	client.destroy(); // kill client after server's response
});

client.on('close', function() {
	console.log('Connection closed');
});

exports = {
    "Client": TCPClient,
    "ClientStates": TCPClientStates
}