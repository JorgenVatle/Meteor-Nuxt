<template>
  <div class="h-screen w-screen flex justify-center items-center">
    <h1 class="m-auto text-2xl">Hello, world!</h1>
    <div>
      <p class="my-4" v-for="message in messages">{{ message }}</p>
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
      messages: Meteor.collection('messages').reactive().data();
    }
  }
})
</script>
