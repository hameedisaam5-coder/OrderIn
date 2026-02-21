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
    activeSubscription: any | null; // Store the confirmed subscription
}

interface SubscriptionContextType {
    state: SubscriptionState;
    setPlan: (id: string) => void;
    toggleMealType: (type: string) => void;
    setSchedule: (slot: 'morning' | 'afternoon' | 'night', addressId: string) => void;
    setPreference: (key: keyof SubscriptionState['preferences'], value: string) => void;
    completeSubscription: () => void;
    resetSubscription: () => void;
}

const SubscriptionContext = createContext<SubscriptionContextType | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: ReactNode }) {
    const initialState: SubscriptionState = {
        planId: null,
        mealTypes: [],
        schedule: { morning: null, afternoon: null, night: null },
        preferences: { spiceLevel: 'Medium', oilLevel: 'Standard', dietType: 'Veg' },
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

    const completeSubscription = () => {
        setState(prev => ({
            ...prev,
            activeSubscription: {
                planId: prev.planId,
                mealTypes: prev.mealTypes,
                schedule: prev.schedule,
                preferences: prev.preferences,
                startDate: new Date().toISOString(),
                status: 'active'
            },
            // We keep the wizard state or clear it? Let's clear it but keep activeSubscription
            planId: null,
            mealTypes: [],
            schedule: { morning: null, afternoon: null, night: null },
            preferences: { spiceLevel: 'Medium', oilLevel: 'Standard', dietType: 'Veg' }
        }));
    };

    const resetSubscription = () => setState(initialState);

    return (
        <SubscriptionContext.Provider value={{ state, setPlan, toggleMealType, setSchedule, setPreference, completeSubscription, resetSubscription }}>
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
