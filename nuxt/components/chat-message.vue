<template>
  <div class="flex" v-show="sanitizedMessage.length">
    <img alt="profile image" :src="message.user.picture.thumbnail" class="h-8 w-8 rounded-full mr-4">
    <div class="flex-1">
      <div class="mb-1 -mt-1 flex items-center">
        <span class="font-medium text-gray-700 leading-none flex-1">{{ message.user.name }}</span>
        <span class="text-gray-500 leading-none text-xs">{{ timestamp }}</span>
      </div>
      <div class="prose" v-html="sanitizedMessage"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "@vue/composition-api";
import marked from "marked";
import {MessageDocument} from "~/assets/typescript/types/MessageDocument";
import sanitize from "sanitize-html";
import moment from 'moment';

export default defineComponent({
  name: 'chat-message',
  props: {
    message: {
      required: true,
    },
  },

  setup({ message }: { message: MessageDocument }) {
    const sanitizedMessage = computed(() => {
      const html = marked(message.content);
      return sanitize(html);
    });

    const timestamp = computed(() => {
      return moment(message.createdAt).calendar();
    });

    return {
      sanitizedMessage,
      timestamp,
    }
  }
})
</script>
