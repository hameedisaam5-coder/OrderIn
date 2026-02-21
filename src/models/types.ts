export interface Address {
    id: string;
    label: string; // e.g., "Home", "Office"
    fullAddress: string;
    coordinates?: {
        latitude: number;
        longitude: number;
    };
}

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    addresses: Address[];
    activeSubscriptionId?: string;
    role: 'user' | 'admin'; // 'user' is default
}

export interface Meal {
    id: string;
    kitchenId: string;
    name: string;
    description: string;
    price: number;
    image: string; // URL or local asset require
    type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Combo' | 'Snack';
    isVegetarian: boolean;
    calories?: number;
    isSubscription?: boolean;
}

export interface Kitchen {
    id: string;
    name: string;
    rating: number;
    cuisine: string[];
    imageUrl: string;
    deliveryTime: string; // e.g., "30-45 min"
    verified: boolean;
    isSubscription?: boolean; // Indicates if this is a home kitchen offering subscriptions
    menu: Meal[];
}

export interface SubscriptionPlan {
    id: string;
    name: string; // "Weekly", "Monthly"
    durationDays: number;
    price: number;
    description: string;
}

export interface Subscription {
    id: string;
    userId: string;
    planId: string;
    startDate: string; // ISO date
    endDate: string; // ISO date
    status: 'active' | 'paused' | 'expired';
    preferences: {
        spiceLevel: 'Low' | 'Medium' | 'High';
        oilLevel: 'Low' | 'Medium' | 'Standard';
        dietType: 'Veg' | 'Non-Veg' | 'Egg' | 'Vegan';
    };
    schedule: {
        morning?: string; // Address ID
        afternoon?: string; // Address ID
        night?: string; // Address ID
    };
}

export interface Order {
    id: string;
    userId: string;
    kitchenId: string;
    items: { mealId: string; quantity: number }[];
    totalAmount: number;
    status: 'Confirmed' | 'Preparing' | 'Out for Delivery' | 'Delivered';
    createdAt: string; // ISO date
    deliveryAddressId: string;
}
