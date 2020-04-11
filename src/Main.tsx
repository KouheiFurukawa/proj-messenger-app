import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Chat from '@material-ui/icons/Chat';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import { ButtonBase, Paper, Tabs, Tab, makeStyles, colors } from '@material-ui/core';
import { State } from '../redux/reducer';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../redux/actions';
import { User } from './User';
import { AppState } from '../redux/store';
import * as H from 'history';
import Search from './Search';
import Settings from './Settings';

interface OwnProps {
    handleOnChangeTab(value: number): void;
    handleOnClickFriend(friend: State['chatFriend'], props: MainProps): void;
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
        handleOnClickFriend(friend: State['chatFriend'], props: MainProps): void {
            if (friend.displayName !== props.chatFriend.displayName) {
                dispatch(actions.requestGetMessages({ user1: props.loginInfo.id, user2: friend.id }));
            }
            dispatch(actions.changeChatFriend(friend));
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
                {props.tabValue === 0 && <Search />}
                {props.tabValue === 1 &&
                    props.friends.map((friend) => {
                        return (
                            <ButtonBase
                                onClick={(e) =>
                                    props.handleOnClickFriend(
                                        {
                                            id: friend.friend_id,
                                            displayName: friend.friend_id,
                                            iconUrl: friend.friend_icon_url,
                                        },
                                        props,
                                    )
                                }
                                key={friend.id}
                                className={classes.buttonBase}
                            >
                                <User user={{ displayName: friend.friend_id, iconUrl: friend.friend_icon_url }} />
                            </ButtonBase>
                        );
                    })}
                {props.tabValue === 3 && <Settings history={props.history} />}
            </div>
            <Paper className={classes.bottomTabs} variant="outlined">
                <Tabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    value={props.tabValue}
                    onChange={(e, newVal) => props.handleOnChangeTab(newVal)}
                >
                    <Tab
                        icon={<SearchIcon style={{ fontSize: 25 }} />}
                        label="Search"
                        className={classes.tab}
                        value={0}
                    />
                    <Tab
                        icon={<PeopleAlt style={{ fontSize: 25 }} />}
                        label="Friends"
                        className={classes.tab}
                        value={1}
                    />
                    <Tab
                        icon={<SettingsIcon style={{ fontSize: 25 }} />}
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
