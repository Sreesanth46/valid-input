# valid-input

## Installation

```
npm install @harv46/valid-input
```

You can import the library directly to components

```
<script>
import { VInput } from "@harv46/valid-input";
import "@harv46/valid-input/dist/style.css";
</script>

```

## Basic usage

```
<template>
    <div>
        <VInput v-model="inputValue" :validationType="`email`">Email</VInput>
    </div>
</template>

<script>
import { VInput } from "@harv46/valid-input";
import "@harv46/valid-input/dist/style.css";

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

### Props

```
    minLength: {
        default: 0,
    },

    maxLength: {
        default: 500,
    },

    required: {
        type: Boolean,
        default: false,
    },

    validationType: {
        type: String,
    },

    regex: {},

    placeholder: {
        type: String,
    },

```

## validationType values

-   email - Accepts valid email addresses.
-   alpha -Accepts only alphabet characters.
-   alphaNum - Accepts only alphanumerics.
-   numeric - Accepts only numerics. String numbers are also numeric.
-   regex - Accepts valid regular expressions, also should provide :regex property.

### Regex example

```
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
