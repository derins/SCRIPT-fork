import React, {Component} from 'react';
import Layout from './Components/Layouts/Layout'

class App extends Component {
  render() {
    return (
      <div display='root'min-width="100px">
      <React.Fragment>
        <Layout />
      </React.Fragment>
      </div>
    );
  }
}

export default App;