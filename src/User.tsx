import * as React from 'react';
import { State } from '../redux/reducer';
import { AppState } from '../redux/store';
import { Avatar, Grid, Paper, Typography, makeStyles, Radio } from '@material-ui/core';
import { connect } from 'react-redux';

interface OwnProps {
    user: {
        displayName: string;
        iconUrl: string;
    };
}

type UserProps = OwnProps & Pick<State, 'editFriend' | 'checkedFriend'>;

const mapStateToProps = (appState: AppState) => {
    return {
        editFriend: appState.state.editFriend,
        checkedFriend: appState.state.checkedFriend,
    };
};

const useStyles = makeStyles({
    gridContainer: {
        height: '7vh',
    },
    gridItem: {
        margin: '0 20px',
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    avatar: {
        fontSize: '25px',
        height: '45px',
        width: '45px',
    },
    gridName: {
        display: 'flex',
        alignItems: 'center',
    },
    name: {
        fontSize: '30px',
    },
    paper: {
        width: '100%',
    },
});

const User: React.FC<UserProps> = (props: UserProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper} elevation={0}>
            <Grid container className={classes.gridContainer}>
                {props.editFriend && (
                    <Grid item>
                        <Radio checked={props.checkedFriend.indexOf(props.user.displayName) !== -1} />
                    </Grid>
                )}
                <Grid item className={classes.gridItem}>
                    <Avatar className={classes.avatar} src={props.user.iconUrl} alt="?" />
                </Grid>
                <Grid item xs zeroMinWidth className={classes.gridName}>
                    <Typography noWrap className={classes.name}>
                        {props.user.displayName}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default connect(mapStateToProps)(User);
