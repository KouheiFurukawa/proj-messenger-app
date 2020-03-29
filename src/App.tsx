import * as React from 'react';
import Search from '@material-ui/icons/Search';
import Chat from '@material-ui/icons/Chat';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import { Paper, Tabs, Tab, makeStyles } from '@material-ui/core';
import { State } from '../redux/reducer';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../redux/actions';
import { User } from './User';
import { AppState } from '../redux/store';

interface OwnProps {
    handleOnChangeTab(value: number): void;
}

const mapStateToProps = (appState: AppState) => {
    return {
        tabValue: appState.state.tabValue,
        textInput: appState.state.textInput,
        userSearchInput: appState.state.userSearchInput,
        friends: appState.state.friends,
        messages: appState.state.messages,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnChangeTab(value: number): void {
            dispatch(actions.changeTab(value));
        },
    };
};

type AppProps = OwnProps & State;

const useStyles = makeStyles({
    main: {
        height: '92vh',
    },
    bottomTabs: {
        height: '8vh',
    },
    tab: {
        height: '8vh',
        fontSize: 25,
    },
});

const App: React.FC<AppProps> = (props: AppProps) => {
    const classes = useStyles();

    React.useEffect(() => {
        dispatch(actions.requestGetFriends('test1'));
    }, []);

    const dispatch = useDispatch();

    return (
        <div>
            <div className={classes.main}>
                {props.tabValue === 1 &&
                    props.friends.map((friend) => {
                        return <User user={{ displayName: friend.friend_id, iconUrl: '' }} key={friend.id} />;
                    })}
            </div>
            <Paper className={classes.bottomTabs} variant="outlined">
                <Tabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    value={props.tabValue}
                    onChange={(e, newVal) => props.handleOnChangeTab(newVal)}
                >
                    <Tab icon={<Search style={{ fontSize: 40 }} />} label="Search" className={classes.tab} value={0} />
                    <Tab
                        icon={<PeopleAlt style={{ fontSize: 40 }} />}
                        label="Friends"
                        className={classes.tab}
                        value={1}
                    />
                    <Tab icon={<Chat style={{ fontSize: 40 }} />} label="Chat" className={classes.tab} value={2} />
                </Tabs>
            </Paper>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
