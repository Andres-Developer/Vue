<template>
    <div>Soy un post {{id}}</div>
</template>

<script>
export default {
    name: "PostId",
    computed: {
        id() {
            return this.$route.params.id
        }
    }
}
</script>