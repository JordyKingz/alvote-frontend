<template>
    <div id="confirm-account"></div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'account.confirmation',
    data() {
        return {
            urlToken: this.$route.params.activationToken,
            notification: {
                success: false,
                warning: false,
                danger: false,
                title: "",
                message: ""
            }
        };
    },
    mounted() {
        // Activate User with token
        axios.post('http://localhost:8000/api/v1/confirm/account', {
            token: this.urlToken,
        }).then(response => {
            if (response.status === 200) {
                this.notification.success = true;
                this.notification.title = "Account activated.";
                this.notification.message = "Your account has been activated, you can now sign in.";
                
                this.$router.push({ name: 'signin', params: { notification: this.notification}});
            }
        }).catch(e => {
            if (e.request.status === 400) {
                const message = JSON.parse(e.request.response);
                this.notification.success = false;
                this.notification.danger = true;
                this.notification.title = "Something went wrong.";
                this.notification.message = message.message;
                
                this.$router.push({ name: 'signin', params: { notification: this.notification}});
            }
        });
    }
}
</script>

<style>

</style>