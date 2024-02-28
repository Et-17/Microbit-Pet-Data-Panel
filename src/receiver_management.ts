// @ts-nocheck

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