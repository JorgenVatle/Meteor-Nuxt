<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <div>
      <h1 class="text-2xl mb-8 text-center">Hello, world!</h1>
      <div>
        <p class="my-4" v-for="message in messages">{{ message }}</p>
      </div>
      <form class="flex" @submit.prevent="sendMessage()">
        <input v-model="messageInput" placeholder="Send a message!" class="bg-gray-800 px-4 py-1 flex-1 rounded-l-lg shadow outline-none">
        <button type="submit" class="bg-indigo-700 text-white font-medium px-6 py-2 rounded-r-lg">
          Send
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/composition-api';
import Meteor from 'assets/typescript/Meteor';

export default defineComponent({
  setup() {
    Meteor.subscribe('messages');

    return {
      messageInput: '',
      messages: Meteor.collection('messages').reactive().data(),
      sendMessage() {
        return Meteor.call('messages.post', this.messageInput);
      }
    }
  }
})
</script>
