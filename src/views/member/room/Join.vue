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
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
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
            const joinRoom = {
              roomCode: this.member.roomCode,
              personalCode: this.member.personalCode
            }

            axios.post('http://localhost:8000/api/v1/authenticate',  {
                joinRoom
            }).then(response => {
                if (response.status === 200) {
                    sessionStorage.setItem('name', response.data.name)
                    sessionStorage.setItem('email', response.data.email)
                    localStorage.setItem('bearer', response.data.bearer)
                    this.$router.push({
                        name: 'member.dashboard'
                    })
                }
            }).catch(e => {
                if (e.request.response != "") {
                    const message = JSON.parse(e.request.response);
                    this.notification.success = false;
                    this.notification.danger = true;
                    this.notification.title = "Something went wrong.";
                    this.notification.message = message.message;

                    this.signin.password = ""
                }
            });
        }
    },
    
}
</script>

<style>

</style>