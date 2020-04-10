import * as React from 'react';
import { Avatar, Grid, Paper, Typography, makeStyles, colors } from '@material-ui/core';
import Moment from 'react-moment';

interface OwnProps {
    message: any;
    sentByMe: boolean;
    userIcon: string;
    friendIcon: string;
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
        borderRadius: '10px 10px 10px 2px',
        backgroundColor: colors.grey[300],
    },
    bubbleRight: {
        padding: '5px 8px',
        borderRadius: '10px 10px 2px 10px',
        backgroundColor: colors.blue[500],
        color: 'white',
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
                        <Paper className={classes.bubbleRight}>
                            <Typography>{props.message.text}</Typography>
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Avatar src={props.userIcon} alt="?" />
                    </Grid>
                </Grid>
            ) : (
                <Grid container>
                    <Grid item>
                        <Avatar src={props.friendIcon} alt="?" />
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
