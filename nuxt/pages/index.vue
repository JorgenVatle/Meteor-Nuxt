<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto mt-32">
      <div class="bg-white rounded-lg shadow-2xl py-4">

        <!-- Heading -->
        <h1 class="text-2xl mb-8 text-center text-gray-700">Meteor Chat, but on Nuxt!</h1>

        <!-- Messages -->
        <div style="height: 500px;" class="overflow-auto max-w-2xl" ref="messageOutput">
          <chat-message class="p-4 hover:bg-gray-100" v-for="message in messages" :message="message" :key="message.id" />
        </div>

        <!-- Send Message -->
        <form class="flex pt-2 px-4" @submit.prevent="sendMessage()">
          <input v-model="messageInput" placeholder="Send a message!" class="bg-gray-200 px-4 py-1 flex-1 rounded-l-lg shadow outline-none" autofocus="autofocus">
          <button type="submit" class="bg-indigo-600 text-white font-medium px-6 py-2 rounded-r-lg">
            Send
          </button>
        </form>

      </div>

      <div class="flex items-center justify-between mt-6">
        <router-link to="/no-composition" class="text-gray-700 flex items-center hover:underline flex-grow pr-4">
          <svg class="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          <div class="ml-2 flex-shrink">
            View Non-Composition API Example
          </div>
        </router-link>

        <a href="https://github.com/JorgenVatle/Meteor-Nuxt/blob/master/nuxt/pages/index.vue" target="_blank" class="text-gray-700 flex items-center mr-4 hover:underline flex-1 justify-end">
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

        if (!content) {
          return;
        }

        this.messageInput = '';

        Meteor.call('messages.post', { content, userId }).catch(() => this.messageInput = content);
      }
    }
  }
})
</script>
