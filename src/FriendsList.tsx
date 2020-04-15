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

    handleOnClickEditButton(): void;
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
        handleOnClickEditButton(): void {
            dispatch(actions.changeEditFriend());
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
});

const FriendsList: React.FC<FriendsListProps> = (props: FriendsListProps) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item xs={12} className={classes.editButtonContainer}>
                    <Button variant="contained" color="secondary" onClick={(e) => props.handleOnClickEditButton()}>
                        Edit
                    </Button>
                </Grid>
            </Grid>
            {props.friends.map((friend) => {
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
        </React.Fragment>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
