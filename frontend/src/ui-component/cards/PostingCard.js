import PropTypes from 'prop-types';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Button, Card, CardContent, CardMedia, Chip, Grid, Typography } from '@mui/material';

// project imports
import Avatar from '../extended/Avatar';
import { gridSpacing } from 'store/constant';

// assets
import DefaultUserIcon from '../../assets/images/auth/default.png';
import DefaultPostingIcon from '../../assets/images/posting/default.png';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import ChatIcon from '@mui/icons-material/Chat';
import useAuth from '../../hooks/useAuth';
import React from 'react';
import { Link } from 'react-router-dom';
import { SERVER_URL } from 'config';

// styles
const DeleteWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(153,141,141,0.2)',
    '& svg': {
        color: '#2b2a2a'
    },
    '&:hover': {
        background: '#2b2a2a',
        '& svg': {
            color: '#fff'
        }
    }
});

const EditWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(242,214,29,0.2)',
    '& svg': {
        color: '#f2ab1d'
    },
    '&:hover': {
        background: '#f2b61d',
        '& svg': {
            color: '#fff'
        }
    }
});

const TrustWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(242,29,104,0.2)',
    '& svg': {
        color: '#f21d60'
    },
    '&:hover': {
        background: '#f21d60',
        '& svg': {
            color: '#fff'
        }
    }
});

const PaymentWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(29, 161, 242, 0.2)',
    '& svg': {
        color: '#1DA1F2'
    },
    '&:hover': {
        background: '#1DA1F2',
        '& svg': {
            color: '#fff'
        }
    }
});

const MessageWrapper = styled(Button)({
    padding: 8,
    background: 'rgba(14, 118, 168, 0.12)',
    '& svg': {
        color: '#0E76A8'
    },
    '&:hover': {
        background: '#0E76A8',
        '& svg': {
            color: '#fff'
        }
    }
});

// ==============================|| USER PROFILE CARD ||============================== //

const PostingCard = ({ avatar, title, post, author, description, own, ...other }) => {
    const theme = useTheme();
    const postImage = post ? `${SERVER_URL}/upload/posting/` + post : DefaultPostingIcon;
    const avatarImage = avatar ? `${SERVER_URL}/upload/avatar/` + avatar : DefaultUserIcon;

    return (
        <Card
            sx={{
                background: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                border: theme.palette.mode === 'dark' ? 'none' : '1px solid',
                borderColor: theme.palette.grey[100],
                textAlign: 'center'
            }}
        >
            <CardMedia component="img" image={postImage} title={title} sx={{ height: '125px' }} />
            <CardContent sx={{ p: 2, pb: '16px !important' }}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Avatar alt={title} src={avatarImage} sx={{ width: 72, height: 72, m: '-50px auto 0' }} />
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} alignItems="center">
                        <Grid container spacing={1}>
                            <Grid item xs={12} sx={{ height: 50 }}>
                                <Typography variant="h4">{title.length > 30 ? title.substring(0, 30) + '...' : title}</Typography>
                            </Grid>
                            <Grid item xs={12} sx={{ height: 100 }}>
                                <Typography variant="body2">
                                    {description.length > 100 ? description.substring(0, 100) + '...' : description}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        {own ? (
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <DeleteWrapper fullWidth>
                                        <DeleteIcon onClick={other?.onDelete} />
                                    </DeleteWrapper>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <EditWrapper fullWidth>
                                        <EditIcon onClick={other?.onEdit} />
                                    </EditWrapper>
                                </Grid>
                            </Grid>
                        ) : (
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <TrustWrapper fullWidth component={Link} to={`/ripple/trust/${author}`}>
                                        <FavoriteIcon />
                                    </TrustWrapper>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <PaymentWrapper fullWidth component={Link} to={`/ripple/pay/${author}`}>
                                        <CurrencyExchangeIcon />
                                    </PaymentWrapper>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <MessageWrapper fullWidth>
                                        <ChatIcon />
                                    </MessageWrapper>
                                </Grid>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

PostingCard.propTypes = {
    avatar: PropTypes.string,
    name: PropTypes.string,
    profile: PropTypes.string,
    role: PropTypes.string,
    status: PropTypes.string
};

export default PostingCard;
