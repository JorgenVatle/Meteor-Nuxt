<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <div>
      <h1 class="text-2xl mb-8 text-center">Hello, world!</h1>
      <div style="max-height: 500px;" class="overflow-auto max-w-2xl" ref="messageOutput">
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
import { computed, defineComponent, watch } from '@vue/composition-api';
import Meteor from 'assets/typescript/Meteor';

export default defineComponent({
  setup(props, context) {
    Meteor.subscribe('messages');
    const messages = Meteor.collection('messages').fetch();
    const userId = Date.now().toString();

    watch(messages, () => {
      const messageOutput = context.refs.messageOutput;
      messageOutput.scrollTo(0, messageOutput.scrollHeight);
    })

    return {
      messageInput: '',
      messages: computed(() => {
        return messages.value.sort((message1, message2) => message1.createdAt.getTime() - message2.createdAt.getTime());
      }),
      sendMessage() {
        const content = this.messageInput;
        this.messageInput = '';
        Meteor.call('messages.post', { content, userId }).catch(() => this.messageInput = content);
      }
    }
  }
})
</script>
