import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	TouchableOpacity
} from 'react-native';

const CompanyItem = props => {
	const { company, navigateToEditPage } = props;
	const name = company.fantasy_name;
	const cnpj = company.cnpj;
  const address = company.address + " - " + company.city;
  
	return (
		<View style={styles.item}>
			<TouchableOpacity onPress={() => {
				navigateToEditPage({ company });
			}}>
				<View style={styles.container}>
					<Text style={styles.txtTitulo}>{name}</Text>
					<Text style={styles.txtValor}><small>CNPJ</small>  {cnpj}</Text>
					<Text style={styles.txtValor}><small>Endereço</small>  {address}</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
  },
	item: {
		backgroundColor: '#FFF',
		borderWidth: 0.5,
		borderColor: '#999',
		margin: 10,
		padding: 10,
		flexDirection: 'column'
	},
	txtTitulo: {
		fontSize: 13,
		color: 'black',
		marginBottom: 5,
		fontWeight: 'bold'
	},
	txtValor: {
		fontSize: 16,
	},
});

export default CompanyItem;