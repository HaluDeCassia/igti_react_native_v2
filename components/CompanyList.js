import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import CompanyItem from './CompanyItem';

const CompanyList = props => {
	const { companies, onPressItem } = props;
	
	return (
		<FlatList
			style={styles.container}
			data={companies}
			renderItem={({ item }) => (
				<CompanyItem
					company={item}
					navigateToEditPage={onPressItem} 
				/>
			)}
			keyExtractor={item => item.social_name}
		/>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#fff'
	},
})
export default CompanyList;