<template>
    <div class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 transition-opacity">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <!-- This element is to trick the browser into centering the modal contents. -->
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen"></span>&#8203;
        <div class="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
          <div>
            <div class="mt-3 sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Invite member to your room
              </h3>
              <div class="mt-2">
                <p class="text-sm leading-5 text-gray-500">
                  <!-- New meeting? Create your conference room right here! -->
                </p>
              </div>
              <div class="mt-2">
                <label for="name" class="text-left text-sm font-medium leading-5 text-gray-700">Email</label>
                <div class="mt-1 relative">
                  <input 
                    id="name" 
                    v-model="member.email" 
                    placeholder="Members email"
                    class="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                </div>
              </div>
            </div>
          </div>
          <div class="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
            <span class="flex w-full rounded-md shadow-sm sm:col-start-2">
              <button 
                v-on:click="invite"
                type="button" 
                class="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-indigo transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Create
              </button>
            </span>
            <span class="mt-3 flex w-full rounded-md shadow-sm sm:mt-0 sm:col-start-1">
              <button 
                v-on:click="toggleModal"
                type="button" 
                class="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-base leading-6 font-medium text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue transition ease-in-out duration-150 sm:text-sm sm:leading-5">
                Cancel
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  name: 'component.form.invite.member',
  props: {
    member: Object,
  },
  methods: {
    invite() {
      this.$emit('invite');
    },
    toggleModal() {
      this.$emit('toggleModal');
    }
  }
}
</script>

<style>

</style>