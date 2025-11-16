import { FEATURES, type FeatureKey } from '@/shared/config/features'

export const useFeatures = () => {
    const isFeatureEnabled = (featureKey: FeatureKey): boolean => {
        return FEATURES[featureKey]
    }

    return {
        isFeatureEnabled,
        features: FEATURES
    }
}
