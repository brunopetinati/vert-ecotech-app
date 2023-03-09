import { useEffect } from "react";
import BottomTabs from "../../components/BottomTabs";

export default function Main({ navigation }) {
    useEffect(() =>
        navigation.addListener('beforeRemove', (e) => { e.preventDefault() })
    )

    return <BottomTabs />
}