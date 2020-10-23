<template>
    <div id="rooms">
        <div class="h-screen flex overflow-hidden bg-gray-100">
            <Sidebar :name="name"/>
            <div class="flex flex-col w-0 flex-1 overflow-hidden">
                <Alert :notification="notification"/>
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
                                <h1 class="text-2xl font-semibold text-gray-900">Room: {{ dbRoom.name }}</h1>
                                <div class="mt-5">
                                    <router-link :to="{ name: 'association.rooms' }">
                                        <h1 class="text-1xl font-semibold text-blue-900">Back to overview</h1>
                                    </router-link>
                                </div>
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
                             <div class="mt-4 flex md:mt-0 md:ml-4">
                                <span class="shadow-sm rounded-md">
                                    <button v-if="dbRoom.status == 0"
                                        v-on:click="openRoom()"
                                        type="button" 
                                        class="inline-flex items-center px-4 py-2 border border-blue-300 text-sm leading-5 font-medium rounded-md text-blue-500 bg-blue-100 hover:text-blue-700 focus:outline-none focus:shadow-outline-blue focus:border-gray-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                                        Open room
                                    </button>
                                    <button v-if="dbRoom.status == 1"
                                        v-on:click="closeRoom()"
                                        type="button" 
                                        class="inline-flex items-center px-4 py-2 border border-green-300 text-sm leading-5 font-medium rounded-md text-green-500 bg-green-100 hover:green-red-700 focus:outline-none focus:shadow-outline-blue focus:border-gray-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                                        Close room
                                    </button>
                                    <button v-if="dbRoom.status == 2"
                                        v-on:click="openRoom()"
                                        type="button" 
                                        class="inline-flex items-center px-4 py-2 border border-red-300 text-sm leading-5 font-medium rounded-md text-red-500 bg-red-100 hover:text-red-700 focus:outline-none focus:shadow-outline-blue focus:border-gray-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out">
                                        Room closed
                                    </button>
                                </span>
                            </div>
                        </div>
                        <div class="mt-5 max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <div class="mt-8">
                                <!-- Overview -->
                                <h2 class="text-lg leading-6 font-medium text-cool-gray-900">Overview</h2>
                                <div class="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                                    <!-- Card -->
                                    <div class="bg-white overflow-hidden shadow rounded-lg">
                                        <div class="p-5">
                                            <div class="flex items-center">
                                            <div class="flex-shrink-0">
                                                <!-- Heroicon name: scale -->
                                                <svg class="h-6 w-6 text-cool-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                                </svg>
                                            </div>
                                            <div class="ml-5 w-0 flex-1">
                                                <dl>
                                                <dt class="text-sm leading-5 font-medium text-cool-gray-500 truncate">
                                                    Invited members
                                                </dt>
                                                <dd>
                                                    <div class="text-lg leading-7 font-medium text-cool-gray-900">
                                                        0
                                                    </div>
                                                </dd>
                                                </dl>
                                            </div>
                                            </div>
                                        </div>
                                        <div class="bg-cool-gray-50 px-5 py-3">
                                            <div class="text-sm leading-5">
                                            <p 
                                                v-on:click="toggleInviteModal" 
                                                class="font-medium text-blue-600 hover:text-blue-900 transition ease-in-out duration-150">
                                                Invite member
                                            </p>
                                            </div>
                                        </div>
                                    </div>
                                <!-- More cards... -->
                                </div>
                            </div>
                            
                            
                            <CreateRoom 
                              v-show="showCreateRoom"
                              :room="room"
                              @create="createRoom"
                              @toggleModal="toggleModal"/>

                            <InviteMember 
                              v-show="inviteMember"
                              :member="member"
                              @invite="invite"
                              @toggleModal="toggleInviteModal"/>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import Alert from '@/components/alert/Alert.vue'
import Sidebar from '@/components/Sidebar.vue'
// import Rooms from '@/components/tables/Rooms.vue'
import CreateRoom from '@/components/forms/create/Room.vue'
import InviteMember from '@/components/forms/invite/Member.vue'

export default {
    name: 'association.room',
    components: {
        Alert,
        Sidebar,
        // Rooms,
        InviteMember,
        CreateRoom
    },
    data() {
        return {
            name: sessionStorage.getItem('name'),
            email: sessionStorage.getItem('email'),
            dbRoom: {
              id: this.$route.params.id,
              name: ''
            },
            room: {
              name: ''
            },
            member: {
                email: '',
            },
            showCreateRoom: false,
            inviteMember: false,
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
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get('http://localhost:8000/api/v1/room/find/' + this.dbRoom.id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("bearer")
                },
            }).then(response => {
                this.dbRoom = response.data.room
                this.association = response.data.association
                
            }).catch(e => {
                if (e.request.status === 404 ) {
                    this.notification.success = false;
                    this.notification.danger = true;
                    this.notification.title = "Request returned 404";
                    this.notification.message = "No API call available: /api/v1/room/find/{id}";
                }
                else if (e.request.response != "") {
                    const message = JSON.parse(e.request.response);
                    this.notification.success = false;
                    this.notification.danger = true;
                    this.notification.title = "Something went wrong.";
                    this.notification.message = message.message;
                }
            });
        },
        createRoom() {
            const room = {
                name: this.room.name
            }

            axios.post('http://localhost:8000/api/v1/room/create', room, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("bearer")
                },
            }).then(response => {
                this.$router.push({ name: 'association.rooms'});
            }).catch(e => {
                if (e.request.response != "") {
                    const message = JSON.parse(e.request.response);
                    this.notification.success = false;
                    this.notification.danger = true;
                    this.notification.title = "Something went wrong.";
                    this.notification.message = message.message;
                }
            });
        },
        invite() {
            const invite = {
                email: this.member.email,
                roomId: this.dbRoom.id
            }

            axios.post('http://localhost:8000/api/v1/member/invite', invite, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("bearer")
                },
            }).then(response => {
                if (response.status === 200) {
                    this.member.email = "";
                    
                    this.notification.success = true;
                    this.notification.danger = false;
                    this.notification.title = "Invite sent!";
                    this.notification.message = `We've mailed an invitation to:  ${invite.email}`;

                    this.toggleInviteModal();
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
        },       
        openRoom() {
            const id = {
                id: this.dbRoom.id
            }
            axios.put('http://localhost:8000/api/v1/room/open', id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("bearer")
                },
            }).then(response => {
                this.dbRoom = response.data.room
            }).catch(e => {
                if (e.request.response != "") {
                    const message = JSON.parse(e.request.response);
                    this.notification.success = false;
                    this.notification.danger = true;
                    this.notification.title = "Something went wrong.";
                    this.notification.message = message.message;
                }
            });
        },
        closeRoom() {
            const id = {
                id: this.dbRoom.id
            }
            axios.put('http://localhost:8000/api/v1/room/close', id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem("bearer")
                },
            }).then(response => {
                this.dbRoom = response.data.room
            }).catch(e => {
                if (e.request.response != "") {
                    const message = JSON.parse(e.request.response);
                    this.notification.success = false;
                    this.notification.danger = true;
                    this.notification.title = "Something went wrong.";
                    this.notification.message = message.message;
                }
            });
        },
        toggleModal() {
            this.createRoom = !this.createRoom;
        },
        toggleInviteModal() {
            this.inviteMember = !this.inviteMember;
        },
    },
}
</script>

<style>

</style>