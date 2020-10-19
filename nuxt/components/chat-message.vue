<template>
  <div class="flex">
    <img :src="message.user.picture.thumbnail" class="h-8 rounded-full mr-4">
    <div>
      <span class="font-medium block text-gray-600 leading-none mb-1">{{ message.user.name }}</span>
      <p class="text-gray-200">{{ message.content }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "@vue/composition-api";

export default defineComponent({
  name: 'chat-message',
  props: {
    message: String,
  },

  setup(props, context) {
    console.log(context);
  }
})
</script>
