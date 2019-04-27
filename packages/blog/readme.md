A blog component

Contains:
- Basic flexbox layout with sticky title/meta content
- categories render as links which then filter content
- blogs provided as array of blog objects to the blog.js
  file, which then render in the post.js file individually
- Date object format can be passed in on props.dateFormat or
 can just use the default props 'dddd, MMMM do YYYY'
 - Mobile view
 - example link file for passing in from containing component,
 currently using react router, but can be amended for use case

 Example use with react-router-dom and Sanity block renderer:

```js
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import SanityBlock from './components/SanityBlock';
import Link from './components/link';
const queryString = require('query-string');

class App extends Component {
    render() {
    return (
      <BrowserRouter>
        <div className={body}>
            <Switch>
                <Route
                    exact
                    path={process.env.PUBLIC_URL + '/blog'}
                    render={({location}) => (
                    <Blog
                        category={queryString.parse(location.search).category}
                        posts={this.props.posts}
                        renderContent={body => {
                        return <SanityBlock blocks={body} />;
                        }}
                        linkComponent={Link}
                    />
                    )}
                />
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
```
