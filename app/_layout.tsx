import React from "react";
import { Slot } from "expo-router";
import { SafeAreaView, StyleSheet } from "react-native";
import '@formatjs/intl-pluralrules'
import '@/i18n';

export default function Layout() {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Slot />
        </SafeAreaView>
    );
}