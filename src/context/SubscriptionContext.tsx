import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SubscriptionState {
    planId: string | null;
    mealTypes: string[]; // ['Breakfast', 'Lunch', 'Dinner']
    schedule: {
        morning: string | null; // Address ID
        afternoon: string | null;
        night: string | null;
    };
    preferences: {
        spiceLevel: string;
        oilLevel: string;
        dietType: string;
    };
    customization: {
        base: string;
        portion: string;
        addons: string[];
        instructions: string;
    };
    activeSubscription: any | null; // Store the confirmed subscription
}

interface SubscriptionContextType {
    state: SubscriptionState;
    setPlan: (id: string) => void;
    toggleMealType: (type: string) => void;
    setSchedule: (slot: 'morning' | 'afternoon' | 'night', addressId: string) => void;
    setPreference: (key: keyof SubscriptionState['preferences'], value: string) => void;
    setCustomization: (customization: Partial<SubscriptionState['customization']>) => void;
    completeSubscription: () => void;
    resetSubscription: () => void;
    toggleActiveSubscriptionStatus: () => void;
    updateActiveSubscriptionAddons: (addons: string[]) => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
    const initialState: SubscriptionState = {
        planId: null,
        mealTypes: [],
        schedule: { morning: null, afternoon: null, night: null },
        preferences: { spiceLevel: 'Medium', oilLevel: 'Standard', dietType: 'Veg' },
        customization: { base: '', portion: '', addons: [], instructions: '' },
        activeSubscription: null,
    };

    const [state, setState] = useState<SubscriptionState>(initialState);

    const setPlan = (id: string) => setState(prev => ({ ...prev, planId: id }));

    const toggleMealType = (type: string) => {
        setState(prev => {
            const exists = prev.mealTypes.includes(type);
            return {
                ...prev,
                mealTypes: exists
                    ? prev.mealTypes.filter(t => t !== type)
                    : [...prev.mealTypes, type]
            };
        });
    };

    const setSchedule = (slot: 'morning' | 'afternoon' | 'night', addressId: string) => {
        setState(prev => ({
            ...prev,
            schedule: { ...prev.schedule, [slot]: addressId }
        }));
    };

    const setPreference = (key: keyof SubscriptionState['preferences'], value: string) => {
        setState(prev => ({
            ...prev,
            preferences: { ...prev.preferences, [key]: value }
        }));
    };

    const setCustomization = (customization: Partial<SubscriptionState['customization']>) => {
        setState(prev => ({
            ...prev,
            customization: { ...prev.customization, ...customization }
        }));
    };

    const completeSubscription = () => {
        setState(prev => ({
            ...prev,
            activeSubscription: {
                planId: prev.planId,
                mealTypes: prev.mealTypes,
                schedule: prev.schedule,
                preferences: prev.preferences,
                customization: prev.customization,
                startDate: new Date().toISOString(),
                status: 'active'
            },
            // We keep the wizard state or clear it? Let's clear it but keep activeSubscription
            planId: null,
            mealTypes: [],
            schedule: { morning: null, afternoon: null, night: null },
            preferences: { spiceLevel: 'Medium', oilLevel: 'Standard', dietType: 'Veg' },
            customization: { base: '', portion: '', addons: [], instructions: '' }
        }));
    };

    const resetSubscription = () => setState(initialState);

    const toggleActiveSubscriptionStatus = () => {
        setState(prev => {
            if (!prev.activeSubscription) return prev;
            return {
                ...prev,
                activeSubscription: {
                    ...prev.activeSubscription,
                    status: prev.activeSubscription.status === 'active' ? 'paused' : 'active'
                }
            };
        });
    };

    const updateActiveSubscriptionAddons = (addons: string[]) => {
        setState(prev => {
            if (!prev.activeSubscription) return prev;
            return {
                ...prev,
                activeSubscription: {
                    ...prev.activeSubscription,
                    customization: {
                        ...prev.activeSubscription.customization,
                        addons
                    }
                }
            };
        });
    };

    return (
        <SubscriptionContext.Provider value={{ state, setPlan, toggleMealType, setSchedule, setPreference, setCustomization, completeSubscription, resetSubscription, toggleActiveSubscriptionStatus, updateActiveSubscriptionAddons }}>
            {children}
        </SubscriptionContext.Provider>
    );
}

export function useSubscription() {
    const context = useContext(SubscriptionContext);
    if (context === undefined) {
        throw new Error('useSubscription must be used within a SubscriptionProvider');
    }
    return context;
}
