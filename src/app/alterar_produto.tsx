import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../firebaseConfig";
import { Produto } from "../../types/Produto";

export default function alterarProduto() {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [unidade, setUnidade] = useState('');
    const [preco, setPreco] = useState('');

    const { idParam } = useLocalSearchParams<{ idParam: string }>()

    useEffect(() => {
        consultar()
    }
        , []);

    async function consultar() {
        const querySnapshot = await getDoc(doc(db, 'produtos', 'idParam'))
        const prod = querySnapshot.data() as Produto;
        setId(prod.id)
        setNome(prod.nome)
        setUnidade(prod.unidade)
        setPreco(prod.preco.toFixed(2))
    }

    return (
        <View style={styles.container}>

            <View style={styles.view_campo}>
                <Text style={styles.titulo_campo}>ID</Text>
                <TextInput
                    style={styles.input}
                    value={id}
                    onChangeText={setId} />
            </View>

            <View style={styles.view_campo}>
                <Text style={styles.titulo_campo}>Nome</Text>
                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome} />

                <View style={styles.view_campo}>
                    <Text style={styles.titulo_campo}>Unidade</Text>
                    <TextInput
                        style={styles.input}
                        value={unidade}
                        onChangeText={setUnidade} />
                </View >

                <View style={styles.view_campo}>
                    <Text style={styles.titulo_campo}>Preço</Text>
                    <TextInput
                        style={styles.input}
                        value={preco}
                        onChangeText={setPreco} />
                </View >

            </View >
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    texto: {
        fontSize: 20
    },

    view_campo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    titulo_campo: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    input: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    }
});