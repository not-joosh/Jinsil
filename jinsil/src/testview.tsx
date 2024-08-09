import { useState } from 'react';
import { decrypt, encrypt } from './lib/encryption';

export const TestComponent = () => {
    const [text, setText] = useState('');
    const [encryptedText, setEncryptedText] = useState('');
    const [decryptedText, setDecryptedText] = useState('');

    const handleEncrypt = () => {
        try {
            const encrypted = encrypt(text);
            setEncryptedText(encrypted);
            setDecryptedText(''); // Clear decrypted text
        } catch (error) {
            console.error('Encryption error:', error);
            setEncryptedText('Error during encryption');
        }
    };

    const handleDecrypt = () => {
        try {
            const decrypted = decrypt(encryptedText);
            setDecryptedText(decrypted);
        } catch (error) {
            console.error('Decryption error:', error);
            setDecryptedText('Error during decryption');
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Encryption and Decryption Test</h1>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="textInput" style={{ display: 'block', marginBottom: '10px' }}>Enter Text to Encrypt:</label>
                <input
                    id="textInput"
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ padding: '10px', width: '100%', maxWidth: '400px' }}
                />
            </div>
            <button onClick={handleEncrypt} style={{ marginRight: '10px', padding: '10px 20px' }}>Encrypt</button>
            <button onClick={handleDecrypt} style={{ padding: '10px 20px' }}>Decrypt</button>
            <div style={{ marginTop: '20px' }}>
                <h2>Encrypted Text:</h2>
                <textarea
                    value={encryptedText}
                    readOnly
                    style={{ width: '100%', maxWidth: '400px', minHeight: '80px', padding: '10px' }}
                />
            </div>
            <div style={{ marginTop: '20px' }}>
                <h2>Decrypted Text:</h2>
                <textarea
                    value={decryptedText}
                    readOnly
                    style={{ width: '100%', maxWidth: '400px', minHeight: '80px', padding: '10px' }}
                />
            </div>
        </div>
    );
};
