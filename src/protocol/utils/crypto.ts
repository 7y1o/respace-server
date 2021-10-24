/**
 * Protocol cryptography
 */

import rsa from 'js-crypto-rsa';

/** Generate RSA keypair */
export async function GenerateRSA(): Promise<{ pub: JsonWebKey, priv: JsonWebKey}> {
    const result = await rsa.generateKey(4096);

    // Test message for sign and verify
    const testMessage = Uint8Array.from([ 2, 4, 8, 16, 32, 64, 128 ]);

    // Sign
    const sign = await rsa.sign(
        testMessage,
        result.privateKey,
        'SHA-256',
        {
            name: 'RSA-PSS',
            saltLength: 32
        }
    );

    // Verify
    const isValid = await rsa.verify(
        testMessage,
        sign,
        result.publicKey,
        'SHA-256',
        {
            name: 'RSA-PSS',
            saltLength: 32
        }
    );

    // Check is RSA keypair valid
    if (!isValid) {
        throw new Error('Sign & verify keypair error');
    } else {
        return {
            pub: result.publicKey,
            priv: result.privateKey
        };
    }
}

/** Encrypt message */
export async function EncryptMessage(message: Buffer, publicKey: JsonWebKey): Promise<Buffer> {
    let result;
    try {
        result = Buffer.from(
            await rsa.encrypt(
                Uint8Array.from(message),
                publicKey,
                'SHA-256'
            )
        );
    } catch (e) {
        throw new Error('Message encryption error');
    }

    return result;
}

/** Decrypt message */
export async function DecryptMessage(message: Buffer, privateKey: JsonWebKey): Promise<Buffer> {
    let result;
    try {
        result = Buffer.from(
            await rsa.decrypt(
                Uint8Array.from(message),
                privateKey,
                'SHA-256'
            )
        );
    } catch (e) {
        throw new Error('Message decryption error');
    }

    return result;
}
