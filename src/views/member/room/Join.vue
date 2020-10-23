<template>
    <div id="signin">
        <Alert :notification="notification"/>
        <div class="w-full max-w-xs mx-auto p-4 m-5 border border-gray-200 bg-white shadow">
            <form class="bg-white">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="room-code">
                    Room code
                    </label>
                    <input 
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="room-code" 
                        type="text" 
                        v-model="member.roomCode" 
                        placeholder="Room code">
                </div>
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="personal-code">
                    Personal code
                    </label>
                    <input 
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="personal-code" 
                        type="text" 
                        v-model="member.personalCode" 
                        placeholder="Personal code">
                </div>
                <div class="flex items-center justify-between">
                    <button
                        v-on:click="joinRoom"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-50 cursor-not-allowed" 
                        type="button">
                        Join
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import Alert from '@/components/alert/Alert.vue'

export default {
    name: 'member.room.join',
    components: {
        Alert,
    },
    data() {
        return {
            member: {
              roomCode: this.$route.query.room_code,
              personalCode: this.$route.query.personal_code,
            },
            notification: {
                success: false,
                warning: false,
                danger: false,
                title: "",
                message: ""
            },
        };
    },
    methods: {
        joinRoom () {
          console.log('joinRoom')
        }
    },
    
}
</script>

<style>

</style>