<template>
    <div class="visit-snippet">
        {{visit.patientName}}
    </div>
</template>

<script>
    export default {
        props: {
            visit: {
                type: Object,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .visit-snippet {
        width: 100%;
        height: 150px;
        background-color: #fff;
        border-radius: $border-radius;
        margin-bottom: 30px;
        padding: 20px 30px;
        box-sizing: border-box;
    }
</style>