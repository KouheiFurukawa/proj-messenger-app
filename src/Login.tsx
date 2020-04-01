import * as React from 'react';
import { Button, Grid, makeStyles, TextField, IconButton } from '@material-ui/core';
import { State } from '../redux/reducer';
import { Dispatch } from 'redux';
import { actions } from '../redux/actions';
import { connect } from 'react-redux';
import { AppState } from '../redux/store';
import ExitToApp from '@material-ui/icons/ExitToApp';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ApiClient from './ApiClient';
import * as H from 'history';

interface OwnProps {
    handleOnChangeIdInput(value: string): void;
    handleOnChangePasswordInput(value: string): void;
    handleOnChangeLoginDisplayMode(value: string): void;
    handleOnClickLoginButton(props: LoginProps): void;
    handleOnChangeDisplayNameInput(value: string): void;
    history: H.History;
}

type LoginProps = OwnProps & Pick<State, 'loginDisplayMode' | 'idInput' | 'passwordInput' | 'displayNameInput'>;

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnChangeIdInput(value: string): void {
            dispatch(actions.changeIdInput(value));
        },
        handleOnChangePasswordInput(value: string): void {
            dispatch(actions.changePasswordInput(value));
        },
        handleOnChangeLoginDisplayMode(value: string): void {
            dispatch(actions.changeLoginDisplayMode(value));
        },
        handleOnChangeDisplayNameInput(value: string): void {
            dispatch(actions.changeDisplayNameInput(value));
        },
        handleOnClickLoginButton(props: LoginProps): void {
            if (props.loginDisplayMode === 'login') {
                ApiClient.login({ id: props.idInput, password: props.passwordInput })
                    .then((response) => props.history.push('/'))
                    .catch((err) => console.error(err));
            } else {
                ApiClient.signup({
                    id: props.idInput,
                    password: props.passwordInput,
                    displayName: props.displayNameInput,
                })
                    .then((response) => props.history.push('/'))
                    .catch((err) => console.error(err));
            }
        },
    };
};

const mapStateToProps = (appState: AppState) => {
    return {
        loginDisplayMode: appState.state.loginDisplayMode,
        idInput: appState.state.idInput,
        passwordInput: appState.state.passwordInput,
        displayNameInput: appState.state.displayNameInput,
    };
};

const useStyles = makeStyles({
    root: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        width: '250px',
    },
});

const Login: React.FC<LoginProps> = (props: LoginProps) => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            {props.loginDisplayMode === 'button' ? (
                <Grid container spacing={3}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={(e) => props.handleOnChangeLoginDisplayMode('login')}
                        >
                            Log in
                        </Button>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            onClick={(e) => props.handleOnChangeLoginDisplayMode('signup')}
                        >
                            Sign up
                        </Button>
                    </Grid>
                </Grid>
            ) : (
                <Grid container spacing={4}>
                    <Grid item xs={12} className={classes.gridItem}>
                        <TextField
                            label="id"
                            value={props.idInput}
                            onChange={(e) => props.handleOnChangeIdInput(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <TextField
                            label="password"
                            value={props.passwordInput}
                            onChange={(e) => props.handleOnChangePasswordInput(e.target.value)}
                            type="password"
                        />
                    </Grid>
                    {props.loginDisplayMode === 'signup' && (
                        <Grid item xs={12} className={classes.gridItem}>
                            <TextField
                                label="display name"
                                value={props.displayNameInput}
                                onChange={(e) => props.handleOnChangeDisplayNameInput(e.target.value)}
                            />
                        </Grid>
                    )}
                    <Grid item xs={12} className={classes.gridItem}>
                        <IconButton onClick={(e) => props.handleOnChangeLoginDisplayMode('button')}>
                            <ArrowBackIos />
                        </IconButton>
                        <IconButton onClick={(e) => props.handleOnClickLoginButton(props)}>
                            <ExitToApp />
                        </IconButton>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
