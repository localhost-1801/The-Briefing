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
    let max = this.props.landingPageArticles.length >= 3 ? 3 : this.props.landingPageArticles.length
    for (let i = 0; i < max; i++){
      console.log('landingPageArticles', this.props.landingPageArticles)
      let article = this.props.landingPageArticles[i];
      console.log('article', article)
      resultArr.push(

          <Card fluid centered color='blue'>
            <Image width={100} height={100} href={article.info.url} src={article.info.imageUrl} />
            <Card.Content>
              <Card.Header href={article.info.url}>
                {article.info.headline}
          </Card.Header>
              <Card.Description href={article.info.url}>
                {article.info.text.slice(0, 47) + '...'}
          </Card.Description>
            </Card.Content>
          </Card>
      )
    }
    return resultArr;
  }

  render(){
    if(this.props.landingPageArticles.length === 0){
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
                <Card.Group itemsPerRow={3} stackable={false}>
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

const mapState = ({ landingPageArticles }) => ({ landingPageArticles })
const mapDispatch = (dispatch) => {
    return {
        loadData(url) {
            dispatch(fetchlandingPageArticles(url))
        }
    }
}

export default connect(mapState, mapDispatch)(RelatedArticles)
