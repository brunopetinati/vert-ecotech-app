import { Text } from "@rneui/themed";
import { FlatList, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Width } from "../../constants/dimensions";
import { useState } from "react";
import NotificationCard from "./NotificationCard";

export default function Notifications({ navigation }) {

    const [hasNotifications, setNotificationsState] = useState([""])

    return(
        <SafeAreaView style={{backgroundColor: '#fff', flex: 1,}}>
            {/* NENHUMA NOTIFICAÇÂO */}
            {hasNotifications.length === 0 && 
                <View style={styles.notificationsHeader}>
                    <Text style={styles.notificationsTitle}>Nenhuma notificação ainda</Text>
                </View>
            }

            {/* COM NOTIFICAÇÂO */}
            {hasNotifications.length > 0 && <NotificationCard title='Notificação' description='Texto da notificação para testarmos se fica bonito ou não.' />}


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    notificationsHeader: {
        width: Width*0.8,
        alignItems: 'center',
        marginHorizontal: Width*0.1,
    },
    notificationsTitle: {
        marginTop: 16,
        fontStyle: 'italic',
        fontSize: 24,
    },
})