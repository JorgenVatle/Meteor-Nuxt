<template>
  <div class="flex">
    <img alt="profile image" :src="message.user.picture.thumbnail" class="h-8 w-8 rounded-full mr-4">
    <div>
      <span class="font-medium block text-gray-600 leading-none mb-1">{{ message.user.name }}</span>
      <div class="prose" v-html="sanitizedMessage"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent} from "@vue/composition-api";
import marked from "marked";
import {MessageDocument} from "~/assets/typescript/types/MessageDocument";
import sanitize from "sanitize-html";

export default defineComponent({
  name: 'chat-message',
  props: {
    message: {
      required: true,
    },
  },

  setup(props: { message: MessageDocument }) {
    const sanitizedMessage = computed(() => {
      const html = marked(props.message.content);
      return sanitize(html);
    });

    return {
      sanitizedMessage,
    }
  }
})
</script>
