<template>
    <div class="input-block">
        <label
                class="input-block__label"
                v-if="label"
                :for="id"
        >{{label}}
        </label> <br>
        <input
                class="input-block__input"
                :id="id"
                type="text"
                :placeholder="placeholder"
        >
    </div>
</template>

<script>
    export default {
        props: {
            id: {
                type: String
            },
            label: {
                type: String
            },
            placeholder: {
                type: String
            }
        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .input-block {
        &__input {
            border: 1px solid $border-color;
            height: 40px;
            padding: 0 16px;
            font-size: 15px;
        }
    }
</style>