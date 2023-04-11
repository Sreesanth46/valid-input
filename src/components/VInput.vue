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

<style>
.label-name {
    display: block;
    margin: 0 0 3px 12px;
    font-size: 15px;
    color: #2c3e50;
}

.textbox {
    display: block;
    min-height: 35px;
    min-width: 350px;
    outline: 2px solid rgba(0, 0, 0, 0);
    border: 1px solid rgb(190, 188, 188);
    -moz-border-radius: 10px;
    border-radius: 10px;
    box-sizing: border-box;
    color: #2c3e50;
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    padding: 8px;
    transition: box-shadow 0.15s;
    -moz-box-shadow: 0 0 0 2px rgba(0, 0, 0, 0) inset,
        0 0 0 1px var(--theme-color-fg-default-border) inset;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0) inset,
        0 0 0 1px var(--theme-color-fg-default-border) inset;
    -webkit-transition: 0.1s;
}

.textbox:focus {
    border: 2px solid #239afc;
}

.textbox-error {
    border: 2px solid #f00;
}

.textbox-success {
    border: 2px solid #0f0;
}

.validate-span {
    color: #f00;
    font-size: 12px;
    margin-left: 10px;
}
</style>