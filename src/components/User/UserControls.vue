<template>
    <div class="controls">
        <button-comp>Редактировать</button-comp>
        <button-comp>Удалить</button-comp>
    </div>
</template>

<script>
    import Button from "../UI/Button"

    export default {
        components: {
            'button-comp': Button
        }
    }
</script>

<style lang="scss" scoped>
    .controls {
        padding: 10px 0;
        @include flex(flex-end, center, row);
    }
</style>