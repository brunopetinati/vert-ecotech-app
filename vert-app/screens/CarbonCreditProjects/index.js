import { StyleSheet, SafeAreaView, Text, FlatList, View } from "react-native"
import { ListItem } from '@rneui/themed';
import { useState } from "react";
import { Height, Width } from "../../constants/dimensions";

export default function CarbonCreditProjects({ navigation }) {

    const [carbonProjects, setCarbonProjects] = useState([
      {},
      {},
      {},
      {},
      {},
    ])

    return(
      <>
        <SafeAreaView style={{ flex: 1, paddingVertical: Height*0.05, paddingHorizontal: Height*0.02}}>
          <View style={styles.listArea}>
            <FlatList 
              scrollEnabled={true}
              data={carbonProjects}
              renderItem={({item}) => 
                <ListItem style={styles.listItem}>
                  <ListItem.Content>
                    <ListItem.Title>John Doe</ListItem.Title>
                    <ListItem.Subtitle>CEO, Example.com</ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              }
            />
          </View>
        </SafeAreaView>
      </>
    )
}

const styles = StyleSheet.create({
    listArea: {
      height: Height*0.5,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      padding: 8,
    },
    /* List item */
    listItem: {
      width: Width*0.80,
      marginVertical: 16,
    }
})