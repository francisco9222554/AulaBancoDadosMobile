import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../../firebaseConfig";

export default function CadastrarUsuario() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');


  const router = useRouter();

  function verificarCampos() {
    if (email.trim() === '') {
      Alert.alert('Campo "E-mail" em branco')
      return false
    }

    if (senha.trim() === '') {
      Alert.alert('Campo "Senha" em branco')
      return false
    }

    if (confirmarSenha.trim() === '') {
      Alert.alert('Campo "Confirmar senha" em branco')
      return false
    }
    if (senha !== confirmarSenha) {
      Alert.alert('Senhas diferentes')
      return false
    }

    return true
  }

  async function cadastrar() {
    if (!verificarCampos) {
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, senha)
      Alert.alert('Cadastrado com sucesso');
      router.back();
    } catch (erro) {
      Alert.alert('Erro ao cadastrar', String(erro))
    }
  }

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <Text>Cadastrar usuário</Text>
      </View>

      <View style={styles.corpo}>
        <Text style={styles.tituloCampo}>E-mail</Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.campo}
          placeholder="ana@gmail.com" />

        <Text style={styles.tituloCampo}>Senha</Text>
        <TextInput
          value={senha}
          onChangeText={setSenha}
          style={styles.campo}
          secureTextEntry={true} />


        <Text style={styles.tituloCampo}>Confirmar senha</Text>
        <TextInput
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          style={styles.campo}
          secureTextEntry={true} />

        <Pressable
          onPress={cadastrar}>
          <View
            style={styles.botaoSalvar}>
            <Text style={styles.salvar}>Salvar</Text>
          </View>
        </Pressable>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },

  texto: {
    fontSize: 20
  },

  cabecalho: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200
  },

  logo: {
    width: 200,
    height: 200
  },

  titulo: {
    fontSize: 30,
    fontWeight: '700',
    marginTop: 15
  },

  corpo: {

  },

  esqueceuSenha: {
    marginTop: 5,
    color: '#00a8ff',
    textDecorationLine: 'underline',
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: 'black',
    textShadowRadius: 1
  },

  rodape: {

  },

  tituloCampo: {
    fontSize: 20,
    marginVertical: 5
  },

  campo: {
    borderWidth: 1,
    borderRadius: 5,
    width: 300
  },

  botaoEntrar: {
    backgroundColor: '#7DC343',
    paddingHorizontal: 15,
    paddingVertical: 5
  },

  entrar: {
    color: 'white',
    fontSize: 25,
    fontStyle: 'italic',
    fontWeight: 'bold'
  },

  botaoCadastrar: {
    backgroundColor: '#3B77BC',
  },

  botaoSalvar: {

  },

  salvar: {

  }

});
