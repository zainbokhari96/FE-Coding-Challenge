import { useEffect, useState } from 'react';

// Third-party libraries
import { useLocation } from 'react-router-dom';

import service from '../../../service';
import { codes } from "../../../utils/flags"

// MUI Components
import { Card, CardContent, CardMedia, Typography, Grid, Avatar, Box, CircularProgress } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import RoomIcon from '@mui/icons-material/Room';

interface User {
    name: { first: string; last: string };
    email: string;
    gender: number;
    phone: string;
    dob: { date: string };
    picture: { large: string };
    location?: { city: string; state: string; country: string };
    nat?: string;
}

export default function Profile() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const location = useLocation();
    const pathSegments = location.pathname.split('/');
    const userId = pathSegments[pathSegments.length - 1];

    const getFlag = (countryName: string | RegExp) => {
        const code = codes.find(o => o.name.match(RegExp(countryName, 'i')))?.code;
        return code ? getFlagEmoji(code) : null;
    };

    const getFlagEmoji = (countryCode: string) => String.fromCodePoint(...[...countryCode.toUpperCase()].map(x => 0x1f1a5 + x.charCodeAt()));

    const fetchUser = async () => {
        try {
            const payload = { id: userId };
            const request = await service.get('', payload);
            if (request.status === 200) {
                setUser(request?.data?.results[0] as User);
            }
        } catch (error) {
            console.error('Error fetching user:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    if (loading) return <CircularProgress />;

    if (!user) return <Typography variant="body1">User not found.</Typography>;

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ maxWidth: 320 }}>
                <CardMedia component="img" alt={`${user.name.first}`} image={user.picture.large} />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">My name is</Typography>
                    <Typography gutterBottom variant="h5" component="div">{`${user.name.first} ${user.name.last}`}</Typography>
                    {user.email && (
                        <Grid container spacing={1} alignItems="center" mt={1}>
                            <Grid item><Avatar><EmailIcon /></Avatar></Grid>
                            <Grid item><Typography variant="body2" color="text.secondary">{user.email}</Typography></Grid>
                        </Grid>
                    )}
                    {user.phone && (
                        <Grid container spacing={1} alignItems="center" mt={1}>
                            <Grid item><Avatar><PhoneIcon /></Avatar></Grid>
                            <Grid item><Typography variant="body2" color="text.secondary">{user.phone}</Typography></Grid>
                        </Grid>
                    )}
                    {user.dob.date && (
                        <Grid container spacing={1} alignItems="center" mt={1}>
                            <Grid item><Avatar><CakeIcon /></Avatar></Grid>
                            <Grid item><Typography variant="body2" color="text.secondary">{new Date(user.dob.date).toLocaleDateString()}</Typography></Grid>
                        </Grid>
                    )}
                    {user.location && (
                        <Grid container spacing={1} alignItems="center" mt={1}>
                            <Grid item><Avatar><RoomIcon /></Avatar></Grid>
                            <Grid item><Typography variant="body2" color="text.secondary">{`${user.location.city}, ${user.location.state}`}</Typography></Grid>
                        </Grid>
                    )}
                    {user.location?.country && (
                        <Grid container spacing={1} alignItems="center" mt={1}>
                            <Grid item><Avatar>{getFlag(user.location.country)}</Avatar></Grid>
                            <Grid item><Typography variant="body2" color="text.secondary">{user.location.country}</Typography></Grid>
                        </Grid>
                    )}
                </CardContent>
            </Card>
        </Box>
    );
}