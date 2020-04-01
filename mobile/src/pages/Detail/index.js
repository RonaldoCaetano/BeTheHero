import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const valueFormated =
        (Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }),
        format(incidentData.value));
    const message = `Olá ${incidentData.name}, estou entrando em contato pois gostaria de ajudar no caso "${incidentData.title}" com o valor de ${valueFormated}`;

    const incidentData = route.params.incident;

    function returnToList() {
        navigation.navigate('Incidents');
    }

    function sendEmail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incidentData.title}`,
            recipients: incidentData.email,
            body: message
        });
    }

    function sendWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=+5511997797698&text=${message}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={returnToList}
                >
                    <Feather name="arrow-left" size={28} color="#e02041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, { marginTop: 0 }]}>
                    ONG:
                </Text>
                <Text style={styles.incidentValue}>
                    {incidentData.name} de {incidentData.city}/{incidentData.uf}
                </Text>

                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incidentData.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{valueFormated}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

                <Text style={styles.heroDescription}>Entre em contato:</Text>

                <View style={styles.actions}>
                    <TouchableOpacity
                        style={styles.action}
                        onPress={sendWhatsapp}
                    >
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.action} onPress={sendEmail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
