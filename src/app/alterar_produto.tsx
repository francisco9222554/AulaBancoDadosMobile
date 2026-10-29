import { useLocalSearchParams, useRouter } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { db } from "../../firebaseConfig";
import { Produto } from "../../types/Produto";

export default function AlterarProduto() {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [unidade, setUnidade] = useState('');
  const [preco, setPreco] = useState('');
  const [carregando, setCarregando] = useState(true);

  const { idParam } = useLocalSearchParams<{ idParam: string }>();

  useEffect(() => {
    consultar()
  }, []);

  async function consultar() {
    setCarregando(true);
    try {
      const querySnapshot = await getDoc(doc(db, 'produtos', idParam))
      const prod = querySnapshot.data() as Produto;
      setId(querySnapshot.id)
      setNome(prod.nome)
      setUnidade(prod.unidade)
      setPreco(prod.preco.toFixed(2))
    } finally {
      setCarregando(false)
    }
  }

  function validarCampos() {
    if (nome.trim() === '') {
      Alert.alert('Campo "Nome" em branco.')
      return false;
    }

    if (unidade.trim() === '') {
      Alert.alert('Campo "Unidade" em branco.')
      return false;
    }

    if (Number.isNaN(Number(preco))) {
      Alert.alert('Campo "Preço" é inválido.')
      return false;
    }

    return true;
  }

  const router = useRouter();

  async function salvar() {
    //Validações
    if (!validarCampos) {
      return
    }

    setCarregando(true);
    try {

      const prod = {
        nome: nome,
        unidade: unidade,
        preco: Number.parseFloat(preco)
      } as Produto;

      try {

        await setDoc(doc(db, 'produtos', id), prod);
        Alert.alert('Alterado com sucesso');
        router.back();

      } catch (erro) {
        Alert.alert('Erro ao alterar', String(erro))
      }
    } finally {
      setCarregando(false)
    }
  }

    return (
      <View style={styles.container}>
        <View style={styles.view_campo}>
          <Text style={styles.titulo_campo}>ID</Text>
          <TextInput
            style={styles.input}
            value={id}
            editable={false}
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

        <Pressable
          onPress={salvar}>
          <View style={{ padding: 5, backgroundColor: 'green' }}>
            <Text style={{ fontSize: 20, color: 'white' }}>Salvar</Text>
          </View>
        </Pressable>

        <ActivityIndicator
          animating={carregando}
          size='large' />
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