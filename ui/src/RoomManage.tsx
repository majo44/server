import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    Paper,
    TextField,
    Typography,
    Link,
} from '@mui/material';
import {FCreateRoom, UseRoom} from './useRoom';
import {UIConfig} from './message';
import {getRoomFromURL} from './useRoomID';
import {authModeToRoomMode, UseConfig} from './useConfig';
import {LoginForm} from './LoginForm';

const CreateRoom = ({room, config}: Pick<UseRoom, 'room'> & {config: UIConfig}) => {
    const [id, setId] = React.useState(() => getRoomFromURL() ?? 'meetup');
    const mode = authModeToRoomMode(config.authMode, config.loggedIn);
    const [ownerLeave, setOwnerLeave] = React.useState(config.closeRoomWhenOwnerLeaves);
    const submit = () =>
        room({
            type: 'create',
            payload: {
                mode,
                closeOnOwnerLeave: ownerLeave,
                joinIfExist: true,
                id: id || undefined,
            },
        });
    return (
        <div>
            <FormControl fullWidth>
                <TextField
                    fullWidth
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    label="room"
                    margin="dense"
                    style={{marginBottom: 20}}
                />
                <Button onClick={submit} fullWidth variant="contained">
                    Create or Join a Room
                </Button>
            </FormControl>
        </div>
    );
};

export const RoomManage = ({room, config}: {room: FCreateRoom; config: UseConfig}) => {
    const [showLogin, setShowLogin] = React.useState(false);

    const canCreateRoom = config.authMode !== 'all';
    const loginVisible = !config.loggedIn && (showLogin || !canCreateRoom);

    return (
        <Grid
            container={true}
            justifyContent="center"
            style={{paddingTop: 50, maxWidth: 400, width: '100%', margin: '0 auto'}}
            spacing={4}
        >
            <Grid item xs={12}>
                <Typography align="center" gutterBottom>
                    <img src="./ac-logo-white.png" style={{width: 350, marginBottom: 100}} alt="logo" />
                </Typography>
                <Paper elevation={3} style={{padding: 20}}>
                        <>
                            <CreateRoom room={room} config={config} />
                        </>
                </Paper>
            </Grid>
        </Grid>
    );
};
