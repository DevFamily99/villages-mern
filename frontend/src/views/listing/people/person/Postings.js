import React from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// project imports
import PostingCard from 'ui-component/cards/PostingCard';
import MainCard from 'ui-component/cards/MainCard';
import EmptyCard from 'ui-component/cards/EmptyCard'
import { gridSpacing } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { getPostings } from 'store/slices/user';
import Empty from "../../../../ui-component/Empty";

// ==============================|| SOCIAL PROFILE - GALLERY ||============================== //

const Postings = ({ user }) => {
    const dispatch = useDispatch();
    const [postings, setPostings] = React.useState([]);
    const userState = useSelector((state) => state.user);
    React.useEffect(() => {
        setPostings(userState.postings);
    }, [userState]);

    React.useEffect(() => {
        dispatch(getPostings(user.id));
    }, []);

    let postingsResult = (
      <Grid item container>
          <Empty />
      </Grid>
    );
    if (postings.length > 0) {
        postingsResult = postings.map((item, index) => (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                <PostingCard
                  avatar={user?.profile?.avatar}
                  post={item.photo}
                  title={item.title}
                  description={item.description}
                />
            </Grid>
        ));
    }

    return (
        <MainCard
            title={
                <Grid container alignItems="center" justifyContent="space-between" spacing={gridSpacing}>
                    <Grid item>
                        <Typography variant="h3">Postings</Typography>
                    </Grid>
                </Grid>
            }
        >
            <Grid container direction="row" spacing={gridSpacing}>
                {postingsResult}
            </Grid>
        </MainCard>
    );
};

export default Postings;
