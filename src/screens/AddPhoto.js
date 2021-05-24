import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addPost } from '../store/actions/posts'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
    Platform,
    ScrollView,
    Alert,
} from 'react-native'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'

const noUser = 'You need to be logged in to add images'

class AddPhoto extends Component {
    state = {
        image: null,
        comment: '',
    }

    componentDidUpdate = prevProps => {
        if (prevProps.loading && !this.props.loading) {
            this.setState({
                image: null,
                comment: ''
            })
            this.props.navigation.navigate('Feed')
        }
    }

    cameraImage = () => {
        if (!this.props.name) {
            Alert.alert('Failure!', noUser)
            return
        }

        launchCamera({
            maxHeight: 600,
            maxWidth: 800,
            mediaType: 'photo',
            cameraType: 'back',
            includeBase64: true
        }, res => {
            if (!res.didCancel) {
                this.setState({ image: { uri: res.uri, base64: res.base64 } })
            }
        })
    }

    pickImage = () => {
        if (!this.props.name) {
            Alert.alert('Failure!', noUser)
            return
        }

        launchImageLibrary({
            maxHeight: 600,
            maxWidth: 800,
            mediaType: 'photo',
            includeBase64: true
        }, res => {
            if (!res.didCancel) {
                this.setState({ image: { uri: res.uri, base64: res.base64 } })
            }
        })
    }

    save = async () => {
        if (!this.props.name) {
            Alert.alert('Failure!', noUser)
            return
        }
        this.props.onAddPost({
            id: Math.random(),
            nickname: this.props.name,
            email: this.props.email,
            image: this.state.image,
            comments: [{
                nickname: this.props.name,
                comment: ` ${this.state.comment}`
            }]
        })

        // this.setState({ image: null, comment: '' })
        // this.props.navigation.navigate('Feed')
    }

    render() {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Share an image</Text>
                    <View style={styles.imageContainer}>
                        <Image source={this.state.image} style={styles.image} />
                    </View>
                    <TouchableOpacity onPress={this.cameraImage} style={styles.button}>
                        <Text style={styles.buttonText}>Take photo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.pickImage} style={styles.button}>
                        <Text style={styles.buttonText}>Choose from libary</Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholder='Any comments for the photo?'
                        style={styles.input}
                        editable={this.props.name != null}
                        value={this.state.comment}
                        onChangeText={comment => this.setState({ comment })} />
                    <TouchableOpacity
                        onPress={this.save}
                        disabled={this.props.loading}
                        style={[styles.button, this.props.loading ? styles.buttonDisabled : null]}
                    >
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginTop: Platform.OS === 'ios' ? 30 : 10,
        fontWeight: 'bold'
    },
    imageContainer: {
        width: '90%',
        height: Dimensions.get('window').width / 2,
        backgroundColor: '#ddd',
        marginTop: 10,
        alignItems: 'center'
    },
    image: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center'
    },

    button: {
        marginTop: 30,
        padding: 10,
        backgroundColor: '#4286f4',
        borderRadius: 5
    },
    buttonText: {
        fontSize: 20,
        color: '#fff'
    },
    input: {
        marginTop: 20,
        width: '90%'
    },
    buttonDisabled: {
        backgroundColor: '#aaa'
    }
})

const mapStateToProps = ({ user, posts }) => {
    return {
        email: user.email,
        name: user.name,
        loading: posts.isUploading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPost: post => dispatch(addPost(post))
    }
}

// export default AddPhoto
export default connect(mapStateToProps, mapDispatchToProps)(AddPhoto)