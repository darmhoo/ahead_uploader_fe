import Crypto from 'crypto-js'

const secretKey = import.meta.env.VITE_APP_SECRET_KEY

if (!secretKey) {
    throw new Error('Missing encryption key')
}

interface User {
    id: string
    name: string
    email: string
    is_admin: boolean
}

function encryptData(data: { token: string; user: User; verified: boolean } | string) {
    return Crypto.AES.encrypt(JSON.stringify(data), secretKey).toString()
}

function decryptData(data: string) {
    try {
        const bytes = Crypto.AES.decrypt(data, secretKey)
        const decrypted = bytes.toString(Crypto.enc.Utf8)

        if (!decrypted) return null

        return JSON.parse(decrypted)
    } catch {
        return null
    }
}

export function setEncryptedItem(key: string, data: any) {
    localStorage.setItem(key, encryptData(data))
}

export function getDecryptedItem(key: string) {
    const encrypted = localStorage.getItem(key)
    return encrypted ? decryptData(encrypted) : null
}

export function deleteItem(key: string) {
    localStorage.removeItem(key)
}
