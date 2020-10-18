<template>
    <div class="notification">
        <div v-if="notification.success" class="bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
            <p class="font-bold">{{ notification.title }}</p>
            <p>{{ notification.message }}</p>
        </div>
        <div v-else-if="notification.warning" class="bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4" role="alert">
            <p class="font-bold">{{ notification.title }}</p>
            <p>{{ notification.message }}</p>
        </div>
        <div v-else-if="notification.danger" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p class="font-bold">{{ notification.title }}</p>
            <p>{{ notification.message }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Alert',
    props: {
        notification: Object,
    },
}
</script>

<style>

</style>