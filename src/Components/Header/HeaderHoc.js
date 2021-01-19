import { withStyles } from '@material-ui/core/styles';
import {compose} from 'redux';

import { useStyles } from './styles';

export default compose(withStyles(useStyles));