import { Tabs } from 'expo-router';
import { Home, Store, Repeat, User } from 'lucide-react-native';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textSecondary,
                tabBarStyle: {
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
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size }) => <Home color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="orders"
                options={{
                    title: 'Order In',
                    tabBarIcon: ({ color, size }) => <Store color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="subscription"
                options={{
                    title: 'Subscription',
                    tabBarIcon: ({ color, size }) => <Repeat color={color} size={size} />,
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Account',
                    tabBarIcon: ({ color, size }) => <User color={color} size={size} />,
                }}
            />

        </Tabs>
    );
}
