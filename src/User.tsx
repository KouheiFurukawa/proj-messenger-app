import * as React from 'react';
import { Avatar, Grid, Paper, Typography, makeStyles } from '@material-ui/core';

interface OwnProps {
    user: {
        displayName: string;
        iconUrl: string;
    };
}

type UserProps = OwnProps;

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

export const User: React.FC<UserProps> = (props: UserProps) => {
    const classes = useStyles();

    return (
        <Paper className={classes.paper}>
            <Grid container className={classes.gridContainer}>
                <Grid item className={classes.gridItem}>
                    <Avatar className={classes.avatar}>?</Avatar>
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
