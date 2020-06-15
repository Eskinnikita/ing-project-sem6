<template>
    <button :style="{'width': width ? width : 'auto' }" :class="reject ? 'button-comp button-comp_reject' : 'button-comp'"  :disabled="isDisabled">
        <slot/>
    </button>
</template>

<script>
    export default {
        props: {
            isDisabled: {
                type: Boolean
            },
            width: {
                type: String,
                default: null
            },
            reject: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss" scoped>
    .button-comp {
        height: 40px;
        font-size: 15px;
        cursor: pointer;
        border: none;
        border-radius: $border-radius;
        background-color: $accent-blue-color;
        color: #fff;
        padding: 0 20px;
        margin: 0 10px;
        transition: opacity 0.3s;
        &_reject {
            background-color: $accent-pink-color;
        }
        &:hover {
            opacity: 0.6;
        }
        &:disabled, &[disabled] {
            opacity: 0.6;
            cursor: default;
        }
    }
</style>