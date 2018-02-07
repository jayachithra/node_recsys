import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { withStyles } from 'material-ui/styles';
import List, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import IconButton from 'material-ui/IconButton';
import CommentIcon from 'material-ui-icons/Comment';

import Grid from 'material-ui/Grid';
import { FormLabel, FormControlLabel } from 'material-ui/Form';
import Radio, { RadioGroup } from 'material-ui/Radio';
import Paper from 'material-ui/Paper';


const movies = [
  { title: 'The Terminator', tweeters: ['Ishan', 'Jack', 'Xi'] },
  { title: 'Bladerunner', tweeters: ['Jaya', 'John'] },
  { title: 'Serendepity', tweeters: ['Joost'] }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      page: 0,
      checkedMovies: [],
      checkedTweeters: []
    }
  }

  getRecommendations = () => {
    fetch('http://asdkjasd.com/qwe.json', {
      method: 'POST',
      body: {
        movies: [],
        tweeters: []
      }
    }).then(response => response.json()).then(data => {
      this.setState({ data: data });
    });
  }

  handleMovieToggle = movie => () => {
    const { checkedMovies } = this.state;
    const currentIndex = checkedMovies.indexOf(movie.title);
    const newChecked = [...checkedMovies];

    if (currentIndex === -1) {
      newChecked.push(movie.title);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedMovies: newChecked,
    });
  };

  handleTweeterToggle = tweeter => () => {
    const { checkedTweeters } = this.state;
    const currentIndex = checkedTweeters.indexOf(tweeter);
    const newChecked = [...checkedTweeters];

    if (currentIndex === -1) {
      newChecked.push(tweeter);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checkedTweeters: newChecked,
    });
  };

  render() {
    const tweeters = movies.filter(movie => {
      return this.state.checkedMovies.indexOf(movie.title) > -1;
    }).reduce((memo, movie) => {
      return [...memo, ...movie.tweeters]
    }, []);

    console.log(tweeters);

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>


        <Grid container>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={16}>
              <Grid item>
                <Paper style={{ width: 400, height: 800}}>
                  <List>
                    {movies.map(movie => (
                      <ListItem
                        key={movie.title}
                        dense
                        button
                        onClick={this.handleMovieToggle(movie)}
                      >
                        <Checkbox
                          checked={this.state.checkedMovies.indexOf(movie.title) !== -1}
                          tabIndex={-1}
                          handle
                          disableRipple
                        />
                        <ListItemText primary={movie.title} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              <Grid item>
                <Paper style={{ width: 400, height: 800}}>
                <List>
                  {tweeters.map(tweeter => (
                    <ListItem
                      key={tweeter}
                      dense
                      button
                      onClick={this.handleTweeterToggle(tweeter)}
                    >
                      <Checkbox
                        checked={this.state.checkedTweeters.indexOf(tweeter) !== -1}
                        tabIndex={-1}
                        handle
                        disableRipple
                      />
                      <ListItemText primary={tweeter} />
                    </ListItem>
                  ))}
                </List>
                </Paper>
              </Grid>

              <Grid item>
                <Paper style={{ width: 400, height: 800}}>
                  Hello
                </Paper>
              </Grid>

            </Grid>
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default App;
