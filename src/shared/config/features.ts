/**
 * Feature toggles для контроля функциональности приложения
 */
export const FEATURES = {
    // Включить/отключить функциональность продажи меда
    SALES_ENABLED: import.meta.env.VITE_SALES_ENABLED === 'true'
} as const

export type FeatureKey = keyof typeof FEATURES
