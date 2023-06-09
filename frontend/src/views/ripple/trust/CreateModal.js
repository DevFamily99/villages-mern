import React from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography, Autocomplete, InputAdornment, Switch, FormControlLabel } from '@mui/material';

const CreateModal = ({ open, onClose, onSave, endorsement, users, setEndorsement, errors }) => {
  const theme = useTheme();
  const defaultProps = {
    options: users,
    getOptionLabel: (option) => `${option.username} (${option.email})`,
    filterOptions: (options, { inputValue }) => options.filter(item => item.username.includes(inputValue) || item.email.includes(inputValue))
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      {open && (
        <>
          <DialogTitle id="form-dialog-title">TRUST</DialogTitle>
          <DialogContent>
            <Stack spacing={3}>
              <DialogContentText>
                <Typography variant="body2" component="span">
                  Let your friends know that you trust a promise from them and they can use their credit with your network.
                </Typography>
              </DialogContentText>
              {/* TODO: A component is changing an uncontrolled Autocomplete to be controlled */}
              <Autocomplete
                {...defaultProps}
                id="recipient"
                value={users.find(user => user.id === endorsement.recipient) || null}
                onChange={(event, newValue) => {
                  setEndorsement({ ...endorsement, recipient: newValue.id });
                }}
                renderInput={(params) => <TextField {...params} label="CHOOSE THE TRUST RECEIVER:" margin="normal" size={'small'} error={errors.recipient} helperText={errors?.recipient} />}
              />
              <TextField
                label="CREDIT LIMIT:"
                size={'small'}
                id="weight"
                type="number"
                InputProps={{ endAdornment: <InputAdornment position="start">V.H.</InputAdornment> }}
                onChange={(event) => {
                  setEndorsement({ ...endorsement, weight: event.target.value });
                }}
                value={endorsement?.weight}
                error={errors.weight}
                helperText={errors?.weight}
              />
              <TextField
                id="memo"
                fullWidth
                multiline
                rows={3}
                label="TESTIMONIAL:"
                defaultValue={endorsement.text}
                onChange={(event) => {
                  setEndorsement({ ...endorsement, text: event.target.value });
                }}
              />
              <FormControlLabel
                value="end"
                control={
                  <Switch
                    color="success"
                    onChange={(e) => {
                      setEndorsement({ ...endorsement, referred: e.target.checked })
                    }}
                  />
                }
                label="REFER THIS PERSON'S SERVICES TO FRIENDS?"
                labelPlacement="end"
              />
            </Stack>
          </DialogContent>
          <DialogActions sx={{ pr: 2.5 }}>
            <Button sx={{ color: theme.palette.error.dark }} onClick={onClose} color="secondary">
              Cancel
            </Button>
            <Button variant="contained" size="small" onClick={onSave}>
              Save
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default CreateModal;
