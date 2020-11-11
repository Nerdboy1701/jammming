import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";
import Spotify from '../../util/Spotify';

class App extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		searchResults: [],
	  		playlistName: "Best Playlist Ever!",
	  		playlistTracks: []
		}
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlayList = this.savePlayList.bind(this);
		this.search = this.search.bind(this);
	}
	addTrack(track) {
		let newTrack = this.state.playlistTracks;
		if (newTrack.find(savedTrack => savedTrack.id === track.id)){
			return;
		} else {
			newTrack.push(track);
			this.setState({playlistTracks: newTrack})
		}
	}
	removeTrack(track) {
		let oldTrack = this.state.playlistTracks;
		oldTrack = oldTrack.filter(currentTrack => currentTrack.id !== track.id);
		this.setState({playlistTracks: oldTrack})
	}
	updatePlaylistName(name) {
		this.setState({playlistName: name});
	}
	savePlayList() {
		const trackUris = this.state.playlistTracks.map(track => track.uri);
		Spotify.savePlayList(this.state.playlistName, trackUris)
		.then(() => {
			this.setState({
				playlistName: 'New Playlist', 
				playlistTracks: []})
		})	
	}
	search(term) {
		Spotify.search(term).then(searchResults => {
			this.setState({searchResults: searchResults});
		});
	}
	render() {
		return (
			<div>
				<h1>
					Ja<span className="highlight">mmm</span>ing
				</h1>
				<div className="App">
					<SearchBar onSearch={this.search}></SearchBar>
					<div className="App-playlist">
						<SearchResults searchResults={this.state.searchResults}  onAdd={this.addTrack}></SearchResults>
						<Playlist 
							playlistName={this.state.playlistName} 
							playlistTracks={this.state.playlistTracks}
							onRemove={this.removeTrack}
							onNameChange={this.updatePlaylistName}
							onSave={this.savePlaylist}
						></Playlist>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
