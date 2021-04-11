// Guilherme will  add more stuff here later.
export function create_connection(ip: string, port: number): WebSocket {
    return new WebSocket(`ws://${ip}:${port}/`);
}
