import { 
    Button, 
    Dialog, 
    IconButton,
    TextField,
    DialogActions,
    DialogContent,
    DialogTitle } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit'; 
import * as yup from 'yup';
import { useFormik } from 'formik';

const validationSchema = yup.object({ 
    name: yup.string() 
        .min(2, 'Too Short!') 
        .max(50, 'Too Long!') 
        .required('Required'), 
    type: yup.string() 
        .min(2, 'Too Short!') 
        .max(50, 'Too Long!') 
        .required('Required'), 
    brand: yup.string() 
        .min(2, 'Too Short!') 
        .max(50, 'Too Long!') 
        .required('Required'), 
    date_bought: yup.string() 
        .min(2, 'Too Short!') 
        .max(50, 'Too Long!') 
        .required('Required'),  
});

function Update({row, UpdateGuitar}) {
    const [open, setOpen] = React.useState(false); 
    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
        formik.resetForm()
        setOpen(false);
    };

    const onSubmit = (values)=>{ 
        UpdateGuitar(values, row.id) 
    }
    const formik = useFormik( 
        {
            initialValues: {  
                name: row.name,
                type: row.type,
                brand: row.brand,
                date_bought: row.date_bought
            },
            validateOnBlur:true,
            onSubmit,
            validationSchema: validationSchema
        });
  return (
    <>
    <IconButton color="primary" aria-label="upload picture" component="span" onClick={handleClickOpen}>
        <EditIcon color='action' />
    </IconButton>
    <Dialog open={open} onClose={handleClose}>
    <DialogTitle>Update</DialogTitle>
    <form onSubmit={formik.handleSubmit}>
        <DialogContent> 
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Name" 
                name="name"
                fullWidth
                variant="standard"
                style={{width: '100%'}}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
            />
            <span>
                {formik.touched.name &&  formik.errors.name ? formik.errors.name:""}
            </span>
            <TextField
                autoFocus
                margin="dense"
                id="type"
                label="Type" 
                name="type"
                fullWidth
                variant="standard"
                style={{width: '100%'}}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.type}
            />
            <span>
                {formik.touched.type &&  formik.errors.type ? formik.errors.type:""}
            </span>
            <TextField
                autoFocus
                margin="dense"
                id="brand"
                label="Brand"
                type="brand"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
                fullWidth
                variant="standard"
                style={{width: '100%'}}
            />
            <span>
                {formik.touched.brand &&  formik.errors.brand ? formik.errors.brand:""}
            </span>
            <TextField
                autoFocus
                margin="dense"
                id="date_bought" 
                type="date"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.date_bought}
                variant="standard"
                style={{width: '100%'}}
            />
            <span>
                {formik.touched.date_bought &&  formik.errors.date_bought ? formik.errors.date_bought:""}
            </span> 
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button  type='submit'>Register</Button>
        </DialogActions>
    </form>
    </Dialog>
    </>
  )
}

export default Update