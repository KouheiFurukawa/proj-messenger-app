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
        margin: '0 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    avatar: {
        fontSize: '40px',
        height: '100px',
        width: '100px',
    },
    gridName: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    name: {
        fontSize: '50px',
    },
});

export const User: React.FC<UserProps> = (props: UserProps) => {
    const classes = useStyles();

    return (
        <Paper>
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
