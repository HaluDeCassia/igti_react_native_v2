import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Content, Form, Item, Input, Label, Button, Icon, Text } from 'native-base';
import axios from 'axios';

export default function FormScreen(props) {
  const {id, fantasy_name, social_name, address, city, cnpj} = props.route.params ? props.route.params.company : "";
  const add = props.route.params ? false : true;

	const [fantasyName, setFantasyName] = React.useState(fantasy_name || "");
	const [socialName, setSocialName] = React.useState(social_name || "");
	const [addressComp, setAddress] = React.useState(address || "");
	const [cityComp, setCity] = React.useState(city || "");
  const [cnpjComp, setCnpj] = React.useState(cnpj || "");
  
  const [error, setError] = React.useState("");
  const [info, setInfo] = React.useState("");

  function validateCnpj(cnpj) {
    const regex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;

    if (cnpj === "") {
      return false
    } else {
      return regex.test(cnpj);
    }
  }

  function validate() {
    setInfo("");
    setError("");

    let err = "";

    if (fantasyName === "")  err += 'Adicione o Nome Fantasia! \n';
    if (socialName === "")  err += 'Adicione o Nome Social! \n';
    if (addressComp === "")  err += 'Adicione o Endereço! \n';
    if (cityComp === "")  err += 'Adicione a Cidade! \n';
    if (!validateCnpj(cnpjComp))  err += 'Adicione o CNPJ de forma correta! \n';

    setError(err);

    return !err;
  }

  function formSubmitEdit() {
    const url = 'http://localhost:4000/companies/' + id;

    if(validate()) {
      axios['put'](url, {
        fantasy_name: fantasyName,
        social_name: socialName,
        address: addressComp,
        city: cityComp,
        cnpj: cnpjComp
      })
      .then(res =>  {
        setInfo(`${res.data.fantasy_name} editada com sucesso`)
        res.data
      })
      .catch(err => alert(err))
    }
  }

  function formSubmitAdd() {
    const url = 'http://localhost:4000/companies';

    if(validate()) {
      axios.post(url, {
        fantasy_name: fantasyName,
        social_name: socialName,
        address: addressComp,
        city: cityComp,
        cnpj: cnpjComp
      })
      .then(res =>  {
        setInfo(`${res.data.fantasy_name} adicionado com sucesso`)
        res.data
      })
      .catch(err => alert(err))
    }
  }

  function formSubmitDelete() {
    const url = 'http://localhost:4000/companies/' + id;
    
    axios.delete(url)
      .then(() => {
        console.log("empresa deletada com sucesso");
        window.location.href = "/";
      })
      .catch(function (err) {
        alert(err)
      })
  }

	return (
		<ScrollView style={styles.container}>
			<Content>
				<Form style={styles.formOuter}>
          <Item floatingLabel style={styles.formInput}>
            <Label>Nome Fantasia</Label>
            <Input
              onChangeText={value => setFantasyName(value)}
              value={fantasyName}
            />
          </Item>
          <Item floatingLabel style={styles.formInput}>
            <Label>Nome Social</Label>
            <Input
              onChangeText={value => setSocialName(value)}
              value={socialName}
            />
          </Item>
          <Item floatingLabel style={styles.formInput}>
            <Label>Endereço</Label>
            <Input
              onChangeText={value => setAddress(value)}
              value={addressComp}
            />
          </Item>
          <Item floatingLabel style={styles.formInput}>
            <Label>Cidade</Label>
            <Input
              onChangeText={value => setCity(value)}
              value={cityComp}
            />
          </Item>
          <Item floatingLabel style={styles.formInput}>
            <Label>CNPJ</Label>
            <Input
              onChangeText={value => setCnpj(value)}
              value={cnpjComp}
            />
          </Item>
          {add ? (
            <Button block primary iconLeft style={styles.submitBtn} onPress={() => formSubmitAdd() }>
              <Text>Salvar</Text>
            </Button>
          ) : (
            <React.Fragment>
              <Button block primary iconLeft style={styles.submitBtn} onPress={() => formSubmitEdit()}>
                <Text>Editar</Text>
              </Button>
              <Button block primary iconLeft style={styles.submitBtn} onPress={() => formSubmitDelete()}>
                <Text>Excluir</Text>
              </Button>
            </React.Fragment>
          )}
          <Text>
            {error && <p>{error}</p>}
            {info && <p>{info}</p>}
          </Text>
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
