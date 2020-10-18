<template>
    <div id="signin">
        <Alert :notification="notification"/>
        <div class="w-full max-w-xs mx-auto p-4 m-5 border border-gray-200 bg-white shadow">
            <form class="bg-white">
                <div class="mb-4">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                    Email
                    </label>
                    <input 
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                        id="email" 
                        type="email" 
                        v-model="signin.email" 
                        placeholder="Email">
                </div>
                <div class="mb-6">
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                        Password
                    </label>
                    <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        id="password" 
                        v-model="signin.password" 
                        type="password" 
                        placeholder="******************">
                </div>
                <div class="flex items-center justify-between">
                    <button v-if="formInvalid"
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline opacity-50 cursor-not-allowed" 
                        type="button"
                        :disabled="formInvalid">
                        Sign In
                    </button>
                    <button v-else
                        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                        type="button"
                        v-on:click="signinAccount">
                        Sign In
                    </button>
                    <router-link
                        :to="{ name: 'signup' }"
                        class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                        No account yet? Sign up
                    </router-link>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

import Alert from '@/components/alert/Alert.vue'

export default {
    name: "signup",
    components: {
        Alert,
    },
    data() {
        return {
            signin: {
                email: "",
                password: "",
            },
            formInvalid: true,
            validation: {
                error: {
                    password: ""
                },
                requirements: {
                    password: ""
                }
            },
            notification: {
                success: false,
                warning: false,
                danger: false,
                title: "",
                message: ""
            }
        };
    },
    mounted () {
        if (this.notification.notification != undefined)
            this.notification = this.notification.notification
    },
    methods: {
        signinAccount: function () {
            axios.post('http://localhost:8000/api/v1/authenticate', {
                email: this.signin.email,
                password: this.signin.password,
            }).then(response => {
                if (response.status === 200) {
                    sessionStorage.setItem('name', response.data.name)
                    sessionStorage.setItem('email', response.data.email)
                    localStorage.setItem('bearer', response.data.bearer)
                    this.$router.push({
                        name: 'association.dashboard'
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
    watch: {
        signin: {
            handler(input) {
                if (input.password.length > 0 && input.password.length < 10) {
                    this.validation.error.password = "Weak password";
                    this.validation.requirements.password = "Password needs more than 10 characters";
                } else {
                    // remove weak password message
                    this.validation.error.password = "";
                    this.validation.requirements.password = "";
                }

                if (input.email != "" && input.password.length > 9) {
                    this.formInvalid = false;
                } else {
                    this.formInvalid = true; 
                }
            },
            deep: true
        } 
    }
}
</script>

<style>

</style>