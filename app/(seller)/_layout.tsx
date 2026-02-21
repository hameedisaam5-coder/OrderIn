import { Tabs, useRouter } from 'expo-router';
import { Home, ListOrdered, UtensilsCrossed, User } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import { useAppMode } from '../../src/context/AppModeContext';
import { useEffect } from 'react';

export default function SellerLayout() {
    const { isSellerMode } = useAppMode();
    const router = useRouter();

    // Protect this route: if not seller mode, kick them back
    useEffect(() => {
        if (!isSellerMode) {
            router.replace('/(tabs)/account');
        }
    }, [isSellerMode]);

    if (!isSellerMode) return null;

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.success, // Use green to differentiate from Buyer side
                tabBarInactiveTintColor: Colors.textSecondary,
                tabBarStyle: {
                    borderTopWidth: 1,
                    borderTopColor: Colors.border,
                    backgroundColor: Colors.surface,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '500',
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Orders',
                    tabBarIcon: ({ color, size }) => <ListOrdered color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="menu"
                options={{
                    title: 'Menu',
                    tabBarIcon: ({ color, size }) => <UtensilsCrossed color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />
            {/* Hidden routes */}
            <Tabs.Screen
                name="order/[id]"
                options={{
                    href: null,
                }}
            />
        </Tabs>
    );
}
