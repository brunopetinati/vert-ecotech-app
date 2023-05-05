import { StyleSheet, TouchableOpacity } from "react-native";
import { Height, Width } from "../../constants/dimensions";

export default function ListItem({children}) {
    return(
        <TouchableOpacity style={styles.container}>
            {children}
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  container: {
    height: Height*0.2,
    width: Width*0.9,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 10,
    marginBottom: 10,
  },
})