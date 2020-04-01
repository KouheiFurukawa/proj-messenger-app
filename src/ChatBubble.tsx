import * as React from 'react';
import { Avatar, Grid, Paper, Typography, makeStyles, colors } from '@material-ui/core';
import Moment from 'react-moment';

interface OwnProps {
    message: any;
    sentByMe: boolean;
}

type ChatBubbleProps = OwnProps;

const useStyles = makeStyles({
    gridContainerSentByMe: {
        justifyContent: 'flex-end',
    },
    bubbleContainer: {
        display: 'flex',
        alignItems: 'center',
        margin: '0 10px',
    },
    bubble: {
        padding: '5px 8px',
        borderRadius: '10px',
        backgroundColor: colors.grey[300],
    },
    timestamp: {
        fontSize: '7px',
        display: 'flex',
        alignItems: 'flex-end',
    },
});

export const ChatBubble: React.FC<ChatBubbleProps> = (props: ChatBubbleProps) => {
    const classes = useStyles();
    return (
        <Grid item xs={12}>
            {props.sentByMe ? (
                <Grid container className={classes.gridContainerSentByMe}>
                    <Grid item className={classes.timestamp}>
                        <Moment date={new Date(props.message.send_date)} format="MM/DD HH:mm" />
                    </Grid>
                    <Grid item className={classes.bubbleContainer}>
                        <Paper className={classes.bubble}>
                            <Typography>{props.message.text}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Avatar>?</Avatar>
                    </Grid>
                </Grid>
            ) : (
                <Grid container>
                    <Grid item>
                        <Avatar>?</Avatar>
                    </Grid>
                    <Grid item className={classes.bubbleContainer}>
                        <Paper className={classes.bubble}>
                            <Typography>{props.message.text}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item className={classes.timestamp}>
                        <Moment date={new Date(props.message.send_date)} format="MM/DD HH:mm" />
                    </Grid>
                </Grid>
            )}
        </Grid>
    );
};
