<template>
    <div id="breadcrumb">
        <div class="flex-1 min-w-0">
            <div class="mt-5">
                <nav class="flex" aria-label="Breadcrumb">
                    <ol class="flex items-center space-x-4">
                        <li>
                            <div>
                                <router-link 
                                    :to="{ name: 'association.dashboard' }" class="text-gray-400 hover:text-gray-500">
                                    <svg class="flex-shrink-0 h-5 w-5 transition duration-150 ease-in-out" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                
                                    <span class="sr-only">Dashboard</span>
                                </router-link>
                            </div>
                        </li>
                        <li v-for="(route, index) in routes" :key="index">
                            <div class="flex items-center space-x-4">
                                <svg class="flex-shrink-0 h-5 w-5 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                                </svg>
                                <router-link 
                                    :to="{ name: route.url }" 
                                    aria-current="page" 
                                    class="text-sm leading-5 font-medium text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out">
                                    {{ route.name }}
                                </router-link>
                            </div>
                        </li>
                    </ol>
                </nav>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'breadcrumb',
    props: {
        routes: Array,
    }
}
</script>

<style>

</style>