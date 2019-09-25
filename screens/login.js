class Login extends React.Component {
	static navigationOptions = {
	title: 'الدخول',
	headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Info"
        color="#fff"
      />
    ),
 };
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<StatusBar
		         barStyle = "light-content"
		         hidden = {false}
		         backgroundColor = "#00BCD4"
		         translucent = {true}
		         networkActivityIndicatorVisible = {true}
		         />
			  <Text>Add a bus</Text>
				<Button
          title="Go to Manage"
          onPress={() => this.props.navigation.navigate('addBus')}
        />
      </View>
    );
  }
}
