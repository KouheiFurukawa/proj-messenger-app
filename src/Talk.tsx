import * as React from 'react';
import { Grid, IconButton, TextField, makeStyles, Paper, colors } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { State } from '../redux/reducer';
import { Dispatch } from 'redux';
import { AppState } from '../redux/store';
import { connect } from 'react-redux';
import * as H from 'history';
import { ChatBubble } from './ChatBubble';

interface OwnProps {
    handleOnClickBackButton(props: TalkProps): void;
    history: H.History;
}

type TalkProps = OwnProps & Pick<State, 'chatFriend' | 'messages' | 'loginInfo'>;

const mapStateToProps = (appState: AppState) => {
    return {
        chatFriend: appState.state.chatFriend,
        messages: appState.state.messages,
        loginInfo: appState.state.loginInfo,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnClickBackButton(props: TalkProps): void {
            props.history.push('/');
        },
    };
};

const useStyles = makeStyles({
    header: {
        height: '7vh',
        backgroundColor: colors.indigo[500],
        color: 'white',
        fontSize: '30px',
        paddingLeft: '30px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '0',
    },
    gridContainer: {
        height: '93vh',
    },
    gridChatLog: {
        height: '90%',
        width: '100%',
        padding: '8px',
    },
    gridForm: {
        height: '10%',
    },
    button: {
        width: '250px',
    },
    formContainer: {
        height: '100%',
        width: '100%',
        borderRadius: '0',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        color: 'white',
    },
});

const Talk: React.FC<TalkProps> = (props: TalkProps) => {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.header}>
                <span>{props.chatFriend.displayName}</span>
                <IconButton onClick={(e) => props.handleOnClickBackButton(props)} className={classes.backButton}>
                    <ArrowBackIos />
                </IconButton>
            </Paper>
            <Grid container className={classes.gridContainer}>
                <Grid item className={classes.gridChatLog}>
                    <Grid container spacing={2}>
                        {props.messages.map((message) => (
                            <ChatBubble
                                message={message}
                                sentByMe={message.user_from === props.loginInfo.id}
                                key={message.send_date}
                            />
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} className={classes.gridForm}>
                    <Paper className={classes.formContainer} elevation={3}>
                        <TextField variant="outlined" label="message" />
                        <IconButton>
                            <Send />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Talk);
