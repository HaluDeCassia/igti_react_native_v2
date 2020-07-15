import React from 'react';

import axios from 'axios';
import {
	ActivityIndicator,
	StyleSheet,
	View
} from 'react-native';
import CompanyList from './CompanyList'

export default function HomeListComponent (props) {
	const [companies, setCompanies] = React.useState([]);
	const [loading, setLoading] = React.useState(false);

	function httpRequestGetAllCompanies() {
		setLoading(true);

		const url = 'http://localhost:4000/companies';

		setTimeout(() => {
			axios({
				method: 'GET',
				url: url
			}).then((res) => {
				console.log(res.data);
				setCompanies(res.data);
				setLoading(false);
			}).catch((err) => {
				setLoading(false);
				
				console.error("Error: ", err);
			})
		}, 4000);
	}

	React.useEffect(() => httpRequestGetAllCompanies(), []);

	if (loading) {
		return (
			<View style={[styles.container, styles.horizontal]}>
				<ActivityIndicator size="large" color="#0000ff" />
			</View>
		);
	} else {
		return (
			<View>
				<CompanyList
					companies={companies}
					onPressItem={pageParams => {											
						props.navigation.navigate('Edit', pageParams);
					}} 
				/>
			</View>
		);
	}
}

HomeListComponent.navigationOptions = {
	title: 'Empresas'
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	},
	horizontal: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		padding: 10
	}
})
