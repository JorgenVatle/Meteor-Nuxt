<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto mt-32">
      <div class=" bg-gray-900 rounded-lg shadow-2xl p-4">

        <!-- Heading -->
        <h1 class="text-2xl mb-8 text-center">Meteor Chat, but on Nuxt!</h1>

        <!-- Messages -->
        <div style="height: 500px;" class="overflow-auto max-w-2xl" ref="messageOutput">
          <chat-message class="py-4" v-for="message in messages" :message="message" :key="message.id" />
        </div>

        <!-- Send Message -->
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
import ChatMessage from '~/components/chat-message';

export default defineComponent({
  components: { ChatMessage },
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
