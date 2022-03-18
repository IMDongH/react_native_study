import React, { Component } from 'react'
import {Text, View, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios';

class App extends Component {
constructor(){
    super();
    this.state = {
  userData: [],
  };
  }

post(){
    var url = 'http://localhost:3000/users';
    axios.post(url, {
      id: this.state.ID,
      pw: this.state.PW
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
    this.state.ID = '';
    this.state.PW = '';
  };
  
  get(){
    
      fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(users => {
          console.warn(users.data);
          this.setstate({
            userData : users.data,
          })
        })
  };

render() {

    const dataMySQL = this.state.userData.map((item, index)=>{
        var arrayuser = ['ID: ',item.Nama,', PW: ', item.Usia].join(' ');
        return <Text style={{fontSize:20,fontWeight:'bold'}} key={index}>{arrayku}</Text>;
      })

    return (
<View>
<View style={{flexDirection:'column', alignItems:'center'}}>


<TextInput
placeholder='TYPE ID.'
style={{height: 55, width: 350, fontSize: 15}}
onChangeText={(ID) => this.setState({ID})}
value={this.state.ID}
/>

<TextInput
placeholder='TYPE PW'
style={{height: 55, width: 350, fontSize: 15}}
onChangeText={(PW) => this.setState({PW})}
value={this.state.PW}
/>
</View>

<View style={{flexDirection:'row', justifyContent:'center'}}>
<TouchableOpacity
style={{
    backgroundColor:'blue', borderRadius:10,
    flex:1, width:100, height:50, margin:20,
    flexDirection:'row', justifyContent:'center',
    alignItems:'center'
    }}
onPress={this.post.bind(this)}
>
<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
POST
</Text>
</TouchableOpacity>

<TouchableOpacity
style={{
    backgroundColor:'green', borderRadius:10,
    flex:1, width:100, height:50, margin:20,
    flexDirection:'row', justifyContent:'center',
    alignItems:'center'
    }}
onPress={this.get.bind(this)}
>
<Text style={{fontSize:20,color:'white',fontWeight:'bold'}}>
GET
</Text>
</TouchableOpacity>
</View>

<View style={{flexDirection:'column',alignItems:'center'}}>
{dataMySQL}
</View>

</View>
);
}
}

export default App;