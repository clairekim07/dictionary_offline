import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';
import dictionary from '../database'
 class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      displayText:'',
      isSearchPressed:false
    };
  }
  //  https://rupinwhitehatjr.github.io/dictionary/"+searchKeyword+".json" is the link
  getWord=(text)=>{
      var text=text.toLowerCase()
          try{
              var word=dictionary[text]["word"]
              var definition=dictionary[text]["definition"]
              var lexicalCategory=dictionary[text]["lexicalCategory"]
              this.setState({
                  "word":this.state.text,
                  "definition":definition,
                  "lexicalCategory":lexicalCategory
              })
          }
          catch(err){
            alert("Sorry. This wor is not available right now.")
              this.setState({
                  "word":"",
                  'isSearchPressed':false
              })
          }
      }
  texts=()=>{
    this.setState({
      word:this.state.text
    })
  }
  render() {
    return (
      <View style={styles.container}>
       <Header
          backgroundColor="#42A6D8"
          leftComponent={{ icon: 'menu' }}
          centerComponent={{
            text: 'Dictionary App',
            style: { color: 'purple' },
          }}
        />

        <TextInput
        style={{ marginTop: 200, width: '80%', alignSelf: 'center', height: 40, textAlign: 'center', borderWidth: 2, outline: 'none', }}
          onChangeText={(text) => {
            //the right text is different than the state
            this.setState({
                text: text,
                isSearchPressed:false,
                word:"Loading...",
                lexicalCategory:'',
                examples:[],
                definition:"" 
                });
          }}
          value={this.state.text}
        />
        <TouchableOpacity style={styles.search} 
        onPress={()=>{
          this.setState({isSearchPressed:this.state.isSearchPressed});
          this.getWord(this.state.text)
          this.texts();
        }}>
        Search
        </TouchableOpacity>

        <Text style={styles.search}>Word:{" "}</Text>

        <Text style={styles.search}>{this.state.word}</Text>

        <Text>Type:{" "}</Text>

        <Text>{this.state.lexicalCategory}</Text>
        
        <Text style={styles.outcome}>{this.state.displayText}</Text>

        <Text>Definition:{" "}</Text>

        <Text>{this.state.definition}</Text>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  search: {
    alignItems:'center'
  },
  outcome: {
    alignItems:'center'
  },
});
export default HomeScreen;