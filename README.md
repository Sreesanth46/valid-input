# valid-input

## Installation

```
npm install valid-input
```

## Usage

```
<template>
    <div>
        <VInput v-model="inputValue" :validationType="`email`">Email</VInput>
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
```
