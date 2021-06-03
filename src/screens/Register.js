import React, { Component } from 'react'
import {
    View,
    Text, StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { createUser } from '../store/actions/user'

class Register extends Component {
    state = {
        name: '',
        email: '',
        password: ''
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.setState({
                name: '',
                email: '',
                password: ''
            })
            this.props.navigation.navigate('Profile') // trocar por 'Feed'
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput placeholder='Name' style={styles.input}
                    autoFocus={true} value={this.state.name}
                    onChangeText={name => this.setState({ name })} />
                <TextInput placeholder='Email' style={styles.input}
                    keyboardType='email-address' value={this.state.email}
                    onChangeText={email => this.setState({ email })} />
                <TextInput placeholder='Password' style={styles.input}
                    secureTextEntry={true} value={this.state.password}
                    onChangeText={password => this.setState({ password })} />
                <TouchableOpacity
                    onPress={() => { this.props.onCreateUser(this.state) }}
                    style={styles.buttom}>
                    <Text style={styles.buttomText}>Create account</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttom: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
        borderRadius: 5
    },
    buttomText: {
        fontSize: 20,
        color: '#fff'
    },
    input: {
        marginTop: 20,
        width: '90%',
        backgroundColor: '#eee',
        height: 40,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 5,
        paddingLeft: 15
    }
})

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateUser: user => dispatch(createUser(user))
    }
}

// export default Register
export default connect(mapStateToProps, mapDispatchToProps)(Register)