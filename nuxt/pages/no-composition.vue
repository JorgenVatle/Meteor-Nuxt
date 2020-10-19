<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto my-32">
      <div class="bg-gray-800 rounded-lg shadow-2xl p-4 overflow-auto" style="max-height: 500px" ref="messageOutput">
        <div class="font-mono whitespace-pre-wrap text-gray-300 mb-8" v-for="message in messages">{{ message }}</div>
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
