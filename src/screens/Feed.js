import React, { Component } from 'react'
import { StyleSheet, FlatList, View } from 'react-native'

import Header from '../components/Header'
import Post from '../components/Post'

class Feed extends Component {
    state = {
        posts: [
            {
                id: Math.random(),
                nickname: 'Rafael Pereira Filho',
                email: 'rafaelprrfh@gmail.com',
                image: require('../../assets/imgs/fence.jpg'),
                comments: [
                    {
                        nickname: 'Jonh Ray Sheldon',
                        comment: ' Stunnimg!'
                    },
                    {
                        nickname: 'Ana Julia Arruda',
                        comment: ' Foto linda! Onde foi tirada?'
                    }
                ]
            },
            {
                id: Math.random(),
                nickname: 'Francisco Leandro Lima',
                email: 'fllima@gmail.com',
                image: require('../../assets/imgs/bw.jpg'),
            },
            {
                id: Math.random(),
                nickname: 'Leandro Lima',
                email: 'fllima@gmail.com',
                image: require('../../assets/imgs/boat.jpg'),
                comments: [
                    {
                        nickname: 'Bia Silva',
                        comment: ' Linda!'
                    }
                ]
            },
            {
                id: Math.random(),
                nickname: 'Patricia Praxedes',
                email: 'ppraxedes95@gmail.com',
                image: require('../../assets/imgs/gate.jpg'),
                comments: [
                    {
                        nickname: 'Luiz Miguel',
                        comment: ' Boinha!'
                    },
                    {
                        nickname: 'Luiz Miguel',
                        comment: ' Suco!'
                    },
                    {
                        nickname: 'Luiz Miguel',
                        comment: ' Mamãe cheguei!'
                    }
                ]
            }
        ]
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <FlatList 
                    data={this.state.posts}
                    keyExtractor={item => `${item.id}`}
                    renderItem={({ item }) => 
                        <Post key={item.id} {...item} />} />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    }
})

export default Feed