import React, {Component} from 'react';
import { connect } from 'react-redux';

class RelatedArticlesSingle extends Component {
  constructor(){
    super()

    this.createCards = this.createCards.bind(this);
  }

  createCards(){
    let resultArr = []
    for(var i=0; i < 3; i++){
      let article = this.props.relatedArticles[i];
      resultArr.push(
        <Card fluid centered color='blue'>
          <Image size='small' href='/' src={article.info.imageUrl} />
          <Card.Content>
            <Card.Header href={article.info.url}>
              {article.info.headline}
        </Card.Header>
            <Card.Description href='/'>
              {article.info.text.slice(0, 47) + '...'}
        </Card.Description>
          </Card.Content>
        </Card>
      )
    }
    return resultArr;
  }

  render(){
    return(
      <div>
        {this.createCards()}
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
