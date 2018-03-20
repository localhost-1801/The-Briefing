import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Icon, Label, Menu, Table } from 'semantic-ui-react'


class KeywordBox extends Component {
  constructor(){
    super()
    this.state ={
      emotionKeyWords: [],
    }
  }

  componentWillMount(){
    console.log('single',this.props.singleArticle)
    this.setState({
      emotionKeyWords: this.parseData(this.props.singleArticle.nlu)
    })
  }

  parseData(data){
    console.log('data', data)
    let resultArr = []
    for(var i =0; i < 5; i++){
      // console.log(data.keywords[i].emotion);
      let greatestEmotionScore = 0;
      let greatestEmotionTitle = '';
        Object.keys(data.keywords[i].emotion).forEach(emotionKey => {
          if(data.keywords[i].emotion[emotionKey] > greatestEmotionScore){
            greatestEmotionScore = data.keywords[i].emotion[emotionKey];
            greatestEmotionTitle = emotionKey;
          }
        })
        resultArr.push({
          word: data.keywords[i].text,
          emotion: greatestEmotionTitle
        })
    }
    // console.log(resultArr)
    return resultArr;
  }

  render(){
    return(
      <div id='keywordTable'>
       <Table basic='very' celled unstackable>
         <Table.Header>
           <Table.Row>
             <Table.HeaderCell>Keyword</Table.HeaderCell>
             <Table.HeaderCell>Dominant Emotion</Table.HeaderCell>
           </Table.Row>
         </Table.Header>
       <Table.Body>
         {this.state.emotionKeyWords.map(emotionAndWord => {
           return(
           <Table.Row>
             <Table.Cell unstackable>
               {emotionAndWord.word}
             </Table.Cell>
             <Table.Cell>
               {emotionAndWord.emotion}
             </Table.Cell>
           </Table.Row>
           )
         })}
       </Table.Body>
     </Table>
   </div>
    )
  }
}

const mapState = ({singleArticle}) => ({singleArticle})
const mapDispatch = null;

export default connect(mapState, mapDispatch)(KeywordBox)

