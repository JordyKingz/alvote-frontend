<template>
    <div class="w-full max-w-xs mx-auto p-4 m-5 border border-gray-200 bg-white shadow">
        <form class="bg-white">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
                Name
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="name" 
                    type="text" 
                    v-model="signup.name" 
                    placeholder="Name">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                Email
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="email" 
                    type="email" 
                    v-model="signup.email" 
                    placeholder="Email">
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="assiciation">
                Association
                </label>
                <input 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="assiciation" 
                    type="text" 
                    v-model="signup.association" 
                    placeholder="Association">
            </div>
            <div class="mb-6">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Password
                </label>
                <input
                    v-if="validation.error.password.length > 0 && 
                    validation.requirements.password.length > 0" 
                    class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password" 
                    v-model="signup.password" 
                    type="password" 
                    placeholder="******************">
                <input
                    v-else 
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                    id="password" 
                    v-model="signup.password" 
                    type="password" 
                    placeholder="******************">
                <p v-if="validation.error.password.length > 0 && 
                    validation.requirements.password.length > 0" 
                    class="text-red-500 text-xs">
                    {{ validation.error.password }}<br>
                    <i>{{ validation.requirements.password }}</i>
                </p>
            </div>
            <div class="flex items-center justify-between">
                <button 
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                    type="button"
                    :disabled="formInvalid"
                    v-on:click="signupAccount">
                    Sign Up
                </button>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                Already an account?
                </a>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: "Signup",
    data() {
        return {
        signup: {
            name: "",
            email: "",
            association: "",
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
        }
        };
    },
    mounted() {
        console.log("mounted")
        console.log(this.signup)
    },
    methods: {
        signupAccount: function () {
            // to nothing
            console.log('clicked')
            axios.post('http://localhost:8000/api/v1/register', {
                name: this.signup.name,
                email: this.signup.email,
                association: this.signup.association,
                password: this.signup.password,
            }).then(response => {
                console.log(response)
            }).catch(e => {
                console.log(e)
            });
        }
    },
    watch: {
        signup: {
            handler(input) {
                if (input.password.length > 0 && input.password.length < 10) {
                    this.validation.error.password = "Weak password";
                    this.validation.requirements.password = "Password needs more than 10 characters";
                } else {
                    // remove weak password message
                    this.validation.error.password = "";
                    this.validation.requirements.password = "";
                }

                if (
                    input.name != "" &&
                    input.email != "" &&
                    input.association != "" &&
                    input.password.length > 9) {
                        console.log('validform')
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