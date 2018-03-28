import React, {Component} from 'react';
import { connect } from 'react-redux';
import {Table, Card, Image} from 'semantic-ui-react';
import ReactLoading from 'react-loading';

class RelatedArticles extends Component {
  constructor(){
    super()

    this.createCards = this.createCards.bind(this);
  }

  createCards(){
    let resultArr = []
    let max = this.props.landingPageArticles.length >= 3 ? 3 : this.props.landingPageArticles.length
    for (let i = 0; i < max; i++){
      let article = this.props.landingPageArticles[i];
      resultArr.push(
        <Table.Row>
          <Table.Cell>
            <Card.Group itemsPerRow={1} stackable={false}>
                            <div className='storyCard'>
          <Card fluid centered color='blue'>
            <Image href={article.info.url} src={article.info.imageUrl} />
            <Card.Content>
              <Card.Header href={article.info.url}>
                {article.info.headline}
          </Card.Header>
              <Card.Description href={article.info.url}>
                {article.info.text.slice(0, 147) + '...'}
          </Card.Description>
            </Card.Content>
          </Card>
        </div>
          </Card.Group>
        </Table.Cell>
      </Table.Row>
      )
    }
    return resultArr;
  }

  render(){
    //console.log('articles', this.props.landingPageArticles)
    if (this.props.landingPageArticles === undefined){
      return (
        <Table color={'blue'} size='small'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>TRENDING ARTICLES</Table.HeaderCell>
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
              <Table.HeaderCell>TRENDING ARTICLES</Table.HeaderCell>
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
