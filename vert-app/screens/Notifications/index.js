import { Text } from "@rneui/themed";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Width } from "../../constants/dimensions";
import { useState } from "react";
import NotificationCard from "./NotificationCard";

export default function Notifications({ navigation }) {

    const [hasNotifications, setNotificationsState] = useState([""])
    // Devices notifications
    

    // Etapas do projeto
    const [projectState, setProjectState] = useState([
        { 
            icon: 'documents-outline',
            title: 'Análise documental', 
            message: 'Seus documentos se encontram em análise pela engenharia ambiental. Em breve entraremos em contato!', 
        },
        { 
            icon: 'wallet-outline',
            title: 'Viabilidade econômica', 
            message: 'Estamos realizando a análise de viabilidade econômica e retorno financeiro da sua propriedade. Em breve entraremos em contato!' 
        },
        { 
            icon: 'leaf-outline',
            title: 'Projeto de carbono', 
            message: 'Nossa equipe de engenheiros está desenvolvendo seu projeto de gereção de créditos de carbono. Em breve entraremos em contato!' 
        },
        { 
            icon: 'checkmark-circle-outline',
            title: 'Validação e certificação', 
            message: 'Seu projeto de geração de créditos de carbono se encontra em análise pela certificadora e pela validadora. Em breve entraremos em contato!' 
        },
        { 
            icon: 'trending-up-outline',
            title: 'Geração de créditos de carbono', 
            message: 'Seus documentos se encontram em análise pela engenharia ambiental. Em breve entraremos em contato!' 
        },
    ])

    // Listen notifications

    return(
        <SafeAreaView style={{backgroundColor: '#fff', flex: 1,}}>
            {/* NENHUMA NOTIFICAÇÂO */}
            {hasNotifications.length === 0 && 
                <View style={styles.notificationsHeader}>
                    <Text style={styles.notificationsTitle}>Nenhuma notificação ainda</Text>
                </View>
            }

            {/* COM NOTIFICAÇÂO */}
            {hasNotifications.length > 0 && 
                <NotificationCard 
                    title='Análise documental' 
                    description='Seus documentos se encontram em análise pela engenharia ambiental. Em breve entraremos em contato!' 
                />
            }


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