/**
 * Auth module JWT generator
 */

import * as crypto from 'crypto-js';

/** Generate JWT */
export function GenerateJWT(user: string): string {
    const header = { alg: 'HS256', typ: 'JWT' };
    const data = { user };
    const unsignedToken = `${Base64URL(JSON.stringify(header))}.${Base64URL(JSON.stringify(data))}`;
    return `${
        unsignedToken
    }.${
        Base64URL(crypto.HmacSHA256(
            crypto.enc.Utf8.parse(unsignedToken),
            'Ave, ReSpace!'
        ).toString())
    }`;
}

/** Make base64 URL */
function Base64URL(source: string): string {
    return crypto.enc.Base64.stringify(crypto.enc.Utf8.parse(JSON.stringify(source)))
        .replace(/=+$/, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_');
}
