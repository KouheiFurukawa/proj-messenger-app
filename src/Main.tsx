import * as React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Chat from '@material-ui/icons/Chat';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import SettingsIcon from '@material-ui/icons/Settings';
import { Paper, Tabs, Tab, makeStyles, colors, IconButton } from '@material-ui/core';
import { State } from '../redux/reducer';
import { connect, useDispatch } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../redux/actions';
import { AppState } from '../redux/store';
import * as H from 'history';
import Search from './Search';
import Settings from './Settings';
import FriendsList from './FriendsList';
import Edit from '@material-ui/icons/Edit';

interface OwnProps {
    handleOnChangeTab(value: number): void;
    handleOnClickEditButton(): void;
    history: H.History;
}

const mapStateToProps = (appState: AppState) => {
    return {
        tabValue: appState.state.tabValue,
        textInput: appState.state.textInput,
        userSearchInput: appState.state.userSearchInput,
        messages: appState.state.messages,
        loginInfo: appState.state.loginInfo,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnChangeTab(value: number): void {
            dispatch(actions.changeTab(value));
        },
        handleOnClickEditButton(): void {
            dispatch(actions.changeEditFriend());
        },
    };
};

type MainProps = OwnProps & State;

const useStyles = makeStyles({
    main: {
        height: '85vh',
        width: '100%',
        position: 'fixed',
    },
    header: {
        height: '7vh',
        backgroundColor: colors.indigo[500],
        color: 'white',
        fontSize: '30px',
        paddingLeft: '30px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: '0',
    },
    bottomTabs: {
        height: '9vh',
        position: 'fixed',
        bottom: '3px',
        width: '100%',
        borderRadius: '0',
    },
    tab: {
        height: '8vh',
        fontSize: 15,
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
                {props.tabValue === 1 && (
                    <IconButton onClick={(e) => props.handleOnClickEditButton()}>
                        <Edit style={{ color: 'white' }} />
                    </IconButton>
                )}
            </Paper>
            <div className={classes.main}>
                {props.tabValue === 0 && <Search />}
                {props.tabValue === 1 && <FriendsList history={props.history} />}
                {props.tabValue === 3 && <Settings history={props.history} />}
            </div>
            <Paper className={classes.bottomTabs} variant="outlined">
                <Tabs
                    variant="fullWidth"
                    indicatorColor="primary"
                    textColor="primary"
                    value={props.tabValue}
                    style={{ height: '100%' }}
                    onChange={(e, newVal) => props.handleOnChangeTab(newVal)}
                >
                    <Tab
                        icon={<SearchIcon style={{ fontSize: 25, marginBottom: 0 }} />}
                        label="Search"
                        className={classes.tab}
                        value={0}
                    />
                    <Tab
                        icon={<PeopleAlt style={{ fontSize: 25, marginBottom: 0 }} />}
                        label="Friends"
                        className={classes.tab}
                        value={1}
                    />
                    <Tab
                        icon={<SettingsIcon style={{ fontSize: 25, marginBottom: 0 }} />}
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
