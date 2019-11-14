{
this.state.items.map((u, i ) => {
    return (
        <Card containerStyle={styles.cards} title={'رقم الحافلة:'+ u.busNo}>
        <Text style={styles.paragraph} key={u.studentName}>اسم الطالب: {u.studentName}</Text>
            <Text style={styles.paragraph} key={u.neighborhood}>الحي: {u.neighborhood}</Text>
            <Text style={styles.paragraph} key={u.depTime}>وقت المغادرة : {u.depTime}</Text>

            <TouchableHighlight style={[styles.viewStudentsButtonContainer, styles.viewStudentsButton]}
             onPress={null}> //() => this.props.navigation.navigate('studentsList')}>
                <Text style={[styles.fontStyle,styles.registerText]}>محادثة </Text>
            </TouchableHighlight>

        </Card>
    );
})
}
