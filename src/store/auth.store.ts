import { defineStore } from "pinia";
import instance from "../lib/axios";
import router from "../routes";
import { deleteItem, setEncryptedItem } from "../lib/localStorage";


export const useAuthStore = defineStore(
    "auth",
    {
        state: () => ({
            user: null
        }),
        actions: {
            async login(credentials: { username: string; password: string }) {
                try {
                    const response = await instance.post('/login', credentials)
                    this.user = response.data.user
                    setEncryptedItem('user', {
                        token: response.data.token,
                        user: response.data.user,
                        verified: response.data.verified
                    })
                    router.push('/')
                } catch (error) {
                    console.error('Login failed:', error)
                }
            },
            logout() {
                this.user = null
                deleteItem('user')
                router.push('/login')
            }
        }
    }
)