<template>
    <header>
        <slot />
        <button type="button" class="cart-button" @click="$emit('basket-toggle')">Корзина</button>
    </header>
</template>

<script>
export default {
    name: 'Header',
    created() {
        this.$eventBus.$on('button-click', this.handleButtonClick);
    },
    methods: {
        handleButtonClick(payload) {
            console.log('handleButtonClick', payload);
        }
    }
};
</script>

<style scoped>
button {
    border: none;
    border-radius: 20px;
    padding: 7px 20px;
    background: #0b5bb8;
    font-size: 16px;
    font-weight: 600;
    font-family: inherit;
    cursor: pointer;
    color: #fff;
}

button:focus {
    outline: none;
    background: #0c50a0;
}

button:hover {
    background: #3b7eb9;
}
</style>
