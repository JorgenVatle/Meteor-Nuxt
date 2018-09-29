<template>
    <section class="section">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title has-text-grey">
                    Basic Chat Widget
                </p>
            </header>
            <div class="card-content messages-container">
                <div v-for="message in messages" class="message-container">
                    <span class="message" v-text="message.content"></span>
                </div>
            </div>
            <footer class="card-footer">
                <form @submit.prevent="sendMessage" class="card-footer-item">
                    <b-field class="is-fullwidth">
                        <b-input expanded placeholder="Enter your message." v-model="message"></b-input>
                        <p class="control">
                            <button type="submit" class="button is-primary">Send</button>
                        </p>
                    </b-field>
                </form>
            </footer>
        </div>
    </section>
</template>

<script>
    import Messages from 'api/messages/messages';

    export default {
        data() {
            return {
                loading: false,
                message: '',
            }
        },

        methods: {
            sendMessage() {
                const message = this.message;
                this.message = '';

                if (!message) {
                    return;
                }

                Meteor.call('messages.post', message, (err, resp) => {
                    this.loading = false;

                    if (err) {
                        this.$toast.open({
                            type: 'is-danger',
                            message: 'Could not post message!',
                        })
                    }
                });
            }
        },

        meteor: {
            $subscribe: {
                messages: [],
            },

            messages() {
                return Messages.find({}, { sort: { createdAt: 1 } });
            }
        }
    }
</script>

<style>
    .message-container:not(:last-child) {
        margin-bottom: 10px;
    }

    .message {
        padding: 0.2em 0.4em;
        background-color: ghostwhite;
        border-radius: 5px;
    }

    .field.is-fullwidth {
        width: 100%;
    }

    .messages-container {
        height: 75vh;
        max-height: 75vh;
        overflow-y: scroll;
    }
</style>