<template>
    <div id="rooms">
        <div class="h-screen flex overflow-hidden bg-gray-100">
            <Sidebar :name="name"/>
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
                        <div class="md:flex md:items-center md:justify-between max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                          <div class="flex-1 min-w-0">
                              <h1 class="text-2xl font-semibold text-gray-900">Rooms</h1>
                          </div>
                          <div class="mt-4 flex md:mt-0 md:ml-4">
                            <span class="shadow-sm rounded-md">
                              <button 
                                v-on:click="toggleModal"
                                type="button" 
                                class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                                Add room
                              </button>
                            </span>
                          </div>
                        </div>
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <Rooms class="mt-5" />

                            <CreateRoom 
                              v-show="createRoom"
                              :room="room"
                              @create="create"
                              @toggleModal="toggleModal"/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import Sidebar from '@/components/Sidebar.vue'
import Rooms from '@/components/tables/Rooms.vue'
import CreateRoom from '@/components/forms/create/Room.vue'

export default {
    name: 'association.room',
    components: {
        Sidebar,
        Rooms,
        CreateRoom
    },
    data() {
        return {
            name: sessionStorage.getItem('name'),
            email: sessionStorage.getItem('email'),
            room: {
              name: ''
            },
            createRoom: false,
        };
    },
    methods: {
      create() {
        console.log(this.room);
        const token = localStorage.getItem('bearer');
        axios
          .post('http://localhost:8000/api/v1/room/create', {
            headers: {
              Authorization: 'Bearer ' + token
            },
            params: {
              name: this.room.name
            }
          }).then(response => {
            console.log(response)
          }).catch(e => {
            console.log(e.request)
          });
      },
      toggleModal() {
        this.createRoom = !this.createRoom;
      }
    },
}
</script>

<style>

</style>