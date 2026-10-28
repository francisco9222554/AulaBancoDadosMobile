import { useRouter } from "expo-router";
import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../../firebaseConfig";

type Produto = {
  nome: string,
  preco: number,
  unidade: string
}

export default function Index() {

  function inserir() {
    const prod = {
      nome: 'Bergamota',
      preco: 7.99,
      unidade: 'KG'
    }

    try {
      addDoc(collection(db, 'produtos'), prod);
      Alert.alert('Produto inserido');
    } catch (e) {
      Alert.alert('Erro', String(e));
    }
  }

  async function consultar() {
    const querySnapshot = await getDocs(collection(db, 'produtos'))
    querySnapshot.docs.map((doc) => {
      const prod = doc.data() as Produto;
      console.log(doc.id + ' - ' + prod.nome)
    })
  }

  async function deletar() {
    try {
      await deleteDoc(doc(db, 'produtos', 'gYkwhLMGQaWBAYhQchdC'))
      Alert.alert('Produto removido')
    } catch (e) {
      Alert.alert('Erro', String(e))
    }
  }

  function alterar() {
    try {
      const docRef = doc(db, 'produtos', 'sRBYziYyfNurCKMzsHUF')
      updateDoc(docRef, {
        nome: 'Ruffles Grande',
        codBarras: '7891234567890'
      })
    } catch (e) {
      Alert.alert('Erro', String(e))
    }
  }

  function alterar2() {
    try {
      const docRef = doc(db, 'produtos', 'sRBYziYyfNurCKMzsHUF')
      setDoc(docRef, {
        nome: 'Ruffles Grande',
        codBarras: '7891234567890'
      })
    } catch (e) {
      Alert.alert('Erro', String(e))
    }
  }

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={inserir}>
        <Text style={styles.texto}>Inserir dado no banco</Text>
      </Pressable>

      <Pressable
        onPress={consultar}>
        <Text style={styles.texto}>Consultar Produtos</Text>
      </Pressable>

      <Pressable
        onPress={deletar}>
        <Text style={styles.texto}>Deletar Produto</Text>
      </Pressable>

      <Pressable
        onPress={alterar2}>
        <Text style={styles.texto}>Alterar Produto</Text>
      </Pressable>

      <Pressable
        onPress={()=>{router.navigate('/consultar_produtos')}}>
        <Text style={styles.texto}>Tela de Consulta</Text>
      </Pressable>
    </View>
  );
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
