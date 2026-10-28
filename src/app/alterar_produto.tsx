import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../firebaseConfig";
import { Produto } from "../../types/Produto";

export default function AlterarProduto() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [unidade, setUnidade] = useState('');
  const [preco, setPreco] = useState('');
  
  const {idParam} = useLocalSearchParams<{idParam:string}>();

  useEffect(()=>{
    consultar()
  }
  ,[]);

  async function consultar(){
    const querySnapshot = await getDoc(doc(db, 'produtos', idParam))
    const prod = querySnapshot.data() as Produto;
    setId(querySnapshot.id) 
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
      </View>

      <View style={styles.view_campo}>
        <Text style={styles.titulo_campo}>Unidade</Text>
        <TextInput
          style={styles.input}
          value={unidade}
          onChangeText={setUnidade} />
      </View>

      <View style={styles.view_campo}>
        <Text style={styles.titulo_campo}>Preço</Text>
        <TextInput
          style={styles.input}
          value={preco}
          onChangeText={setPreco} />
      </View>

      <Pressable>
        <View style={{ padding: 5, backgroundColor: 'green' }}>
          <Text style={{ fontSize: 20, color: 'white' }}>Salvar</Text>
        </View>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    borderWidth: 1,
  },
  titulo_campo: {
    fontSize: 14
  },
  view_campo: {
    margin: 5
  }
});