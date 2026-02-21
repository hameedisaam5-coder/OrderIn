import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../src/constants/Colors';
import Layout from '../../src/constants/Layout';
import { useAppMode } from '../../src/context/AppModeContext';
import { LogOut, Store, CreditCard, HelpCircle, FileText, ChevronRight } from 'lucide-react-native';
import { MOCK_KITCHENS } from '../../src/services/mockData';

export default function SellerProfileScreen() {
    const { setIsSellerMode } = useAppMode();
    const kitchen = MOCK_KITCHENS.find(k => k.id === 's1');

    const handleSwitchToBuyer = () => {
        setIsSellerMode(false);
        // The _layout effect will automatically route them back to /(tabs)/account
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Account Settings</Text>
            </View>
            <ScrollView contentContainerStyle={styles.content} bounces={false}>

                <View style={styles.profileCard}>
                    <View style={styles.avatar}>
                        <Store size={32} color={Colors.white} />
                    </View>
                    <View style={styles.profileInfo}>
                        <Text style={styles.userName}>{kitchen?.name || 'Partner Kitchen'}</Text>
                        <Text style={styles.userPhone}>FSSAI: 12345678901234</Text>
                        <Text style={styles.userEmail}>owner@kitchen.com</Text>
                    </View>
                </View>

                <View style={styles.section}>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <CreditCard size={20} color={Colors.textPrimary} />
                        </View>
                        <Text style={styles.menuLabel}>Payouts & Finance</Text>
                        <ChevronRight size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <View style={styles.menuIcon}>
                            <FileText size={20} color={Colors.textPrimary} />
                        </View>
                        <Text style={styles.menuLabel}>Business Reports</Text>
                        <ChevronRight size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]}>
                        <View style={styles.menuIcon}>
                            <HelpCircle size={20} color={Colors.textPrimary} />
                        </View>
                        <Text style={styles.menuLabel}>Partner Support</Text>
                        <ChevronRight size={20} color={Colors.textSecondary} />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={styles.switchButton} onPress={handleSwitchToBuyer}>
                    <LogOut size={20} color={Colors.primary} />
                    <Text style={styles.switchText}>Return to Buyer Mode</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton}>
                    <Text style={styles.logoutText}>Sign Out of Partner App</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        paddingHorizontal: Layout.spacing.lg,
        paddingTop: Layout.spacing.lg,
        paddingBottom: Layout.spacing.md,
        backgroundColor: Colors.surface,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textPrimary,
    },
    content: {
        padding: Layout.spacing.lg,
    },
    profileCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.success,
        padding: Layout.spacing.lg,
        borderRadius: Layout.borderRadius.xl,
        marginBottom: Layout.spacing.xl,
        shadowColor: Colors.success,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: 'rgba(255,255,255,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: Layout.spacing.md,
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.white,
        marginBottom: 4,
    },
    userPhone: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        marginBottom: 2,
    },
    userEmail: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
    },
    section: {
        backgroundColor: Colors.surface,
        borderRadius: Layout.borderRadius.lg,
        padding: Layout.spacing.sm,
        marginBottom: Layout.spacing.xl,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderBottomWidth: 1,
        borderBottomColor: Colors.border,
    },
    menuIcon: {
        width: 32,
        alignItems: 'flex-start',
    },
    menuLabel: {
        flex: 1,
        fontSize: 16,
        color: Colors.textPrimary,
        fontWeight: '500',
    },
    switchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: Layout.spacing.lg,
        borderRadius: Layout.borderRadius.lg,
        backgroundColor: Colors.primaryLight,
        marginBottom: Layout.spacing.md,
    },
    switchText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    logoutButton: {
        padding: Layout.spacing.md,
        alignItems: 'center',
    },
    logoutText: {
        color: Colors.error,
        fontWeight: 'bold',
        fontSize: 16,
    }
});
