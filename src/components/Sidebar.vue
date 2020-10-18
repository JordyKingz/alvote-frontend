<template>
    <!-- Static sidebar for desktop -->
    <div id="sidebar" class="hidden md:flex md:flex-shrink-0">
        <div class="flex flex-col w-64">
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div class="flex flex-col h-0 flex-1 bg-gray-800">
                <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                    <div class="flex items-center flex-shrink-0 px-4">
                        <h1 class="text-2xl font-semibold text-white">ALVote</h1>
                    </div>
                    <nav class="mt-5 flex-1 px-2 bg-gray-800 space-y-1">
                        <router-link 
                            :to="{ name: 'association.dashboard' }" 
                            class="
                                group 
                                flex 
                                items-center 
                                px-2 
                                py-2 
                                text-sm 
                                leading-5 
                                font-medium 
                                text-white 
                                rounded-md  
                                focus:outline-none 
                                focus:bg-gray-700 
                                transition 
                                ease-in-out 
                                duration-150">
                        <!-- Heroicon name: home -->
                        <svg 
                            class="
                                mr-3 
                                h-6 
                                w-6 
                                text-gray-300 
                                group-hover:text-gray-300 
                                group-focus:text-gray-300 
                                transition 
                                ease-in-out 
                                duration-150" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Dashboard
                        </router-link>
                        <router-link 
                            :to="{ name: 'association.rooms' }" 
                            class="
                                group 
                                flex 
                                items-center 
                                px-2 
                                py-2 
                                text-sm 
                                leading-5 
                                font-medium 
                                text-white 
                                rounded-md 
                                focus:outline-none 
                                focus:bg-gray-700 
                                transition 
                                ease-in-out 
                                duration-150">
                        <svg 
                            class="
                                mr-3 
                                h-6 
                                w-6 
                                text-gray-400 
                                group-hover:text-gray-300 
                                group-focus:text-gray-300 
                                transition 
                                ease-in-out 
                                duration-150" 
                            xmlns="http://www.w3.org/2000/svg" 
                            fill="none" 
                            viewBox="0 0 24 24" 
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Rooms
                        </router-link>
                    </nav>
                </div>
                <div class="flex-shrink-0 flex bg-gray-700 p-4">
                    <a href="#" class="flex-shrink-0 w-full group block">
                        <div class="flex items-center">
                            <div class="ml-3">
                                <p class="text-sm leading-5 font-medium text-white">
                                    {{ name }}
                                </p>
                                <p class="text-xs leading-4 font-medium text-gray-300 group-hover:text-gray-200 transition ease-in-out duration-150">
                                    View profile
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
                <div class="flex-shrink-0 flex bg-gray-800 p-4">
                    <a v-on:click="signOut" href="" class="flex-shrink-0 w-full group block">
                        <div class="flex items-center">
                            <div class="ml-3">
                                <p class="text-xs leading-4 font-medium text-gray-300 group-hover:text-gray-200 transition ease-in-out duration-150">
                                    sign out
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'sidebar',
    props: {
        name: String,
    },
    methods: {
        signOut() {
            localStorage.removeItem('bearer')
            sessionStorage.removeItem('name')
            sessionStorage.removeItem('email')

            this.$router.push({ name: 'signin'} )
        }
    }
}
</script>
