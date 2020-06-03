<template>
    <div class="input-block">
        <label
                class="input-block__label"
                v-if="label"
                :for="id"
        >{{label}}<span v-if="required" class="required-sign">*</span>
        </label> <br>
        <input
                :type="type"
                v-bind="$attrs"
                v-on="$listeners"
                @input="$emit('update', $event.target.value)"
                class="input-block__input"
                :id="id"
                :placeholder="placeholder"
                :style="{'margin-top': label ? '7px' : '0'}"
                :class="{'input-block__input_invalid': invalidCondition ? (invalidCondition) : false}"
        >
        <span class="input-block__error" v-if="invalidCondition">{{invalidMessage}}</span>
    </div>
</template>

<script>
    export default {
        model: {
            prop: "value",
            event: "update"
        },
        props: {
            id: {
                type: String
            },
            label: {
                type: String
            },
            placeholder: {
                type: String
            },
            required: {
                type: Boolean
            },
            invalidCondition: {
                type: Boolean
            },
            type: {
                type: String,
                default: 'text'
            },
            invalidMessage: {
                type: String,
                default: 'Заполните поле!'
            }
        },
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .input-block {
        width: 100%;
        margin-bottom: 20px;
        height: 75px;
        &__input {
            box-sizing: border-box;
            width: 100%;
            border: 1px solid $border-color;
            height: 40px;
            padding: 0 16px;
            font-size: 15px;
            border-radius: $border-radius;

            &_invalid {
                border: 1px solid $accent-pink-color;
            }
        }

        &__error {
            display: block;
            padding-top: 4px;
            font-size: 12px;
            color: $accent-pink-color;
        }
    }
</style>