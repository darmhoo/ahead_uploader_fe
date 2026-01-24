export const useUserStore = defineStore(
    "user",
    {
        state: () => ({
            profile: null
        }),
        actions: {
            async fetchUserProfile() {
                try {
                    const response = await instance.get('/user')
                    this.profile = response.data
                } catch (error) {
                    console.error('Failed to fetch user profile:', error)
                }
            },
            updateUserProfile(updatedProfile: any) {
                this.profile = { ...(this.profile || {}), ...updatedProfile }
            }
        }
    }
)
import { defineStore } from "pinia";
import instance from "../lib/axios";