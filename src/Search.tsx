import * as React from 'react';
import { Avatar, Button, Grid, IconButton, TextField, Typography, makeStyles } from '@material-ui/core';
import { State } from '../redux/reducer';
import { Dispatch } from 'redux';
import { AppState } from '../redux/store';
import SearchIcon from '@material-ui/icons/Search';
import { actions } from '../redux/actions';
import { connect } from 'react-redux';

interface OwnProps {
    handleOnChangeSearchInput(text: string): void;
    handleOnClickSearchButton(text: string): void;
    handleOnClickRegisterFriendButton(userId: string, friendId: string): void;
}

type SearchProps = OwnProps & Pick<State, 'searchResult' | 'userSearchInput' | 'loginInfo'>;

const mapStateToProps = (appState: AppState) => {
    return {
        searchResult: appState.state.searchResult,
        userSearchInput: appState.state.userSearchInput,
        loginInfo: appState.state.loginInfo,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnChangeSearchInput(text: string): void {
            dispatch(actions.updateUserSearchInput(text));
        },
        handleOnClickSearchButton(text: string): void {
            dispatch(actions.requestSearchUser(text));
        },
        handleOnClickRegisterFriendButton(userId: string, friendId: string): void {
            dispatch(
                actions.requestRegisterFriend({
                    user_id: userId,
                    friend_id: friendId,
                }),
            );
        },
    };
};

const useStyles = makeStyles({
    form: {
        width: '100%',
    },
    formContainer: {
        margin: '16px',
        display: 'flex',
        alignItems: 'center',
    },
    avatar: {
        height: '80px',
        width: '80px',
    },
    gridSearchResult: {
        display: 'flex',
        justifyContent: 'center',
    },
});

const Search: React.FC<SearchProps> = (props: SearchProps) => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} className={classes.formContainer}>
                <TextField
                    label="Search"
                    variant="outlined"
                    className={classes.form}
                    value={props.userSearchInput}
                    onChange={(e) => props.handleOnChangeSearchInput(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            props.handleOnClickSearchButton(props.userSearchInput);
                        }
                    }}
                />
                <IconButton onClick={(e) => props.handleOnClickSearchButton(props.userSearchInput)}>
                    <SearchIcon />
                </IconButton>
            </Grid>
            <Grid item xs={12}>
                {props.searchResult.id && (
                    <Grid container spacing={2}>
                        <Grid item xs={12} className={classes.gridSearchResult}>
                            <Avatar className={classes.avatar}>?</Avatar>
                        </Grid>
                        <Grid item xs={12} className={classes.gridSearchResult}>
                            <Typography>{props.searchResult.displayName}</Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.gridSearchResult}>
                            <Button
                                color="primary"
                                variant="contained"
                                onClick={(e) =>
                                    props.handleOnClickRegisterFriendButton(props.loginInfo.id, props.searchResult.id)
                                }
                            >
                                Become Friends
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
