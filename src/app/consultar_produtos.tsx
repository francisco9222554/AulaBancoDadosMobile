import { useRouter } from "expo-router";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebaseConfig";
import { Produto } from "../../types/Produto";

export default function ConsultaProdutos() {
    const [lista, setLista] = useState<Produto[]>([]);

    async function consultar() {
        setLista([]);
        const querySnapshot = await getDocs(collection(db, 'produtos'))
        querySnapshot.docs.map((doc) => {
            const produto = {
                id: doc.id,
                ...doc.data()
            } as Produto;

            setLista((listaAnterior) => [...listaAnterior, produto]);
        })
    }

    async function deletar(identificador: string) {
        try {
            await deleteDoc(doc(db, 'produtos', identificador))
            Alert.alert('Produto removido')
            const novaLista = lista.filter((value, id) => value.id !== identificador)
            setLista(novaLista);
        } catch (e) {
            Alert.alert('Erro', String(e))
        }
    }

    const router = useRouter();

    function alterar(id: string){
        router.push({
            pathname: '/alterar_produto',
            params: {
                idParam: id
            }
        })
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={consultar}>
                <Text style={styles.texto}>Consultar</Text>
            </Pressable>

            <FlatList
                data={lista}
                renderItem={(item) => {
                    return (
                        <View>
                            <Text>ID: {item.item.id}</Text>
                            <Text>NOME: {item.item.nome}</Text>
                            <Text>UNIDADE: {item.item.unidade}</Text>
                            <Text>PREÇO: {item.item.preco}</Text>

                            <Pressable
                                onPress={() => { deletar(item.item.id) }}>
                                <Text style={styles.texto}>Del</Text>
                            </Pressable>

                            <Pressable
                                onPress={() => { alterar(item.item.id) }}>
                                <Text style={styles.texto}>Alt</Text>
                            </Pressable>
                        </View>
                    )
                }} />
        </View>
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
    }
});
