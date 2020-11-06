<template>
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Code
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Members
                </th>
                <th class="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 bg-gray-50"></th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(room, key) in rooms" :key="key">
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="flex items-center">
                    <div class="ml-4 room-link" v-on:click="openRoom(room.id)">
                      <div class="text-sm leading-5 font-medium text-gray-900">
                        {{ room.name }}
                      </div>
                      <div class="text-sm leading-5 text-gray-500">
                        {{ association.name }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">
                    {{ room.join_code }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <div class="text-sm leading-5 text-gray-900">
                    {{ room.members_joined }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap">
                  <span v-if="room.status == 0" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    Created
                  </span>
                  <span v-if="room.status == 1" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Open
                  </span>
                  <span v-if="room.status == 2" class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    Closed
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-no-wrap text-right text-sm leading-5 font-medium">
                  <a v-on:click="deleteRoom(room.id)" href="#" class="text-red-600 hover:text-red-900">Delete</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'component.tables.rooms',
  props: {
    rooms: Array,
    association: Object,
  },
  methods: {
    openRoom(id) {
      this.$emit('openRoom', id);
    },
    deleteRoom(id) {
      this.$emit('deleteRoom', id);
    }
  }
}
</script>

<style>
.room-link:hover {
  cursor: pointer;
}
</style>