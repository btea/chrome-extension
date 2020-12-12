<template>
    <div class="box">
        <h1>hello world</h1>
        <input type="text" v-model="text" />
    </div>
</template>
<script>
import { ref } from 'vue';
export default {
    set() {
        let text = ref('');
        return {
            text
        };
    }
};
</script>
