import { useEffect } from 'react';
import { Stack,useNavigation  } from 'expo-router';

export default function Layout() {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({ headerShown: false });
    }, [navigation]);

    return (
        <Stack />
    );

}