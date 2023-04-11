<template>
    <div>
        <VInput v-model="inputValue" :validationType="`email`">Email</VInput>
        {{ inputValue }}
    </div>
</template>

<script>
import { VInput } from "../../src/main";
import "../../dist/style.css";

export default {
    components: {
        VInput,
    },

    data() {
        return {
            inputValue: "",
        };
    },
};
</script>
