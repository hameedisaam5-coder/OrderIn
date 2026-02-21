import { Stack } from 'expo-router';
import Colors from '../../src/constants/Colors';

export default function AuthLayout() {
    return (
        <Stack
            screenOptions={{
                headerShown: false,
                contentStyle: { backgroundColor: Colors.background },
                animation: 'slide_from_right',
            }}
        >
            <Stack.Screen name="welcome" />
            <Stack.Screen name="register" />
            <Stack.Screen name="otp" />
        </Stack>
    );
}
