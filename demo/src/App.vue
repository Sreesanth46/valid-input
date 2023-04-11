<template>
    <div>
        <VInput v-model="inputValue" :validationType="`email`">Hey</VInput>
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
