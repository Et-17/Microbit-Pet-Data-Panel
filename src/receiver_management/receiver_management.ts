// @ts-nocheck
import { broadcastMessage } from "./message_handling";

let port = null;
let reader = null;
let writer = null;

async function requestPort() {
    port = await navigator.serial.requestPort();
    console.log(port);
}

async function openPort() {
    await port.open({ baudRate: 115200 });
}

async function getReaderAndWriter() {
    reader = port.readable.getReader();
    writer = port.writable.getWriter();
}

export async function configureReceiver(freq, group) {
    const encoder = new TextEncoder();
    const freq_format = String(freq).padStart(2, '0');
    const group_format = String(group).padStart(3, '0');
    const command = "R " + freq_format + "." + group_format + "\n";
    await writer.write(encoder.encode(command));
}

async function getValue(message) {
    let value_bytes = message.slice(12, 16);
    let number = (value_bytes[3] << 24) + (value_bytes[2] << 16) + (value_bytes[1] << 8) + value_bytes[0];
    return number;
}

const decoder = new TextDecoder("ascii");
async function getKey(message) {
    let string_length = message[16]
    let string_bytes = message.slice(17, 17 + string_length);
    return decoder.decode(new Uint8Array(string_bytes));
}

async function decodeMessage(message) {
    return { key: await getKey(message), value: await getValue(message) };
}

async function receiveMessage(message) {
    broadcastMessage(await decodeMessage(message));
}

const buffer_size = 32;
async function readLoop() {
    let buffer = new Array(buffer_size).fill(0);
    let cur_pos = 0;
    while (true) {
        const { value, done } = await reader.read();
        if (done) {
            console.log("Reader has been cancelled");
            break;
        }
        for (let i = 0; i < value.length; i++) {
            if (cur_pos == buffer_size) {
                receiveMessage(buffer);
                buffer = new Array(buffer_size).fill(0);
                cur_pos = 0;
            }
            buffer[cur_pos] = value[i];
            cur_pos++;
        }
    }
}

export async function start() {
    await requestPort();
    console.log("Requested port");
    await openPort();
    console.log("Opened port");
    await getReaderAndWriter();
    console.log("Got reader");
    await configureReceiver(5, 20);
    console.log("Configured receiver");
    readLoop();
    console.log("Initiated read loop");
}
