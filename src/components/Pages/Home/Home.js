import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Paper, Tab, Tabs, TextField, Typography, Pagination, Snackbar, Alert } from '@mui/material';
import { SearchRounded } from '@mui/icons-material';
import { TopBar, BaseModal } from '../../Elements';
import { addFav } from '../../../storage';

const initialSnackBar = {open:false, severity:'success', message: 'All is well'};

export default class Home extends Component{

  constructor(props){
    super(props);

    this.state={
      books:[],
      filteredBooks:[],
      categories:[],
      serachTerm:'',
      activeTab:1,
      page:0,
      size:12,
      detailData: null,
      snackBar: initialSnackBar,
    };
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

  _handleGetBooks = () => {
    const {activeTab, page, size} = this.state;
    fetch(`https://limitless-dawn-41353.herokuapp.com/https://asia-southeast2-sejutacita-app.cloudfunctions.net/fee-assessment-books?categoryId=${activeTab}&page=${page}&size=${size}`, {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      },
    }).then(response => {
      return response.json();
    }).then(books => {
      this.setState({books, filteredBooks:books});
    }).catch((error) => {
      console.error('Error:', error);
    });
  }

  _handleFilterBook = () => {
    const regex = new RegExp( this.state.serachTerm?.toLowerCase(), 'g' );
    const filteredBooks = this.state.books.filter(book=> 
      book.title?.toLowerCase()?.match(regex) || 
      book.authors?.join(' ')?.toLowerCase()?.match(regex) );
    this.setState({filteredBooks});
  }

  _handleChangeTab = (e, activeTab) => {
    this.setState({activeTab, serachTerm:''}, this._handleGetBooks);
  };

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

  _handleChangePage = (event, value) => {
    this.setState({page:value-1}, this._handleGetBooks);
  };

  _handleAddToFav = (book) => () => {
    addFav(book);
    this.setState({
      snackBar:{
        open:true,
        severity:'success',
        message:'Success add book to favorite'
      }
    });
  }

  render(){
    const {filteredBooks, categories, activeTab, serachTerm, detailData, page, snackBar} = this.state;
    const {classes} = this.props;

    return(
      <Fragment>
        <TopBar/>
        <div className={classes.root}>
          <Container>
            <Grid container spacing={2} sx={{mt:1}}>
              <Grid item md={8} xs={12}>
                <Paper className={classes.paperBar} >
                  <Tabs 
                    value={activeTab} 
                    indicatorColor={null}
                    variant="scrollable"
                    scrollButtons
                    allowScrollButtonsMobile
                    onChange={this._handleChangeTab} 
                    className={classes.tabs}>
                    {categories.map(option=>(
                      <Tab className="tab" label={option.name} key={option.id} value={option.id} />
                    ))}
                  </Tabs>
                </Paper>
              </Grid>
              <Grid item md={4} xs={12}>
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
                      <Button size="small" onClick={this._handleAddToFav(book)}>Add to Favorites</Button>
                    </CardActions>
                  </Card>
                </Grid>
              )): 
                <Grid item xs={12} >
                  <div className='no-data'>No Data</div>
                </Grid>
              }
            </Grid>
            {Boolean(filteredBooks.length) &&
              <Pagination sx={{marginTop:2}} count={4} page={page + 1} onChange={this._handleChangePage} />
            }
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

Home.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node,
  mediaQuery: PropTypes.bool,
  history:PropTypes.object,
};
  
Home.defaultProps = {
  classes: {},
  children: null,
  history:{}
};