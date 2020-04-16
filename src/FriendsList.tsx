import * as React from 'react';
import { State } from '../redux/reducer';
import { AppState } from '../redux/store';
import { actions } from '../redux/actions';
import { Dispatch } from 'redux';
import { Button, ButtonBase, Grid, makeStyles } from '@material-ui/core';
import User from './User';
import * as H from 'history';
import { connect } from 'react-redux';

interface OwnProps {
    history: H.History;
    handleOnClickFriend(friend: State['chatFriend'], props: FriendsListProps): void;
    handleOnClickDeleteButton(userId: string, friends: string[]): void;
}

type FriendsListProps = OwnProps & Pick<State, 'friends' | 'chatFriend' | 'loginInfo' | 'editFriend' | 'checkedFriend'>;

const mapStateToProps = (appState: AppState) => {
    return {
        friends: appState.state.friends,
        chatFriend: appState.state.chatFriend,
        loginInfo: appState.state.loginInfo,
        editFriend: appState.state.editFriend,
        checkedFriend: appState.state.checkedFriend,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnClickFriend(friend: State['chatFriend'], props: FriendsListProps): void {
            if (!props.editFriend) {
                if (friend.displayName !== props.chatFriend.displayName) {
                    dispatch(actions.requestGetMessages({ user1: props.loginInfo.id, user2: friend.id }));
                }
                dispatch(actions.changeChatFriend(friend));
                props.history.push('/talk');
            } else {
                if (props.checkedFriend.indexOf(friend.id) === -1) {
                    dispatch(actions.checkFriend(friend.id));
                } else {
                    dispatch(actions.uncheckFriend(friend.id));
                }
            }
        },
        handleOnClickDeleteButton(userId: string, friends: string[]): void {
            dispatch(actions.requestDeleteFriends({ userId, friends }));
        },
    };
};

const useStyles = makeStyles({
    buttonBase: {
        width: '100%',
    },
    editButtonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    deleteButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        bottom: '10vh',
        width: '100%',
    },
});

const FriendsList: React.FC<FriendsListProps> = (props: FriendsListProps) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={1} style={{ marginTop: '0' }}>
                {props.friends.map((friend) => {
                    return (
                        <Grid item xs={12}>
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
                        </Grid>
                    );
                })}
            </Grid>
            {props.checkedFriend.length > 0 && (
                <div className={classes.deleteButtonContainer}>
                    <Button
                        color="secondary"
                        variant="contained"
                        onClick={(e) => props.handleOnClickDeleteButton(props.loginInfo.id, props.checkedFriend)}
                    >
                        Delete {props.checkedFriend.length} friends
                    </Button>
                </div>
            )}
        </React.Fragment>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
