import React, { Component } from 'react'
import { connect } from 'react-redux'
import { login } from '../store/actions/user'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput
} from 'react-native'

class Login extends Component {
    state = {
        name: 'Temporário',
        email: '',
        password: ''
    }

    componentDidUpdate = prevProps => {
        if (prevProps.isLoading && !this.props.isLoading) {
            this.props.navigation.navigate('Profile')
        }
    }

    login = () => {
        this.props.onLogin({ ...this.state })
        // this.props.navigation.navigate('Profile')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text
                    style={{ fontSize: 20, fontWeight: 'bold' }}
                >
                    Sign in
                </Text>
                <TextInput
                    placeholder='Email'
                    style={styles.input}
                    autoFocus={true} keyboardType='email-address'
                    value={this.state.email}
                    onChangeText={email => this.setState({ email })} />
                <TextInput
                    placeholder='Password'
                    style={styles.input}
                    secureTextEntry={true}
                    value={this.state.password}
                    onChangeText={password => this.setState({ password })} />
                <TouchableOpacity
                    onPress={this.login}
                    style={styles.buttom}
                >
                    <Text style={styles.buttomText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.navigate('Sign up')
                    }}
                    style={styles.buttom}>
                    <Text style={styles.buttomText}>
                        Create your account...
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const mapStateToProps = ({ user }) => {
    return {
        isLoading: user.isLoading
    }
}

const mapDispatchToProps = dispatchEvent => {
    return {
        onLogin: user => dispatchEvent(login(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)

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