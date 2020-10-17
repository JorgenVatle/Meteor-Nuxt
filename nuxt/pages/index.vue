<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto mt-32">
      <div class=" bg-gray-900 rounded-lg shadow-2xl p-4">
        <h1 class="text-2xl mb-8 text-center">Meteor Chat, but on Nuxt!</h1>
        <div style="height: 500px;" class="overflow-auto max-w-2xl" ref="messageOutput">
          <div class="py-4 flex" v-for="message in messages" :key="message.id">
            <img :src="message.user.picture.thumbnail" class="h-8 rounded-full mr-4">
            <div>
              <span class="font-medium block text-gray-600 leading-none mb-1">{{ message.user.name }}</span>
              <p class="text-gray-200">{{ message.content }}</p>
            </div>
          </div>
        </div>
        <form class="flex pt-2" @submit.prevent="sendMessage()">
          <input v-model="messageInput" placeholder="Send a message!" class="bg-gray-800 px-4 py-1 flex-1 rounded-l-lg shadow outline-none" autofocus="autofocus">
          <button type="submit" class="bg-indigo-800 text-white font-medium px-6 py-2 rounded-r-lg">
            Send
          </button>
        </form>
      </div>

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
