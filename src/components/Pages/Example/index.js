import { withStyles } from '@mui/styles';
import {MediaQueries} from '../../Elements';
import Component from './Component';
import styles from './styles';

const Styled = withStyles(styles)((MediaQueries('(max-width:900px)')(Component)));

export default Styled;
