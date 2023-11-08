<template>
    <div class="input-container">
        <label class="label-name"><slot></slot></label>
        <input
            id="appInput"
            class="textbox"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            @input="updateValue"
            @blur="validate"
        />
        <slot name="validation">
            <span class="validate-span">{{ errorMessage() }}</span>
        </slot>
    </div>
</template>

<script>
import { useVuelidate } from "@vuelidate/core";
import {
    requiredIf,
    minLength,
    maxLength,
    email,
    alpha,
    alphaNum,
    numeric,
    helpers,
} from "@vuelidate/validators";

export default {
    props: {
        modelValue: {
            default: "",
        },

        type: {
            type: String,
            default: "text",
        },

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
    },

    validations() {
        return {
            modelValue: {
                requiredIf: requiredIf(this.required),
                minLength: minLength(this.minLength),
                maxLength: maxLength(this.maxLength),
                validationType: this.switchValidationType(),
            },
        };
    },

    data() {
        return {
            v$: useVuelidate(),
            error: false,
        };
    },

    watch: {
        error() {
            if (this.error) {
                const element = document.getElementById("appInput");
                element.classList.add("textbox-error");
            } else {
                const element = document.getElementById("appInput");
                element.classList.remove("textbox-error");
            }
        },
    },

    methods: {
        updateValue(event) {
            this.$emit("update:modelValue", event.target.value);
        },

        errorMessage() {
            if (this.v$.modelValue.$errors.length > 0) {
                this.error = true;
                return this.v$.modelValue.$errors[0].$message;
            } else {
                this.error = false;
            }
        },

        switchValidationType() {
            switch (this.validationType) {
                case "email":
                    return email;
                case "alpha":
                    return alpha;
                case "alphaNum":
                    return alphaNum;
                case "numeric":
                    return numeric;
                case "regex":
                    return helpers.withMessage(
                        "Invalid format",
                        helpers.regex(this.regex)
                    );
                default:
                    return minLength(0);
            }
        },

        validate() {
            this.v$.$validate();
        },
    },
};
</script>

<!-- <script setup lang="ts">
import { PropType } from "vue";

type TInput = "email" | "password" | "number" | "date" | "search";

defineProps({
    modelValue: { type: [String, Number], required: true, default: "" },
    inputType: { type: String as PropType<TInput>, default: "text" },
    name: { type: String, required: true },
    id: { type: String, required: true },
    placeholder: { type: String },
    required: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
});

const emit = defineEmits(["update:modelValue"]);

function updateInput(event: any) {
    emit("update:modelValue", event.target.value);
}
</script>

<template>
    <div>
        <label
            :for="name"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
            <slot></slot>
        </label>
        <input
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            :type="inputType"
            :name="name"
            :id="id"
            :placeholder="placeholder"
            :required="required"
            :disabled="disabled"
            :value="modelValue"
            @input="updateInput"
            @blur="validate"
        />
        <slot name="validation">
            <span class="validate-span">{{ errorMessage() }}</span>
        </slot>
    </div>
</template>

<style scoped>
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type="number"] {
    -moz-appearance: textfield;
}
</style> -->
