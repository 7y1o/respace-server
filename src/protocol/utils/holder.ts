/**
 * Protocol data holder
 */

/** Connected users */
let connectedUsers: {
    ip: string,
    pub: JsonWebKey,
    auth: boolean
}[] = [];

/** Server keys */
export const serverKeys: {
    pub: JsonWebKey,
    priv: JsonWebKey
} = {
    pub: null,
    priv: null
};

/** Add new connection */
export function AddConnection(ip: string, pub?: JsonWebKey): void {
    if (!HasConnection(ip)) {
        connectedUsers.push({ ip, pub, auth: false });
    }
}

/** Update connection data */
export function UpdateConnection(ip, data: { ip?: string, pub?: JsonWebKey, auth?: boolean }): void {
    if (HasConnection(ip)) {
        const connectionRef = connectedUsers.find((c) => c.ip === ip);
        for (const k in data) {
            connectionRef[k] = data[k];
        }
    }
}

/** Remove connection */
export function RemoveConnection(ip: string): void {
    if (HasConnection(ip)) {
        connectedUsers = connectedUsers.filter((c) => c.ip !== ip);
    }
}

/** Check is connection exists */
export function HasConnection(ip: string): boolean {
    return !!connectedUsers.find((c) => c.ip === ip);
}

/** Get connection */
export function GetConnection(ip: string): { ip: string, pub: JsonWebKey } {
    return connectedUsers.find((c) => c.ip === ip);
}
