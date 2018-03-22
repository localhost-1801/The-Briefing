import React from 'react'
import { Table, Card, Icon, Image } from 'semantic-ui-react'


const relatedArticles = () => (
  <div>
    <Card fluid centered color='blue'>
      <Image size='small' href='/' src='/img/logo.png' />
      <Card.Content>
        <Card.Header href='/'>
          Related Article Title
    </Card.Header>
        <Card.Description href='/'>
          Article Description
    </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='time' />
          Time/Date Stamp when posted
    </a>
      </Card.Content>
    </Card>

    <Card fluid centered color='blue'>
      <Image size='small' href='/' src='/img/logo.png' />
      <Card.Content>
        <Card.Header href='/'>
          Related Article Title
    </Card.Header>
        <Card.Description href='/'>
          Article Description
    </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='time' />
          Time/Date Stamp when posted
    </a>
      </Card.Content>
    </Card>

    <Card fluid centered color='blue'>
      <Image size='small' href='/' src='/img/logo.png' />
      <Card.Content>
        <Card.Header href='/'>
          Related Article Title
  </Card.Header>
        <Card.Description href='/'>
          Article Description
  </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='time' />
          Time/Date Stamp when posted
  </a>
      </Card.Content>
    </Card>
  </div>
)
export default relatedArticles;
