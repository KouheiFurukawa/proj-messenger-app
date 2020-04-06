import * as React from 'react';
import { Grid, IconButton, TextField, makeStyles, Paper, colors } from '@material-ui/core';
import Send from '@material-ui/icons/Send';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import { State } from '../redux/reducer';
import { Dispatch } from 'redux';
import { AppState } from '../redux/store';
import { connect, useDispatch } from 'react-redux';
import * as H from 'history';
import { ChatBubble } from './ChatBubble';
import { actions } from '../redux/actions';
import * as moment from 'moment';

interface OwnProps {
    handleOnClickBackButton(props: TalkProps): void;
    handleUpdateTextInput(text: string): void;
    handleSendMessage(userFrom: string, userTo: string, text: string, sendDate: Date): void;
    history: H.History;
}

type TalkProps = OwnProps & Pick<State, 'chatFriend' | 'messages' | 'loginInfo' | 'textInput'>;

const mapStateToProps = (appState: AppState) => {
    return {
        chatFriend: appState.state.chatFriend,
        messages: appState.state.messages,
        loginInfo: appState.state.loginInfo,
        textInput: appState.state.textInput,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        handleOnClickBackButton(props: TalkProps): void {
            localStorage.clear();
            props.history.push('/');
        },
        handleUpdateTextInput(text: string): void {
            dispatch(actions.updateTextInput(text));
        },
        handleSendMessage(userFrom: string, userTo: string, text: string, sendDate: Date): void {
            dispatch(
                actions.requestSendMessage({
                    text,
                    user_to: userTo,
                    user_from: userFrom,
                    send_date: moment(sendDate).format('YYYY-MM-DD HH:mm:ss'),
                }),
            );
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
        overflowY: 'scroll',
    },
    gridForm: {
        height: '10%',
    },
    button: {
        width: '250px',
    },
    formContainer: {
        height: '80px',
        width: '100%',
        borderRadius: '0',
        display: 'flex',
        position: 'fixed',
        justifyContent: 'center',
        alignItems: 'center',
    },
    backButton: {
        color: 'white',
    },
});

const Talk: React.FC<TalkProps> = (props: TalkProps) => {
    const classes = useStyles();

    React.useEffect(() => {
        if (!props.chatFriend.id) {
            const chatFriendString = localStorage.getItem('chatFriend');
            if (chatFriendString) {
                dispatch(actions.requestRestoreMessage(JSON.parse(chatFriendString)));
            }
        } else {
            localStorage.setItem('loginInfo', JSON.stringify(props.loginInfo));
            localStorage.setItem('chatFriend', JSON.stringify(props.chatFriend));
        }
        dispatch(actions.initSocket(props.loginInfo.id));
    }, []);

    const dispatch = useDispatch();

    return (
        <div>
            <Paper className={classes.header}>
                <span>{props.chatFriend.displayName}</span>
                <IconButton onClick={(e) => props.handleOnClickBackButton(props)} className={classes.backButton}>
                    <ArrowBackIos />
                </IconButton>
            </Paper>
            <Grid container className={classes.gridContainer}>
                <Grid item className={classes.gridChatLog} id="grid-chat-log">
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
                        <TextField
                            variant="outlined"
                            label="message"
                            value={props.textInput}
                            onChange={(e) => props.handleUpdateTextInput(e.target.value)}
                        />
                        <IconButton
                            onClick={(e) =>
                                props.handleSendMessage(
                                    props.loginInfo.id,
                                    props.chatFriend.id,
                                    props.textInput,
                                    new Date(),
                                )
                            }
                        >
                            <Send />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Talk);
