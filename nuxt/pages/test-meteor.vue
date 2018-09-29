<template>
    <section class="section">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title has-text-grey">
                    Basic Chat Widget
                </p>
            </header>
            <div class="card-content">
                <span class="message">Testing testing 123</span>
            </div>
            <footer class="card-footer">
                <div class="card-footer-item">
                    <b-field class="is-fullwidth">
                        <b-input expanded placeholder="Enter your message."></b-input>
                    </b-field>
                </div>
            </footer>
        </div>
    </section>
</template>

<style>
    .message {
        padding: 0.2em 0.4em;
        background-color: ghostwhite;
        border-radius: 5px;
    }

    .field.is-fullwidth {
        width: 100%;
    }
</style>