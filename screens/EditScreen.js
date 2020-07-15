import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';

export default function EditScreen(props) {
  console.log(props.route.params.company);
  const {id, fantasy_name, social_name, address, city, cnpj} = props.route.params.company;

	const [fantasyName, setFantasyName] = React.useState(fantasy_name);
	const [socialName, setSocialName] = React.useState(social_name);
	const [addressComp, setAddress] = React.useState(address);
	const [cityComp, setCity] = React.useState(city);
	const [cnpjComp, setCnpj] = React.useState(cnpj);

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (password == "") {
      return false
    } else {
      return regex.test(password);
    }
  }

  function formSubmit() {
    console.log("cllicou");

    if (fantasyName === "") {
      alert('Adicione o Nome Fantasia!')
    } else if (socialName === "") {
      alert('Adicione o Nome Social!')
    } else if (cnpjComp === "") {
      alert('Adicione o CNPJ!')
    } else if (cityComp === "") {
      alert('Adicione a Cidade!')
    } else if (addressComp === "") {
      alert('Adicione o Endereço!')
    } else {
      const url = 'http://localhost:4000/companies';

      console.log("VM: ");
      // axios.put(url, vm.state)
      //   .then(res =>  res.data)
      //   .catch(err => alert(err))
    }
  }

  function formSubmitDelete() {
    const url = 'http://localhost:4000/companies/' + id;
    console.log(url)
    axios.delete(url)
      .then(response => response.data)
      .catch(function (err) {
        alert(err)
      })
  }

	return (
		<ScrollView style={styles.container}>
			<Content>
				<Form style={styles.formOuter}>
					<Item floatingLabel style={styles.formInput}>
						<Label>Name Edit</Label>
						<Input
							onChangeText={value => setFantasyName(value)}
							value={fantasyName}
						/>
					</Item>

					<Button block primary iconLeft style={styles.submitBtn} onPress={() => formSubmit()}>
						<Text>Editar</Text>
					</Button>
					<Button block primary iconLeft style={styles.submitBtn} onPress={() => formSubmitDelete()}>
						<Text>Excluir</Text>
					</Button>
				</Form>
			</Content>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
	formOuter: {
		flex: 1,
		padding: 8
	},
	formInput: {
		marginLeft: 0
	},
	submitBtn: {
		marginTop: 20
	}
});
