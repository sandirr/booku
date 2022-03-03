import { withStyles } from '@mui/styles';
import {MediaQueries} from '../../Elements';
import Favorite from './Favorite';
import styles from './styles';

const Styled = withStyles(styles)((MediaQueries('(max-width:900px)')(Favorite)));

export default Styled;
