import React, { Component } from 'react';
import Vibrant from 'node-vibrant'
import axios from 'axios';
import Swatches from './components/Swatches';
import './App.scss';

const credentials = {
  id: 'b7ffe8e3efba93372c464cc90497f32a3825d4fe38d4154d53a5000da26a0f5e',
  base_url: 'https://api.unsplash.com/photos/random'
}

export default class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      image: null,
      showSwatch: false,
      swatches: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //Get a new random image
  handleSubmit(event) {
    event.preventDefault();
    this.componentDidMount();
  }

  //Get random image from unsplash
  componentDidMount() {
    this.getRandomImage();
  }

  getRandomImage = () => {
    axios.get(credentials.base_url + '/?client_id=' + credentials.id)
    .then(result => {
      this.setState({
        showSwatch: false,
        image: result.data
      })
      this.findSwatches();
    })
    .catch(error => {
      console.log('Error getting image: ' + error);
    });
  };

  //Use Vibrant to find images colours
  findSwatches = () => {
    Vibrant.from(this.state.image.urls.raw)
    .getSwatches()
    .then(data => {
      let swatchData = [];
      let swatchCount = 0;
      for(let swatch in data){
        swatchData.push({
          'swatch': data[swatch].getHex(),
          'index':swatchCount
        });
        swatchCount++;
      }
      this.setState({
        showSwatch: true,
        swatches: swatchData
      });
    })
    .catch(error => {
      console.log('Error processing image: ' + error);
    });
  }

  //Output
	render() {
		return (
      <div className="palette-generator-app">
        <div className="palette-generator__header">
          <div className="palette-generator__header-content">
            <div className="palette-generator__title">
              <h1>Palette Generator</h1>
              <p>Click a swatch to copy to clipboard.</p>
            </div>
            {this.state.swatches[0] && (
              <button
                style={{backgroundImage: `repeating-linear-gradient(90deg,${this.state.swatches[0].swatch},${this.state.swatches[1].swatch} 20%,${this.state.swatches[2].swatch} 32%,${this.state.swatches[3].swatch} 48%,${this.state.swatches[4].swatch} 68%,${this.state.swatches[5].swatch} 84%,${this.state.swatches[0].swatch} 100%)`}}
                onClick={() => this.getRandomImage()}
              >
                New Palette
              </button>
            )}
          </div>
        </div>

        <div className="palette-generator__content">
          {this.state.image && (
            <div className="palette-generator__image">
              <img src={this.state.image.urls.raw + '&w=960'} srcSet={`${this.state.image.urls.raw + '&w=960'} 1x, ${this.state.image.urls.raw + '&w=1920'} 2x`} alt={this.state.image.alt_description} />
            </div>
          )}

          {this.state.showSwatch &&(
            <Swatches swatches={this.state.swatches}/>
          )}
        </div>
      </div>
		);
	}
};