import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Table, Card, Image} from 'semantic-ui-react';
import ReactLoading from 'react-loading';

class RelatedArticlesSingle extends Component {
  constructor(){
    super()

    this.createCards = this.createCards.bind(this);
  }

  createCards(){
    let resultArr = []
    for (let i = 0; i < 3; i++){
      console.log('relatedArticles', this.props.relatedArticles)
      let article = this.props.relatedArticles[i];
      console.log('article', article)
      resultArr.push(
        <Table.Cell id={i}>
          <Card fluid centered color='blue'>
            <Image width={100} height={100} href='/' src={article.info.imageUrl} />
            <Card.Content>
              <Card.Header href={article.info.url}>
                {article.info.headline}
          </Card.Header>
              <Card.Description href='/'>
                {article.info.text.slice(0, 47) + '...'}
          </Card.Description>
            </Card.Content>
          </Card>
        </Table.Cell>
      )
    }
    return resultArr;
  }

  render(){
    if(this.props.relatedArticles.length === 0){
      return (
        <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
      )
    }
    return (
      <div>
        <Table color={'blue'} size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>TRENDING ARTICLES</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              {this.createCards()}
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    )
  }
}

const mapState = ({ relatedArticles }) => ({ relatedArticles })
const mapDispatch = (dispatch) => {
    return {
        loadData(url) {
            dispatch(fetchRelatedArticles(url))
        }
    }
}

export default connect(mapState, mapDispatch)(RelatedArticlesSingle)
