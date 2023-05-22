import { Text } from "@rneui/themed";
import { FlatList, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Width } from "../../constants/dimensions";

export default function Notifications({ navigation }) {
    return(
        <SafeAreaView style={{backgroundColor: '#fff', flex: 1,}}>
            <View style={styles.notificationsHeader}>
                <Text style={styles.notificationsTitle}>Nenhuma notificação ainda</Text>
            </View>


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