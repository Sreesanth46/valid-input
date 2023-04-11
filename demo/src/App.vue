<template>
    <div>
        <VInput
            v-model="inputValue"
            :minLength="4"
            :maxLength="10"
            :placeholder="Username"
            :validationType="`regex`"
            :regex="/[a-z]+/g"
            >Username</VInput
        >
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
