import { StyleSheet, View } from 'react-native';
import { Text, ListItem, } from '@rneui/themed';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationCard({ title, description }) {

    // Lista de notificações
    
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

    return(
        <ListItem containerStyle={styles.container} bottomDivider>
            <ListItem.Content>
                <View style={styles.header}>
                    <Ionicons style={{marginRight: 8}} name={projectState[3].icon} color="#00AE00" size={24}/>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <Text style={styles.message}>{description}</Text>
            </ListItem.Content>
        </ListItem>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        paddingVertical: 16,
        marginHorizontal: 32,
        borderRadius: 16,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        fontSize: 14,
        color: '#777',
    },
})