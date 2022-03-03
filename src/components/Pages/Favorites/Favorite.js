import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Typography, TextField, Snackbar, Alert } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { TopBar, BaseModal } from '../../Elements';
import { getFav, removeFav } from '../../../storage';

const initialSnackBar = {open:false, severity:'success', message: 'All is well'};

export default class Favorite extends Component{

  state={
    books:[],
    filteredBooks:[],
    categories:[],
    serachTerm:'',
    activeTab:1,
    page:0,
    size:12,
    detailData: null,
    snackBar: initialSnackBar,
  }

  componentDidMount(){
    this._handleGetCategories();
    this._handleGetBooks();
  }

  _handleCloseSnackBar = () => {
    this.setState({snackBar: initialSnackBar});
  }

  _handleGetCategories = () => {
    fetch('https://limitless-dawn-41353.herokuapp.com/https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-categories', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
    }).then(response => {
      return response.json();
    }).then(categories => {
      this.setState({categories});
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  _handleGetBooks = async () => {
    const books = await getFav() || [];
    this.setState({books, filteredBooks:books});
  }

  _handleFilterBook = () => {
    const regex = new RegExp( this.state.serachTerm?.toLowerCase(), 'g' );
    const filteredBooks = this.state.books.filter(book=> 
      book.title?.toLowerCase()?.match(regex) || 
      book.authors?.join(' ')?.toLowerCase()?.match(regex) );
    this.setState({filteredBooks});
  }

  _removeFromFav = (id) => async () =>{
    await removeFav(id);
    const books = await getFav() || [];
    this.setState({
      books, 
      filteredBooks:books,
      snackBar: {
        open:true,
        message:'Success remove book from favorite',
        severity:'success'
      }
    });
  }

  _handleSearchBooks = (e) => {
    this.setState({serachTerm: e.target.value}, this._handleFilterBook);
  }

  _handleShowMore = (detailData) => () => {
    this.setState({detailData});
  }

  _handleCloseMore = () => {
    this.setState({detailData:null});
  }

  _renderCategory = (id) => {
    const selectedCat = this.state.categories?.filter(cat=> cat.id === id);
    if (selectedCat)
      return selectedCat[0]?.name;
    return null;
  }

  render(){
    const {filteredBooks, serachTerm, detailData, snackBar} = this.state;
    const {classes} = this.props;

    return(
      <Fragment>
        <TopBar/>
        <div className={classes.root}>
          <Container>
            <Grid container spacing={2} sx={{mt:1}}>

              <Grid item xs={12}>
                <Paper className={classes.paperBar}>
                  <TextField 
                    placeholder="Search for book's title/author" 
                    size="small" 
                    variant="outlined"
                    value={serachTerm}
                    onChange={this._handleSearchBooks}
                    fullWidth
                    sx={{padding:'3px 0'}}
                    InputProps={{
                      startAdornment:(
                        <SearchRounded sx={{marginRight:1}} htmlColor='#1976d2' />
                      ),
                      classes:{notchedOutline:classes.noBorder}
                    }}
                  />
                </Paper>
              </Grid>
              {filteredBooks.length ? filteredBooks.map(book=>(
                <Grid key={book.id} item xs={12} md={4} lg={3}>
                  <Card className="card-item">
                    <CardMedia
                      component="img"
                      alt="green iguana"
                      height="140"
                      image={book.cover_url}
                    />
                    <div className="category" >{this._renderCategory(book.category_id)}</div>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {book.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {book.description}
                      </Typography>
                      <Typography variant="body2" color="text.primary" sx={{mt:1}}>
                          Author: {book.authors.join(', ')}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={this._handleShowMore(book)}>Show More</Button>
                      <Button color='error' size="small" onClick={this._removeFromFav(book.id)}>Remove from Favorite</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )): 
                <Grid item xs={12} >
                  <div className='no-data'>No Data</div>
                </Grid>}
            </Grid>
          </Container>
          <BaseModal open={Boolean(detailData)} title='' noSubmit handleClose={this._handleCloseMore}>
            <Card>
              <CardMedia
                component="img"
                alt="cover"
                height="140"
                image={detailData?.cover_url}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {detailData?.title}
                </Typography>
                <Typography gutterBottom variant="body1" component="text.secondary">
                  Category: {this._renderCategory(detailData?.category_id)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {detailData?.description}
                </Typography>
                <Typography variant="body2" color="text.primary" sx={{mt:1}}>
                    Author: {detailData?.authors?.join(', ')}
                </Typography>
                <div >
                  <h5>Chapters</h5>
                  {detailData?.sections?.map(section=>(
                    <div key={section.title}>
                      <h6>{section.title}</h6>
                      <div>{section.content}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </BaseModal>
        </div>
        <Snackbar 
          open={snackBar.open} 
          autoHideDuration={6000} 
          onClose={this._handleCloseSnackBar} 
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}>
          <Alert onClose={this._handleCloseSnackBar} severity="success" sx={{ width: '100%' }}>
            {snackBar.message}
          </Alert>
        </Snackbar>
      </Fragment>
    );
  }
}

Favorite.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  mediaQuery: PropTypes.bool,
  history:PropTypes.object,
};
  
Favorite.defaultProps = {
  classes: {},
  children: null,
  history:{}
};