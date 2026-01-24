import { defineStore } from "pinia";
import instance from "../lib/axios";
import router from "../routes";
import { deleteItem, getDecryptedItem, setEncryptedItem } from "../lib/localStorage";
import type { User } from "../types";


export const useAuthStore = defineStore(
    "auth",
    {
        state: () => ({
            user: null as User | null,
            role: null
        }),
        actions: {
            async login(credentials: { username: string; password: string }) {
                try {
                    const response = await instance.post('/login', credentials)
                    this.user = response.data.data.user
                    this.role = response.data.data.role
                    setEncryptedItem('user', {
                        token: response.data.data.token,
                        user: response.data.data.user,
                        role: response.data.data.role
                    })
                    router.push('/dashboard')
                } catch (error) {
                    console.error('Login failed:', error)
                    throw error
                }
            },
            async logout() {
                await instance.post('/logout')
                this.user = null
                deleteItem('user')
                router.push('/login')
            },
            hydrate() {
                const data = getDecryptedItem('user')
                if (data && data.user) {
                    this.user = data.user
                }   
            }
        }
    }
)