import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { Avatar, Button } from '@material-ui/core';
import { CryptoState } from '../../CryptoContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../Firebase';

const useStyles = makeStyles({
  container: {
    width: 350,
    height: "100%",
    display: "flex",
    flexDirection: "column",
    padding: 25,
    fontFamily: "monospace",
  },
  profile: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "92%",
    gap: "20px",
  },
  picture: {
    height: 200,
    width: 200,
    backgroundColor: "#EEBC1D",
    cursor: "pointer",
    objectFit: "contain",
  },
  logout: {
    height: "8%",
    width: "100%",
    backgroundColor: "#EEBC1D",
    marginTop: 20,
  },
  watchlist: {
    width: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 12,
    overflowY: "scroll",
    backgroundColor: "grey",
    borderRadius: 10,
    padding: 15,
    paddingTop: 10,
  },
});


const UserSidebar =() => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    right: false,
  });

  const { user, setAlert } = CryptoState();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const logout = () => {
    signOut(auth);

    setAlert({
      open: true,
      message: "Logout Successful !",
      type: "success",
    })
  };
  toggleDrawer();
  
  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Avatar 
            src={user.photoUrl}
            alt={user.displayName || user.email}
            onClick={toggleDrawer(anchor, true)}
            style={{
              height: 38,
              width: 38,
              backgroundColor: "#EEBC1D",
              cursor: "pointer",
            }}
          />
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            <div className={classes.container}>
              <div className={classes.profile}>
                <Avatar 
                  className={classes.picture}
                  src={user.photoUrl}
                  alt={user.displayName || user.email}
                />
                <span
                  style={{
                    width: "100%",
                    fontSize: 20,
                    textAlign: "center",
                    fontWeight: "bolder",
                    wordWrap: "break-word",
                  }}
                >
                  {user.displayName || user.email}
                </span>
                <div className={classes.watchlist}>
                  <span style={{fontSize: 15, textShadow: "0 0 5px black"}}>
                    Watchlist
                  </span>
                </div>
              </div>
              <Button
                variant="contained"
                className={classes.logout}
                onClick={logout}
              >
                Log Out
              </Button>
            </div>
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}


export default UserSidebar