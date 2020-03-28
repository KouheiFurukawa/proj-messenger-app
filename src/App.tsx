import * as React from 'react';
import Search from '@material-ui/icons/Search';
import Chat from '@material-ui/icons/Chat';
import PeopleAlt from '@material-ui/icons/PeopleAlt';
import { Paper, Tabs, Tab, makeStyles } from '@material-ui/core';

interface OwnProps {}

type AppProps = OwnProps;

const useStyles = makeStyles({
    main: {
        height: '92vh',
    },
    bottomTabs: {
        height: '8vh',
    },
    tab: {
        height: '8vh',
        fontSize: 25,
    },
});

export const App: React.FC<AppProps> = (props: AppProps) => {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.main}>Main Component</div>
            <Paper className={classes.bottomTabs} variant="outlined">
                <Tabs variant="fullWidth" indicatorColor="primary" textColor="primary" value={0}>
                    <Tab icon={<Search style={{ fontSize: 40 }} />} label="Search" className={classes.tab} />
                    <Tab icon={<PeopleAlt style={{ fontSize: 40 }} />} label="Friends" className={classes.tab} />
                    <Tab icon={<Chat style={{ fontSize: 40 }} />} label="Chat" className={classes.tab} />
                </Tabs>
            </Paper>
        </div>
    );
};
