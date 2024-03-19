import React from 'react';

// MUI components
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// Styles
import './styles.scss'

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '5px solid #FFFF',
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
};

interface Props {
    open: boolean;
    onSubmit: (value: string) => void;
    handleClose: () => void;
    current: string;
}


const Filters: React.FC<Props> = (props) => {
    const { open, current, onSubmit, handleClose } = props;

    const handleChange = (event: SelectChangeEvent) => {
        onSubmit(event.target.value as string);
        handleClose();
    };

    return (
        <React.Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
            >
                <Box sx={{ ...style }}>
                    <h2 id="child-modal-title" className='heading'>Filters</h2>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Select Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={current}
                            label="Select Gender"
                            onChange={handleChange}
                        >
                            <MenuItem value={'male'}>Male</MenuItem>
                            <MenuItem value={'female'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <Box className="btn-group">
                        <Button onClick={handleClose}>Close</Button>
                    </Box>
                </Box>
            </Modal>
        </React.Fragment>
    );
}

export default Filters;