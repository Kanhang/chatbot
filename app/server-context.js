
export const context = new Map();

export function set(key,value) {
    context.set(key, value);
}

export function get(key) {
    return context.get(key);
}