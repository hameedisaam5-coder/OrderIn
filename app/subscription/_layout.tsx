import { Stack } from 'expo-router';
import Colors from '../../src/constants/Colors';

export default function SubscriptionLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.background },
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="plans" />
            <Stack.Screen name="meals" />
            <Stack.Screen name="schedule" />
            <Stack.Screen name="preferences" />
            <Stack.Screen name="success" options={{ gestureEnabled: false }} />
        </Stack>
    );
}
