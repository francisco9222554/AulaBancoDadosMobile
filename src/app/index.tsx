import { useRouter } from "expo-router";
import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Alert, Image, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { auth } from "../../firebaseConfig";

export default function Index() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const router = useRouter();

  function esqueceuSenha() {
    if (email.trim() === '') {
      Alert.alert('Campo "E-mail" em branco')
      return false
    }
    
    try {
      sendPasswordResetEmail(auth, email)
      router.navigate('E-mail de redefinição de senha enviado');
    } catch (erro) {
      Alert.alert('Erro ao redefinir a senha', String(erro))
    }
  }


    async function logar() {
      if (!verificarCampos()) {
        return
      }

      try {
        await signInWithEmailAndPassword(auth, email, senha)
        router.navigate('/consultar_produtos');
      } catch (erro) {
        Alert.alert('Erro ao cadastrar', String(erro))
      }

      function verificarCampos() {
        if (email.trim() === '') {
          Alert.alert('Campo "E-mail" em branco')
          return false
        }

        if (senha.trim() === '') {
          Alert.alert('Campo "Senha" em branco')
          return false
        }

        return true
      }
    }

    function cadastrar() {
      router.navigate('/cadastrar_usuario');
    }

    return (
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <Image
            source={require('@/assets/images/passaro.jpg')}
            style={styles.logo} />
          <Text>LOGIN</Text>
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

          <Pressable
            onPress={esqueceuSenha}>
            <Text style={styles.esqueceuSenha}>Esqueceu a senha?</Text>
          </Pressable>

          <Pressable
            onPress={logar}>
            <View
              style={styles.botaoEntrar}>
              <Text style={styles.entrar}>Entrar</Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.rodape}>
          <Pressable
            onPress={cadastrar}>
            <View
              style={[styles.botaoEntrar, styles.botaoCadastrar]}>
              <Text style={styles.entrar}>Cadastrar-se</Text>
            </View>
          </Pressable>

        </View>

      </View >
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
      justifyContent: 'center'
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
    }
  });
