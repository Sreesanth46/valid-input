<script setup lang="ts">
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
    minLength: { type: Number, default: 0 },
    maxLength: { type: Number, default: 500 },
    validationType: { type: String },
    regex: { type: RegExp },
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
        />
        <slot name="validation">
            <!-- <span class="validate-span">{{ errorMessage() }}</span> -->
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
</style>
