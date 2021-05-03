/* eslint-disable  */
// i have used all data from the local state since we are not storing it on db

import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import one from '../songs/1.mp3'
import two from '../songs/2.mp3'
import three from '../songs/3.mp3'
import four from '../songs/4.mp3'
import five from '../songs/5.mp3'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import "react-multi-carousel/lib/styles.css";
import clsx from "clsx";
import Logo from "../images/musiclogo.jpg";
import ArtistLogo from "../images/artist.jpg";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Avatar from '@material-ui/core/Avatar';
import {
  Box,
  Container,
  Card,
  Typography,
  Tooltip,
  makeStyles,
} from "@material-ui/core";
import "react-multi-carousel/lib/styles.css";
import Page from "./page";

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: "100%"
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  exporesultroot: {},
  avatar: {
    marginRight: theme.spacing(2),
    borderRadius: "10px"
  },
  pagination: {
    flexShrink: 0
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  active: {
    color: "#00ca73 !important"
  },
  inactive: {
    color: "#dc3545 !important"
  },
  table: {
    minWidth: 300
  }
}));


const MainPanel = ({ className, sideOptionSelected, ...rest }) => {

  const [songs, setSongs] = useState([{
    id: 1,
    name: '1',
    duration: '04:40',
    song_url: one,
    artist_id: 1,
  }, {
    id: 2,
    name: '2',
    duration: '04:44',
    song_url: two,
    artist_id: 1,
  }, {
    id: 3,
    name: '3',
    duration: '03:14',
    song_url: three,
    artist_id: 1,
  }, {
    id: 4,
    name: '4',
    duration: '04:34',
    song_url: four,
    artist_id: 1,
  }, {
    id: 5,
    name: '5',
    duration: '04:23',
    song_url: five,
    artist_id: 1,
  }])



  const [music, setCurrMusic] = useState('')
  const [artist, setCurrArtist] = useState('')

  const setMusic = (index) => {
    setCurrMusic(songs[index].song_url)
  }

  const setArtist = (index) => {
    setCurrArtist(artists[index])
  }

  const [artists, setArtists] = useState([{
    id: 1,
    name: 'Arjit Singh',
    date_of_birth: '12-12-1987',
  }])

  useEffect(() => {

  }, []);

  const classes = useStyles();

  return (
    <Page className={classes.root} title="Music Hub">
      <Container maxWidth={false}>

        {
          artist ?

            <Box mt={3} mb={3}>
              <Box display="flex">
                <Box flexGrow={1}>
                  <ArrowBackIcon onClick={() => {
                    setCurrArtist('')
                  }} />
                </Box>

              </Box>
              <Card className={classes.exporesultroot} style={{ padding: '20px' }}>
                <Box md={12}>
                  <Avatar alt="artist" src={ArtistLogo} className={classes.large} />
                  <Typography variant="h4" gutterBottom>
                    {artist.name}
                  </Typography>
                  <Typography variant="h4" gutterBottom>
                    {artist.date_of_birth}
                  </Typography>


                </Box>
              </Card>
            </Box>
            :
            <>
              <div className={clsx(classes.root, className)} {...rest}>
                <Box display="flex">
                  <Box flexGrow={1}>
                    <Typography variant="h4">Music Panel</Typography>
                  </Box>

                </Box>

              </div>
              <hr />
              <Box mt={3} mb={3}>
                <Tooltip title="Click On Currently Viewable Artist to Know More">
                  <Card className={classes.exporesultroot}>
                    <Box md={12}>
                      <Carousel showIndicators={false} renderIndicator={false} onClickItem={setArtist} showStatus={false}>

                        {
                          artists.map(artist => {
                            return (
                              <div>
                                <img src={ArtistLogo} style={{ width: '70px' }} />
                              </div>
                            )
                          })
                        }

                      </Carousel>
                    </Box>
                  </Card>
                </Tooltip>
              </Box>
              <Box mt={3} mb={3}>
                <Tooltip title="Click On Currently Viewable Song or thumb to Play">
                  <Card className={classes.exporesultroot}>
                    <Box md={12} >
                      <Carousel showIndicators={false} renderIndicator={false} onClickItem={setMusic} onClickThumb={setMusic} showStatus={false}>

                        {
                          songs.map(song => {
                            return (
                              <div>
                                <img src={Logo} style={{ width: '70px' }} />
                              </div>
                            )
                          })
                        }

                      </Carousel>
                    </Box>
                  </Card>
                </Tooltip>
              </Box>

            </>
        }
        <Box mt={3} mb={3}>
          <Card className={classes.exporesultroot}>
            <Box md={12}>
              <AudioPlayer
                autoPlay
                src={music}
                onPlay={e => console.log("onPlay")}
              // other props here
              />

            </Box>
          </Card>
        </Box>
      </Container>



    </Page>
  );
};

MainPanel.propTypes = {
  className: PropTypes.string
};

export default MainPanel;
