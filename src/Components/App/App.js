import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import "./App.css";
//import TrackList from "../TrackList/TrackList";
//import Track from "../Track/Track";

class App extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
      		searchResults: [
        		{name: 'name1', artist: 'artist1', album: 'album1', id: 1},
        		{name: 'name2', artist: 'artist2', album: 'album2', id: 2},
        		{name: 'name3', artist: 'artist3', album: 'album3', id: 3},
	  		],
	  		playlistName: "Best Playlist Ever!",
	  		playlistTracks: [
				{name: 'song1', artist: 'singer1', album: 'album1', id: 4},
        		{name: 'song2', artist: 'singer2', album: 'album2', id: 5},
        		{name: 'song3', artist: 'singer3', album: 'album3', id: 6},
			  ]
		}
		this.addTrack = this.addTrack.bind(this);
		this.removeTrack = this.removeTrack.bind(this);
		this.updatePlaylistName = this.updatePlaylistName.bind(this);
		this.savePlaylist = this.savePlaylist.bind(this);
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
	savePlaylist() {
		const TrackURIs = this.state.playlistTracks.map(track => track.uri);
	}
	search(term) {
		console.log(term);
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
