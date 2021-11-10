import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import PersonAddOutlinedIcon from '@material-ui/icons/PersonAddOutlined';
import AccountTreeOutlinedIcon from '@material-ui/icons/AccountTreeOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  }
}))

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

export default function CustomizedMenus() {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleClick}
      >
        Opciones
      </Button>
      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <StyledMenuItem>
          <ListItemIcon>
            <PersonAddOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Crear Usuario" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <AccountTreeOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Crear Cuentas Sociales" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <ChatOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Menciones" />
        </StyledMenuItem>
      </StyledMenu>
    </div>
  );
}
