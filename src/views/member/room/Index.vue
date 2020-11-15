<template>
    <div id="room">
        <div class="h-screen flex overflow-hidden bg-gray-100">
            <div class="flex flex-col w-0 flex-1 overflow-hidden">
                <div class="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
                <button class="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150" aria-label="Open sidebar">
                    <!-- Heroicon name: menu -->
                    <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
                </div>
                <main class="flex-1 relative z-0 overflow-y-auto focus:outline-none" tabindex="0">
                    <div class="pt-2 pb-6 md:py-6">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <h1 class="text-2xl font-semibold text-gray-900">Conference room</h1>
                        </div>
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div 
                              v-for="(answer, key) in vote.answers"
                              :key="key"
                              class="mt-4">
                                <div class="mt-4">
                                  <h3 class="text-2xl font-semibold text-gray-900">{{ answer.answer }}</h3>
                                </div>
                                <div 
                                  class="mt-4 flex items-center">
                                    <input 
                                      v-on:click="userVote(answer, 1)" 
                                      name="voted"
                                      type="radio" 
                                      class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                    <label for="push_email" class="ml-3">
                                      <span class="block text-sm leading-5 font-medium text-gray-700">Yes</span>
                                    </label>
                                </div>
                                <div 
                                  class="mt-4 flex items-center">
                                    <input 
                                      v-on:click="openBox(key)" 
                                      name="voted"
                                      type="radio" 
                                      class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                      <label for="push_email" class="ml-3">
                                        <span class="block text-sm leading-5 font-medium text-gray-700">Yes, if:</span>
                                      </label>
                                      <div :id="`${key}-open`" style="display: none" class="mt-4 flex items-center">
                                        <div class="mt-4 flex rounded-md shadow-sm">
                                          <textarea v-model="reason" rows="3" class="form-textarea mt-1 block w-full transition duration-150 ease-in-out sm:text-sm sm:leading-5" placeholder="you@example.com"></textarea>
                                        </div>
                                        <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                          <span class="inline-flex rounded-md shadow-sm">
                                            <button 
                                              type="submit"
                                              v-on:click="voteOnceIf(answer)" 
                                              class="bg-indigo-600 border border-transparent rounded-md py-2 px-4 inline-flex justify-center text-sm leading-5 font-medium text-white hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
                                              Save
                                            </button>
                                          </span>
                                        </div>
                                      </div>
                                </div>
                                <div 
                                  class="mt-4 flex items-center">
                                    <input 
                                      v-on:click="userVote(answer, 3)" 
                                      name="voted"
                                      type="radio" 
                                      class="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"/>
                                    <label for="push_email" class="ml-3">
                                      <span class="block text-sm leading-5 font-medium text-gray-700">No</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios';
import Echo from "laravel-echo"

export default {
    name: 'member.room',
    components: {
    },
    data() {
        return {
            roomCode: this.$route.params.roomCode,
            personalCode: this.$route.params.personalCode,
            room: this.$store.getters.room,
            roomCodes: [],
            vote: {

            },
            reason: '',
            notification: {
                success: false,
                warning: false,
                danger: false,
                title: "",
                message: ""
            },
        };
    },
    created() {
        // Check if session code is the same as the url parameter
        if (sessionStorage.getItem('room.code') != this.roomCode || sessionStorage.getItem('personal.code') != this.personalCode) {
            this.notification.success = false;
            this.notification.danger = true;
            this.notification.title = "Something went wrong.";
            this.notification.message = "The codes has changed. You leaved the room.";
            this.$router.push({ name: 'member.room.join', params: { notification: this.notification}});
        }
    },
    async mounted () {
      await this.connectChannels();
    },
    methods: {
        async connectChannels() {
            const echo = new Echo({
                broadcaster: 'pusher',
                key: `${this.$store.getters.pusherKey}`,
                cluster: 'eu',
                encrypted: false,
            });

            // Open vote channel
            echo.channel(`open`)
                .listen(`VoteOpen`, (event) => {
                  this.vote = event.vote;
            });
        },
        userVote(answer, vote) {
          if (vote != 2) {
            console.log(answer, vote);
          }
        },
        voteOnceIf(answer) {
          console.log(answer, this.reason);
        },
        openBox(key) {
          document.getElementById(`${key}-open`).style.display = "block";
        }
    }
}
</script>

<style>

</style>