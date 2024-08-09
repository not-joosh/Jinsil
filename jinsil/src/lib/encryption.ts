import CryptoJS from 'crypto-js';
import crypto from 'crypto'; 

export const SECRET_KEY = 'G7d9E2uRZbP4mYqT1s8vA5oNxWlJkH3CwF7eVbR'; 

export const encrypt = (text: string) => {
    try {
        const encrypted = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
        return encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        throw new Error('Encryption failed');
    }
};

// Decrypt function
export const decrypt = (encryptedText: string) => {
    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
        const decrypted = bytes.toString(CryptoJS.enc.Utf8);
        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        throw new Error('Decryption failed');
    }
};

// Generate a random key, this is for later
export function generateRandomKey(length: number) {
    return crypto.randomBytes(length).toString('hex');
}

