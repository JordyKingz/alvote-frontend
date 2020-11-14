<template>
    <div id="votes">
        <div class="bg-white shadow overflow-hidden sm:rounded-md">
            <ul>
                <li 
                    v-for="(vote, index) in votes" :key="index"
                    class="mt-3">
                    <a href="#" class="block hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition duration-150 ease-in-out">
                        <div class="px-4 py-4 sm:px-6">
                            <div class="flex items-center justify-between">
                                <div class="text-sm leading-5 font-medium text-blue-500 truncate">
                                    {{ vote.name }}
                                </div>
                                <div class="ml-2 flex-shrink-0 flex">
                                    <span 
                                        v-if="vote.status == 0"
                                        v-on:click="openVote(vote.id)"
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-blue-500 bg-blue-100 hover:text-blue-700">
                                        Aanzetten
                                    </span>
                                    <span 
                                        v-else-if="vote.status == 1"
                                        v-on:click="closeVote(vote.id)"
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                        Open
                                    </span>
                                    <span 
                                        v-else-if="vote.status == 2"
                                        v-on:click="openVote(vote.id)"
                                        class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-blue-500 bg-blue-100 hover:text-blue-700">
                                        Stemmen binnen
                                    </span>
                                </div>
                            </div>
                            <div class="mt-2 sm:flex sm:justify-between">
                                <div class="sm:flex">
                                    <div class="mr-6 flex items-center text-sm leading-5 text-gray-500">
                                        Stemmen: 
                                        {{ voted }} / {{ members }}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-4 py-4 sm:px-6">
                            <div class="flex items-center justify-between">
                                <div class="ml-2 flex-shrink-0 flex">
                                    <BarChart :chartdata="chartdata" :options="options"/>
                                </div>
                            </div>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import BarChart from '@/components/votes/Chart.vue'

export default {
    name: 'component.votes.overview',
    props: {
        votes: Array,
        members: Number,
        voted: Number,
    },
    components: {
        BarChart
    },
    data: () => ({
        chartdata: {
            labels: ['January', 'February'],
            datasets: [
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 20]
                },
                {
                    label: 'Data One',
                    backgroundColor: '#f87979',
                    data: [40, 20]
                },
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    }),
    methods: {
        openVote(id) {
            axios.put(`${this.$store.getters.serviceUrl}/vote/open`, id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("alvote.bearer")
                },
                params: {
                    id: id
                },
            }).then(response => {
                if (response.status === 200) {
                    for (let index = 0; index < this.votes.length; index++) {
                        if (this.votes[index].id === id) {
                            this.votes[index].status = 1;
                        }
                    }
                }
            }).catch(e => {
                if (e.request.response != "") {
                   console.log(e.request)
                }
            });
        },
        closeVote(id) {
            axios.put(`${this.$store.getters.serviceUrl}/vote/close`, id, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + sessionStorage.getItem("alvote.bearer")
                },
                params: {
                    id: id
                },
            }).then(response => {
                if (response.status === 200) {
                    for (let index = 0; index < this.votes.length; index++) {
                        if (this.votes[index].id === id) {
                            this.votes[index].status = 2;
                        }
                    }
                }
            }).catch(e => {
                if (e.request.response != "") {
                   console.log(e.request)
                }
            });
        }
    }
}
</script>

<style>

</style>