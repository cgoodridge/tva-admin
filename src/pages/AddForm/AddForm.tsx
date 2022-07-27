import React, { useState } from "react";
import TextField from '@mui/material/TextField';
import { Badge, Box, Grid, IconButton, Paper } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { styled } from '@mui/material/styles';
import { storage, database } from "../../firebase/auth";
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

const AddForm = () => {

    const [errorMessage, setErrorMessage] = useState('');

    const [eventDateTime, setEventDateTime] = useState<Date | null>(new Date());
    const [eventTime, setEventTime] = useState('');
    const [eventTitle, setEventTitle] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [introText, setIntroText] = useState('');
    const [changedText, setChangedText] = useState('');
    const [notableChanges, setNotableChanges] = useState('');
    const [originalText, setOriginalText] = useState('');
    const [scenarioText, setScenarioText] = useState('');
    const [extraText, setExtraText] = useState('');
    const [eventLocation, setEventLocation] = useState('');

    /// Code for uploading gallery images
    const Input = styled('input')({
        display: 'none',
    });


    const promises: any[] = [];

    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [imageURLS, setImageURLS] = useState<any[]>([]);
    const [locationData, setLocationData] = useState<any[]>([]);
    const [newImageURLS, setNewImageURLS] = useState<any[]>([]);
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [openConfirmMessage, setOpenConfirmMessage] = useState(false);
    const [loading, setLoading] = useState(false);

    /// Start Image upload Code

    const handleFileUpload = (e: any) => {
        /* List of files is "array-like" not an actual array
        * So we have to convert to file to an array an add it the array 
        * by destructuring it
        */
        setSelectedFiles(selectedFiles => [...selectedFiles, ...e.target.files]);

    };

    const removeImage = (index: number) => {
        const newFileList = [...selectedFiles];
        newFileList.splice(index, 1);
        setSelectedFiles(newFileList);
    }

    const uploadImages = async () => {
        await Promise.all(
            selectedFiles.map(file => {
                promises.push(storage
                    .ref(`images/${file?.name}`)
                    .put(file)
                    .catch(error => alert(error.message)));
            })
        )
    }

    const getImageURLS = async () => {
        await Promise.all(promises)
            .then(result => {
                storage
                    .ref(`images/`)
                    .listAll()
                    .then((urls) => {
                        urls.items.forEach((image) => {
                            image.getDownloadURL()
                                .then(async (url) => {
                                    let newURL = url;
                                    // console.log("Image URL is " + url);
                                    setImageURLS((imageURLS) => [...imageURLS, newURL]);
                                    // dispatch(saveImageURLS(newURL));
                                })
                        })

                    })
                    .then(async () => {
                        setLoading(false);
                    })
            })
            .catch(error => alert("Promise rejected"))
    }



    const addNexusEvent = async () => {
        const result = await fetch(`/api/nexus-events/add-event`,
            {
                method: 'post',
                body: JSON.stringify({ eventDateTime, introText, changedText, notableChanges, originalText, scenarioText, extraText, eventLocation, bodyText, eventTitle }),
                headers: {
                    'Content-Type': 'application/json',
                }

            });

        const body = await result.json();

        setEventDateTime(null);
        setEventTitle('');
        setBodyText('');
        setIntroText('');
        setChangedText('');
        setNotableChanges('');
        setOriginalText('');
        setScenarioText('');
        setExtraText('');
        setEventLocation('');

    };

    const addTimelineEvent = async () => {
        const result = await fetch(`/api/nexus-events/add-event`,
            {
                method: 'post',
                body: JSON.stringify({ eventDateTime, introText, changedText, notableChanges, originalText, scenarioText, extraText, eventLocation, bodyText, eventTitle }),
                headers: {
                    'Content-Type': 'application/json',
                }

            });

        const body = await result.json();

        setEventDateTime(null);
        setEventTitle('');
        setBodyText('');
        setIntroText('');
        setChangedText('');
        setNotableChanges('');
        setOriginalText('');
        setScenarioText('');
        setExtraText('');
        setEventLocation('');

    };

    return (

        <Grid container alignItems="center" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h3" gutterBottom component="div">
                Add New Nexus Event
            </Typography>
            <Grid item>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="DateTimePicker"
                        value={eventDateTime}
                        onChange={(e) => {
                            setEventDateTime(e);
                        }}
                    />
                </LocalizationProvider>
            </Grid>

            <Box sx={{ width: "100%", overflowX: "scroll" }}>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    {selectedFiles.length <= 0 ? <Box></Box>

                        :

                        selectedFiles.map((file, key) => (
                            <Grid item xs={4} key={key}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        '& > :not(style)': {
                                            m: 1,
                                            width: 128,
                                            height: 128,
                                        },
                                        padding: '16px'
                                    }}
                                >
                                    <Badge badgeContent={<IconButton onClick={() => removeImage(key)}> <CloseIcon sx={{ color: 'black', fontSize: 24 }} >Test</CloseIcon> </IconButton>} >
                                        <Paper className="imgTile" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', }} elevation={2}>
                                            <img src={URL.createObjectURL(file)} ></img>
                                        </Paper>
                                    </Badge>
                                </Box>
                            </Grid>
                        ))

                    }

                    <Grid item xs={4}>
                        <label htmlFor="icon-button-file">
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    '& > :not(style)': {
                                        m: 1,
                                        width: 128,
                                        height: 128,
                                    },
                                    padding: '16px'
                                }}
                            >
                                <Input multiple accept="image/*" id="icon-button-file" type="file" onChange={handleFileUpload} />
                                <Paper sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', }} elevation={2}>
                                    <AddIcon className="iconColour" sx={{ fontSize: 70 }} />
                                </Paper>
                            </Box>
                        </label>
                    </Grid>
                </Grid>
            </Box>
            <Grid item>
                <TextField id="eventTitle" value={eventTitle} onChange={e => setEventTitle(e.target.value)} label="Event Title" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="eventLocation" value={eventLocation} onChange={e => setEventLocation(e.target.value)} label="Event Location" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="introText" value={introText} onChange={e => setIntroText(e.target.value)} label="Intro Text" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="bodyText" value={bodyText} onChange={e => setBodyText(e.target.value)} label="Body Text" variant="standard" type="textarea" multiline margin="dense" />
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
            <Grid item>
                <TextField id="changedText" value={notableChanges} onChange={e => setNotableChanges(e.target.value)} label="Notable Changes" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="changedText" value={extraText} onChange={e => setExtraText(e.target.value)} label="Extra Text" variant="standard" margin="dense" />
            </Grid>

            <Grid>
                {errorMessage && <div className="fail">{errorMessage}</div>}
                <Button variant="outlined" disabled={!eventDateTime || !eventLocation} onClick={addNexusEvent}>Submit</Button>
            </Grid>
        </Grid>

    );
};

export default AddForm;