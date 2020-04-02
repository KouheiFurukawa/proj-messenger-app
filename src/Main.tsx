import * as React from 'react';
import Search from '@material-ui/icons/Search';
import Chat from '@material-ui/icons/Chat';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import Settings from '@material-ui/icons/Settings';
import { Button, ButtonBase, Grid, Paper, Tabs, Tab, Typography, makeStyles, colors } from '@material-ui/core';
import { State } from '../redux/reducer';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../redux/actions';
import { User } from './User';
import { AppState } from '../redux/store';
import ApiClient from './ApiClient';
import * as H from 'history';

interface OwnProps {
    handleOnChangeTab(value: number): void;
    handleOnClickLogoutButton(props: MainProps): void;
    handleOnClickFriend(name: string, props: MainProps): void;
    history: H.History;
}

const mapStateToProps = (appState: AppState) => {
    return {
        tabValue: appState.state.tabValue,
        textInput: appState.state.textInput,
        userSearchInput: appState.state.userSearchInput,
        friends: appState.state.friends,
        messages: appState.state.messages,
        loginInfo: appState.state.loginInfo,
        chatFriend: appState.state.chatFriend,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnChangeTab(value: number): void {
            dispatch(actions.changeTab(value));
        },
        handleOnClickLogoutButton(props: MainProps): void {
            ApiClient.logout()
                .then((data) => props.history.push('/login'))
                .catch((err) => console.error(err));
        },
        handleOnClickFriend(name: string, props: MainProps): void {
            if (name !== props.chatFriend.displayName) {
                dispatch(actions.requestGetMessages({ user1: props.loginInfo.id, user2: name }));
            }
            dispatch(actions.changeChatFriend({ id: name, displayName: name }));
            props.history.push('/talk');
        },
    };
};

type MainProps = OwnProps & State;

const useStyles = makeStyles({
    main: {
        height: '85vh',
    },
    header: {
        height: '7vh',
        backgroundColor: colors.indigo[500],
        color: 'white',
        fontSize: '30px',
        paddingLeft: '30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: '0',
    },
    bottomTabs: {
        height: '8vh',
        position: 'fixed',
        bottom: '3px',
        width: '100%',
    },
    tab: {
        height: '8vh',
        fontSize: 15,
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        width: '250px',
    },
    buttonBase: {
        width: '100%',
    },
});

const Main: React.FC<MainProps> = (props: MainProps) => {
    const classes = useStyles();

    React.useEffect(() => {
        if (!props.loginInfo.id) {
            dispatch(actions.requestGetLoginInfo({}));
        }
    }, []);

    const dispatch = useDispatch();

    return (
        <div>
            <Paper className={classes.header} elevation={3}>
                <span>
                    {props.tabValue === 0 && 'Search'}
                    {props.tabValue === 1 && 'Friends'}
                    {props.tabValue === 2 && 'Chat'}
                    {props.tabValue === 3 && 'Settings'}
                </span>
            </Paper>
            <div className={classes.main}>
                {props.tabValue === 1 &&
                    props.friends.map((friend) => {
                        return (
                            <ButtonBase
                                onClick={(e) => props.handleOnClickFriend(friend.friend_id, props)}
                                key={friend.id}
                                className={classes.buttonBase}
                            >
                                <User user={{ displayName: friend.friend_id, iconUrl: '' }} />
                            </ButtonBase>
                        );
                    })}
                {props.tabValue === 3 && (
                    <React.Fragment>
                        <Grid container spacing={4}>
                            <Grid item xs={12}>
                                <Typography>Log in as: {props.loginInfo.displayName}</Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.gridItem}>
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    className={classes.button}
                                    onClick={(e) => props.handleOnClickLogoutButton(props)}
                                >
                                    Log out
                                </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                )}
            </div>
            <Paper className={classes.bottomTabs} variant="outlined">
                <Tabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    value={props.tabValue}
                    onChange={(e, newVal) => props.handleOnChangeTab(newVal)}
                >
                    <Tab icon={<Search style={{ fontSize: 25 }} />} label="Search" className={classes.tab} value={0} />
                    <Tab
                        icon={<PeopleAlt style={{ fontSize: 25 }} />}
                        label="Friends"
                        className={classes.tab}
                        value={1}
                    />
                    <Tab
                        icon={<Settings style={{ fontSize: 25 }} />}
                        label="Settings"
                        className={classes.tab}
                        value={3}
                    />
                </Tabs>
            </Paper>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
