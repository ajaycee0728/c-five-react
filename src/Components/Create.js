import { Button, Dialog } from '@mui/material'
import React from 'react'
import TextField from '@mui/material/TextField'; 
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent'; 
import DialogTitle from '@mui/material/DialogTitle';
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
function Create({RegisterGuitar}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
        formik.resetForm()
        setOpen(false);
    };

    const onSubmit = (values)=>{
        RegisterGuitar(values)
    }

    const formik = useFormik( 
    {
        initialValues: {  
        },
        validateOnBlur:true,
        onSubmit,
        validationSchema: validationSchema
    });
    
    return ( 
        <>
            <Button variant="outlined" color="success" onClick={handleClickOpen}>
                Register
            </Button>  
            <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Register</DialogTitle>
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

export default Create