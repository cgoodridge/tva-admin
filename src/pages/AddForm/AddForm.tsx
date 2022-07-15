import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const AddForm = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [introText, setIntroText] = useState('');
    const [changedText, setChangedText] = useState('');
    const [notableChanges, setNotableChanges] = useState([]);
    const [originalText, setOriginalText] = useState('');
    const [scenarioText, setScenarioText] = useState('');
    const [extraText, setExtraText] = useState('');
    const [eventLocation, setEventLocation] = useState('');

    const addNexusEvent = async () => {
        const result = await fetch(`/api/nexus-events/${eventTitle}/add-event`,
            {
                method: 'post',
                body: JSON.stringify({bodyText, eventTitle}),
                headers: {
                    'Content-Type': 'application/json',
                }
                
            });
    };

    return (

        <Grid container alignItems="center" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h3" gutterBottom component="div">
                Add New Nexus Event
            </Typography>
            <Grid item>
                <TextField id="eventDate" value={eventDate} onChange={e => setEventDate(e.target.value)} label="Event Date" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="eventTime" value={eventTime} onChange={e => setEventTime(e.target.value)} label="Event Time" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="eventLocation" value={eventLocation} onChange={e => setEventLocation(e.target.value)} label="Event Location" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="eventTitle" value={eventTitle} onChange={e => setEventTitle(e.target.value)} label="Event Title" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="introText" value={introText} onChange={e => setIntroText(e.target.value)} label="Intro Text" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="bodyText" value={bodyText} onChange={e => setBodyText(e.target.value)} label="Body Text" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="scenarioText" value={scenarioText} onChange={e => setScenarioText(e.target.value)} label="Scenario Text" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="originalText" value={originalText} onChange={e => setOriginalText(e.target.value)} label="Original Text" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="changedText" value={changedText} onChange={e => setChangedText(e.target.value)} label="Changed Text" variant="standard" margin="dense" />
            </Grid>

            <Grid>
                {errorMessage && <div className="fail">{errorMessage}</div>}
                <Button variant="outlined" disabled={!eventDate || !eventTime || !eventLocation} onClick={addNexusEvent}>Submit</Button>
            </Grid>
        </Grid>

    );
};

export default AddForm;