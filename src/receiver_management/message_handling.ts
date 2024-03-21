export interface Message {
    key: string;
    value: number;
}

export const listeners: ((message: Message) => void)[] = [];

export async function broadcastMessage(message: Message) {
    listeners.forEach(callback => {
        callback(message);
    });
}
