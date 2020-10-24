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
            params: this.$route.params,
        };
    },
    mounted() {
        if (this.params.notification != undefined)
            this.notification = this.params.notification
    },
    methods: {
        joinRoom () {
            axios.post(`${this.$store.getters.serviceUrl}/room/join`,  {
                roomCode: this.member.roomCode,
                personalCode: this.member.personalCode
            }).then(response => {
                if (response.status === 200) {
                    // save room to Vuex
                    this.$store.state.room = response.data.room;

                    // save codes to Session storage
                    sessionStorage.setItem('room.code', this.member.roomCode);
                    sessionStorage.setItem('personal.code', this.member.personalCode);
                    // push member to the right room
                    this.$router.push({
                        name: 'member.room.index',
                        params: {
                          roomCode: this.member.roomCode,
                          personalCode: this.member.personalCode,
                        }
                    });
                }
            }).catch(e => {
              console.log(e.request)
                if (e.request.response != "") {
                    const message = JSON.parse(e.request.response);
                    this.notification.success = false;
                    this.notification.danger = true;
                    this.notification.title = "Something went wrong.";
                    this.notification.message = message.message;
                }
            });
        }
    },
    
}
</script>

<style>

</style>