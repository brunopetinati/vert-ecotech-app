import { Text, FAB } from "@rneui/themed"
import { useState, useEffect, useContext } from "react"
import { FlatList, StyleSheet, View, TouchableOpacity, Image, ToastAndroid } from "react-native"
import { SafeAreaView } from "react-native"
import ListItem from "../../components/ListItem"
import WelcomeHeader from "../../components/WelcomeHeader"
import { Ionicons } from '@expo/vector-icons'
import { Height, Width } from "../../constants/dimensions"
import api from '../../Api'
import { getData } from "../../Storage"
import { Dialog } from "@rneui/base"
import LoadingAnimation from "../../components/LoadingAnimation"

export default function Home({navigation}) {
    // const [ propertiesList, setPropertiesList ] = useState([
    //     {
    //         id: 0,
    //         title: 'Fazenda de marn',
    //         subtitle: 'R$ 45.000,00'
    //     },
    //     {
    //         id: 1,
    //         title: 'Fazenda de itatiba',
    //         subtitle: 'R$ 25.000,00'
    //     },
    //     {
    //         id: 2,
    //         title: 'Fazenda do pai',
    //         subtitle: 'R$ 245.000,00'
    //     },
    //     {
    //         id: 3,
    //         title: 'Fazenda feliz',
    //         subtitle: 'R$ 2.000.000,00'
    //     },
    //     {
    //         id: 4,
    //         title: 'Fazenda feia',
    //         subtitle: 'R$ 10.000,00'
    //     },
    //     {
    //         id: 5,
    //         title: 'Fazenda de marn',
    //         subtitle: 'R$ 45.000,00'
    //     },
    //     {
    //         id: 6,
    //         title: 'Fazenda de itatiba',
    //         subtitle: 'R$ 25.000,00'
    //     },
    //     {
    //         id: 7,
    //         title: 'Fazenda do pai',
    //         subtitle: 'R$ 245.000,00'
    //     },
    //     {
    //         id: 8,
    //         title: 'Fazenda feliz',
    //         subtitle: 'R$ 2.000.000,00'
    //     },
    //     {
    //         id: 9,
    //         title: 'Fazenda feia',
    //         subtitle: 'R$ 10.000,00'
    //     },
    // ]) TESTE
    const [propertiesList, setPropertieList] = useState(null)
    const [userCredentials, setUserCredentials] = useState(null)
    const [isLoading, setLoading] = useState(true)

    async function getPropertieList(id) {
        await api.get(`/projects/${id}/by_user/`)
        .then(({data}) => {
            if(propertiesList != null) {
                if (data.length > propertiesList.length) {
                    ToastAndroid.showWithGravity('Novos projetos vieram', ToastAndroid.SHORT, ToastAndroid.CENTER,)
                } else {
                    ToastAndroid.showWithGravity('Nenhuma novidade', ToastAndroid.SHORT, ToastAndroid.CENTER,)
                }
            }

            setPropertieList(data)
            setLoading(false)
        }).catch((error) => {
            console.log(error)
        })
    }
    async function getUserInfo() {
        const userData = JSON.parse(await getData('userCredentials'))
        setUserCredentials(userData)
        console.log(userData.id)
        console.log("NA HOME")
        getPropertieList(userData.id)
    }
    useEffect(() => { getUserInfo() }, [])

    function startToAddPropertie() {
        navigation.navigate('AddPropertie')
    }

    function openProject(project) {
        navigation.navigate('AddPropertie', { 
            screen: 'First', 
            params: { project: project } 
        })
    }

    function renderItem(propertie) {
        return(
            <ListItem>
                <TouchableOpacity onPress={() => openProject(propertie)} style={styles.container}>
                    <Text style={styles.title}>{propertie.title}</Text>
                    <Text style={styles.subtitle}>Nº: {propertie.id}</Text>

                    <View style={styles.containerScore}>
                        <Text style={styles.status}>{propertie.status ? propertie.status : 'Incompleto'}</Text>
                        <Text style={styles.score}>score: {propertie.score ? propertie.score : '0'}</Text>
                    </View>
                </TouchableOpacity>
            </ListItem>
        )
    }

    if(userCredentials == null) {
        <Dialog isVisible={true} style={{alignItems: 'center'}}>
            <Dialog.Loading />
            <Dialog.Title>Carregando...</Dialog.Title>
        </Dialog>
    } else {
        return(
            <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
                <WelcomeHeader navigation={navigation} userName={userCredentials.full_name} />
                { propertiesList == null ?
                <LoadingAnimation text={'Carregando seus projetos'}/>
                :
                <View style={styles.middleScreen}>
                    {
                        propertiesList.length == 0 ?
                        <View style={{ alignItems: 'center', paddingTop: 32 }}>
                            <Image style={styles.emptyListResource} source={require('../../assets/empty_list.gif')}/>
                            <Text h1={true} h1Style={{fontSize: 16, fontWeight: 'bold'}}>Nenhum projeto cadastrado ainda</Text>
                        </View>
                        :
                        <>
                            <View style={styles.topArea}>
                                <Text style={styles.title}>Meus projetos</Text>
                            </View>
                            <View style={styles.propertiesList}>
                                <FlatList 
                                    onRefresh={getUserInfo}
                                    refreshing={false}
                                    scrollEnabled={true}
                                    data={propertiesList}
                                    keyExtractor={item => item.id}
                                    renderItem={({item}) => renderItem(item)}
                                />
                            </View>
                        </>
                    }
                </View>
                }
                <FAB 
                    style={{position: 'absolute', bottom: 16, right: 16}} 
                    title="Adicionar projeto" 
                    onPress={startToAddPropertie} 
                    icon={<Ionicons name="add-outline" color="#fff" size={24}/>}
                />
            </SafeAreaView>
        )    
    }
}

const styles = StyleSheet.create({
    emptyListResource: {
        width: '80%',
        height: '80%',
    },
    propertiesList: {
        alignItems: 'center',
        height: Height*0.62,
    },
    topArea: {
        width: Width,
        padding: 24,
    },
    middleScreen: {
        height: 'auto',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    bottomArea: {
        padding: 16,
        alignItems: 'flex-end',
        width: Width,
        justifyContent: 'flex-end',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    containerScore: {
        width: '100%',
        height: '50%',
        flexDirection: 'row',
        alignItems: 'flex-end', 
        justifyContent: 'space-between',
        marginTop: 32,
    },
    score: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'grey',
    },
    status: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'green',
    },
})