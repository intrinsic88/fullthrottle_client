import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container, TableHead, Table, TableRow, TableBody, TableCell, Modal, Fade, Backdrop, TextField, Grid, Card, CardContent, Typography } from '@material-ui/core';
import Axios from 'axios';
import GraphComponent from '../chart/chart.component';
import moment from 'moment';


const useStyles = makeStyles((theme) => ({
    top_margin:{marginTop:'2%'},
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

const columns = [
    { title: "Name", field: "name" },
    { title: "Time Zone ", field: "time_zone" }
]

const graphData = {
    start_date: moment().format('YYYY/MM/DD'),
    end_date: moment().format('YYYY/MM/DD'),
    data: [
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 3, y: 0 },
        { x: 4, y: 0 },
        { x: 5, y: 0 },
        { x: 6, y: 0 },
        { x: 7, y: 0 },
        { x: 8, y: 0 },
        { x: 9, y: 0 },
        { x: 10, y: 0 },
        { x: 11, y: 0 },
        { x: 12, y: 0 },
        { x: 13, y: 0 },
        { x: 14, y: 0 },
        { x: 15, y: 0 },
        { x: 16, y: 0 },
        { x: 17, y: 0 },
        { x: 18, y: 0 },
        { x: 20, y: 0 },
        { x: 21, y: 0 },
        { x: 22, y: 0 },
        { x: 23, y: 0 },
        { x: 24, y: 0 },
    ]
}


const UserTable = () => {
    const classes = useStyles();
    const [rows, setrows] = useState([]);
    const [open, setOpen] = useState(false);
    const [userData, setUserData] = useState(graphData);
    const [allData, setallData] = useState([]);
    const [selectedDate, setSeletectedDate] = useState(moment().format('YYYY/MM/DD'));

    const getUsers = () => {
        Axios({
            method: 'GET',
            url: "/api/users"
        })
            .then((response) => {
                setrows(response.data)
            })
    }

    const checkforSelectData = () => {
        let valset = false; 
        allData.map((element) => {
            const start_date = moment(element.start_date).utc().format('YYYY-MM-DD');
            if (selectedDate == start_date){
                setUserData(element);
                valset = true;
                return; 
            }
        })

        if(!valset)
            setUserData(graphData)
    }

    const getUserData = (id) => {
        Axios({
            method: 'GET',
            url: '/api/users/' + id,
        })
            .then((res) => {
                setallData(res.data);
            }
            ).then(() => {
                checkforSelectData();
            })
    }

    const dateChangeHandler = (e) => {
        setSeletectedDate(e.target.value);
    }

    const rowclickHandler = (id) => {
        getUserData(id)
        handleOpen()
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        getUsers()
        return () => {
            setrows([]);
        };
    }, []);

    useEffect(() => {
        checkforSelectData()
        console.log("inside")
    }, [selectedDate])

    return (
        <Container className={classes.top_margin}>
            <Grid container>
                <Grid item xs={12}>
                    <Card>

                        <CardContent>
                        <Typography align='left'>User Details</Typography>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {
                                            columns.map((value, index) => (
                                                <TableCell key={index}>
                                                    {value.title}
                                                </TableCell>
                                            ))
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        rows.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell component='td' scopr='row' onClick={() => rowclickHandler(row.id)}>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell component='td' scopr='row'>
                                                    {row.timezone}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }

                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Grid container align='right'>
                            <Grid item xs={12}>
                                <form className={classes.container} noValidate>
                                    <TextField
                                        id="date"
                                        label="Active Date"
                                        type="date"
                                        defaultValue={selectedDate}
                                        onChange={dateChangeHandler}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </form>
                            </Grid>
                            <Grid item xs={12}>
                                <GraphComponent {...userData} />
                            </Grid>
                        </Grid>
                    </div>
                </Fade>
            </Modal>

        </Container>
    )

};

export default UserTable;