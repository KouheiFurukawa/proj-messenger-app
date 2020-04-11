import * as React from 'react';
import { Button, Grid, Typography, makeStyles, Avatar } from '@material-ui/core';
import { State } from '../redux/reducer';
import { AppState } from '../redux/store';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { actions } from '../redux/actions';
import ApiClient from './ApiClient';
import * as H from 'history';

interface OwnProps {
    history: H.History;

    handleOnClickLogoutButton(props: SettingsProps): void;

    handleOnSelectIcon(file: File, id: string): void;
}

type SettingsProps = OwnProps & Pick<State, 'loginInfo'>;

const mapStateToProps = (appState: AppState) => {
    return {
        loginInfo: appState.state.loginInfo,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnClickLogoutButton(props: SettingsProps): void {
            ApiClient.logout()
                .then((data) => {
                    props.history.push('/login');
                    dispatch(actions.clearState());
                })
                .catch((err) => console.error(err));
        },
        handleOnSelectIcon(file: File, id: string): void {
            dispatch(actions.requestUpdateIcon({ file, id }));
        },
    };
};

const useStyles = makeStyles({
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
    },
    button: {
        width: '250px',
    },
    icon: {
        width: '50px',
        height: '50px',
    },
    displayName: {
        width: '100%',
        textAlign: 'center',
    },
});

const Settings: React.FC<SettingsProps> = (props: SettingsProps) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Typography>Log in as:</Typography>
                </Grid>
                <Grid item xs={12} className={classes.gridItem}>
                    <Avatar className={classes.icon} src={props.loginInfo.iconUrl} alt="?" />
                </Grid>
                <Typography className={classes.displayName}>{props.loginInfo.displayName}</Typography>
                <Grid item xs={12} className={classes.gridItem}>
                    <label htmlFor="{input:image-input}">
                        <Button variant="contained" color="primary" className={classes.button} component="label">
                            Upload Icon
                            <form method="post" encType="multipart/form-data">
                                <input
                                    type="file"
                                    style={{ display: 'none' }}
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            props.handleOnSelectIcon(e.target.files[0], props.loginInfo.id);
                                        }
                                    }}
                                />
                            </form>
                        </Button>
                    </label>
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
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
