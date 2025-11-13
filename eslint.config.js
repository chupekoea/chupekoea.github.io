import js from '@eslint/js'
import vuePlugin from 'eslint-plugin-vue'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'

export default [
    js.configs.recommended,
    {
        files: ['**/*.vue'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: { vue: vuePlugin },
        rules: {
            // Простые базовые правила (дополните по желанию)
            'vue/multi-word-component-names': 'off',
            'vue/no-v-html': 'off',
            'no-console': 'warn',
            'no-debugger': 'warn',
            'semi': ['error', 'never'],
            'quotes': ['error', 'single'],
        },
    },
    {
        files: ['**/*.ts', '**/*.js'],
        languageOptions: {
            parser: tsParser,
            ecmaVersion: 'latest',
            sourceType: 'module',
        },
        plugins: { '@typescript-eslint': tsPlugin },
        rules: {
            '@typescript-eslint/no-unused-vars': 'warn',
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]
