<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto my-32">
      <div class="bg-gray-800 rounded-lg shadow-2xl p-4 overflow-auto" style="max-height: 650px" ref="messageOutput">
        <div class="font-mono whitespace-pre-wrap text-gray-300 mb-8" v-for="message in messages">{{ message }}</div>
      </div>

      <div class="flex items-center justify-between mt-6">
        <router-link to="/" class="text-gray-700 flex items-center hover:underline flex-grow pr-4">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <div class="ml-2 flex-shrink">
            View example with Vue's new <span class="font-medium">Composition API</span>.
          </div>
        </router-link>

        <a href="#" class="text-gray-700 flex items-center mr-4 hover:underline flex-1 justify-end">
          <div class="mr-4">
            View source
          </div>
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Meteor from 'assets/typescript/Meteor';

export default {
  mounted() {
    Meteor.subscribe('messages')
  },

  computed: {
    messages() {
      return Meteor.collection('messages').fetch().value
        .sort((message1, message2) => message1.createdAt.getTime() - message2.createdAt.getTime());
    }
  },

  watch: {
    messages() {
      const messageOutput = this.$refs.messageOutput;
      setTimeout(() => messageOutput.scrollTo(0, messageOutput.scrollHeight)); // Ensuring this runs after render has finished.
    }
  }
}
</script>
