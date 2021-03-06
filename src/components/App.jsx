import React, { Fragment } from 'react';
import Navbar from './Navbar';
import SearchBar from './SearchBar';
import youtube from '../apis/youtube';
import VideosList from './VideosList';
import VideoDetail from './VideoDetail';

class App extends React.Component {
  state = { videos : [], selectedVideo: null }

  componentDidMount() {
    this.onTermSubmitted('15 ways to make 1 million dollars')
  }

  onTermSubmitted = async (term) => {
    const response = await youtube.get('/search', {
      params: {
        q: term
      }
    });

    this.setState({ 
      videos: response.data.items,
      selectedVideo: response.data.items[0]
    });
  }

  onVideoSelect = (video) => {
    this.setState({selectedVideo: video});
    document.body.scrollTop= 0;
    document.documentElement.scrollTop = 0;
  }

  render() {
    return(
      <Fragment>
        <Navbar />
        <div className="ui container" >
        <SearchBar onTermSubmitted={this.onTermSubmitted} vidLenght={this.state.videos.length} />
          <div className="ui stackable grid" >
            <div className="ui row" >
              <div className="nine wide column" >
                <VideoDetail 
                  video={this.state.selectedVideo} 
                />
              </div>
              <div className="seven wide column" >
                <VideosList 
                  onVideoSelect={this.onVideoSelect}
                  videos={this.state.videos}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
}

export default App;