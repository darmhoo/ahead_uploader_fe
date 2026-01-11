import Crypto from 'crypto-js'
const secretKey = import.meta.env.VITE_APP_SECRET_KEY ?? ''

interface User {
    id: string
    name: string
    email: string
    // Add other user properties as needed
}
function encryptData(
    data: { token: string; user: User; verified: boolean } | string
) {
    return Crypto.AES.encrypt(JSON.stringify(data), secretKey).toString()
}

function decryptData(data: string) {
    try {
        const bytes = Crypto.AES.decrypt(data, secretKey)
        return JSON.parse(bytes.toString(Crypto.enc.Utf8))
    } catch (error) {
        console.error('Decryption Failed', error)
        return null
    }
}

export function setEncryptedItem(
    key: string,
    data: { token: string; user: User; verified: boolean } | string
) {
    const encrypted = encryptData(data)
    localStorage.setItem(key, encrypted)
}

export function getDecryptedItem(key: string) {
    const encrypted = localStorage.getItem(key)
    if (encrypted) {
        return decryptData(encrypted)
    }
    return null
}

export function deleteItem(key: string) {
    localStorage.removeItem(key)
    return null
}
