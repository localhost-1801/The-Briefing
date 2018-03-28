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
    let max = this.props.relatedArticles.length >= 5 ? 5 : this.props.relatedArticles.length
    for (let i = 0; i < max; i++){
      //console.log('relatedArticles', this.props.relatedArticles)
      let article = this.props.relatedArticles[i];
      let labelName = article.nlu.sentiment.document.label
      let score = Math.abs(Math.floor(article.nlu.sentiment.document.score * 100))
      score = score === 0 ? 50 : score;
      let color = (labelName === 'neutral' ? 'gray' : labelName === 'positive' ? 'green' : 'red')
      console.log('article', article)
      resultArr.push(

          <Card fluid centered color='blue'>
            <Image width={100} height={100} href={article.info.url} src={article.info.imageUrl} label={
                  {
                    content: `${labelName.toUpperCase()} ${score}%`,
                    as: 'a',
                    href: `/singleArticleData?=${article.info.url}`,
                    color: color,
                    ribbon: 'true',
                    url: article.info.url,
                    // onClick: () => this.handleClick(article.info.url)
                  }
                }/>
            <Card.Content>
              <Card.Header href={article.info.url}>
                {article.info.headline}
          </Card.Header>
              <Card.Description href={article.info.url}>
                {article.info.text.slice(0, 147) + '...'}
          </Card.Description>
            </Card.Content>
          </Card>
      )
    }
    return resultArr;
  }

  render(){
    if(this.props.relatedArticles.length === 0){
      return (
        <Table color={'blue'} size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>RELATED ARTICLES</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <ReactLoading type={'spin'} color={'#708090'} height='100px' width='100px' />
            </Table.Row>
          </Table.Body>
        </Table>
      )
    }
    return (
      <div>
        <Table color={'blue'} size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>RELATED ARTICLES</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <Card.Group itemsPerRow={5} stackable={false}>
                  {this.createCards()}
                </Card.Group>
              </Table.Cell>
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
