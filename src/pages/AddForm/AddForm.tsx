import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import moment, { Moment } from "moment";
import { database, storage } from '../../firebase/auth';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import firebase from '../../firebase/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


// interface Event {
//     bodyImg?: string,
//     titleImg?: string ,
//     releaseDate?: Date,
//     eventLocations?: Array<String>,
//     eventTitle?: string,
//     eventVariants?: Array<String>,
//     hasNexusEvent?: boolean,
//     isNexusEvent?: boolean,
//     pageTitle?: string,
//     previousEvent?: Date,
//     scenarioText?: string,
//     timelinePoint?: number,

//   }


const marks = [
    {
        value: 1,
        label: 'Phase 1',
    },
    {
        value: 30,
        label: 'Phase 2',
    },
    {
        value: 60,
        label: 'Phase 3',
    },
    {
        value: 90,
        label: 'Phase 4',
    },
];

function valuetext(value: number) {
    return `Phase ${value}`;
}

function valueLabelFormat(value: number) {
    return marks.findIndex((mark) => mark.value === value) + 1;
}

const AddForm = () => {

    const [timelineEvents, setTimelineEvents] = useState<any[]>([]);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [primeEventTitle, setPrimeEventTitle] = useState('');
    const [nexusEventTitle, setNexusEventTitle] = useState('');
    const [primeBodyText, setPrimeBodyText] = useState('');
    const [nexusBodyText, setNexusBodyText] = useState('');
    const [introText, setIntroText] = useState('');
    const [changedText, setChangedText] = useState('');
    const [notableChanges, setNotableChanges] = useState('');
    const [originalText, setOriginalText] = useState('');
    const [scenarioText, setScenarioText] = useState('');
    const [extraText, setExtraText] = useState('');
    const [phaseText, setPhaseText] = useState('');
    const [timelinePoint, setTimelinePoint] = useState('');
    const [eventLocations, setEventLocations] = useState<any[] | null>();

    const [selectedTitleImage, setSelectedTitleImage] = useState<any>(null);
    const [selectedBodyImage, setSelectedBodyImage] = useState<any>(null);
    const [imageURLS, setImageURLS] = useState<any[]>([]);
    const [eventCode, setEventCode] = useState("");

    const [checked, setChecked] = useState(false);

    const [variantValue, setVariantValue] = useState<any[] | null>();

    const [percent, setPercent] = useState(0);

    const [titleImg, setTitleImg] = useState('');
    const [bodyImg, setBodyImg] = useState('');

    // console.log(inputValue);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChecked(event.target.checked);
    };

    const removeTitleImage = (e: any) => {
        // const newFileList = [...selectedFile];
        // newFileList.splice(index, 1);
        e.target.value = null;
        setSelectedTitleImage(null);
    }

    const removeBodyImage = (e: any) => {
        // const newFileList = [...selectedFile];
        // newFileList.splice(index, 1);
        e.target.value = null;
        setSelectedBodyImage(null);
    }

    const [dateValue, setDateValue] = useState<Moment | null>(
        moment(),
    );

    const [sliderValue, setSliderValue] = React.useState<number | string | Array<number | string>>(
        1,
    );

    const handleSliderChange = (event: Event, newValue: number | number[]) => {

        if (newValue === 1) {
            setSliderValue(1);
        }
        if (newValue === 30) {
            setSliderValue(2);
        }
        if (newValue === 60) {
            setSliderValue(3);
        }
        if (newValue === 90) {
            setSliderValue(4);
        }

    };

    const handleDateChange = (newValue: Moment | null) => {
        setDateValue(newValue);
    };

    const handleTitleImageUpload = (e: any) => {
        /* List of files is "array-like" not an actual array
        * So we have to convert to file to an array an add it the array 
        * by destructuring it
        */
        setSelectedTitleImage(e.target.files[0]);

    };

    const handleBodyImageUpload = (e: any) => {
        /* List of files is "array-like" not an actual array
        * So we have to convert to file to an array an add it the array 
        * by destructuring it
        */
        setSelectedBodyImage(e.target.files[0]);

    };

    const codeGenerator = (min: number, max: number) => {

        return Math.floor(Math.random() * (max - min + 1)) + min;

    }


    const uploadImages = async () => {

        const storageTitleRef = ref(storage, `movies/${primeEventTitle}/title_img`);
        const storageBodyRef = ref(storage, `movies/${primeEventTitle}/body_img`);

        const uploadTitleTask = uploadBytesResumable(storageTitleRef, selectedTitleImage);
        const uploadBodyTask = uploadBytesResumable(storageBodyRef, selectedBodyImage);

        uploadTitleTask.on(
            "state_changed",
            (snapshot: any) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);
            },
            (err: any) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTitleTask.snapshot.ref).then((url: any) => {
                    setTitleImg(url);
                });
            }
        );

        uploadBodyTask.on(
            "state_changed",
            (snapshot: any) => {

                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );

                // update progress
                setPercent(percent);

            },
            (err: any) => console.log(err),
            () => {

                // download url
                getDownloadURL(uploadBodyTask.snapshot.ref).then((url: any) => {
                    setBodyImg(url);
                    setSuccessMessage('Images Uploaded Successfully')

                });

            }
        );

        // storage
        //     .ref(`images/${primeEventTitle}/${selectedTitleImage}`)
        //     .put(selectedTitleImage)
        //     .catch(error => alert(error.message));

    }




    const addPrimeEvent = async (e: any) => {

        e.preventDefault();

        setEventCode("4" + codeGenerator(100000000, 9999999999).toString());


        try {

            database
                .collection("timelineEvents")
                .doc()
                .set({

                    phase: sliderValue,
                    hasNexusEvent: checked,
                    isNexusEvent: checked,
                    code: eventCode,
                    primeEventTitle: primeEventTitle,
                    pageTitle: primeEventTitle,
                    eventVariants: variantValue,
                    eventLocations: eventLocations,
                    introText: introText,
                    releaseDate: firebase.firestore.Timestamp.fromDate(moment(dateValue).toDate()),
                    scenarioText: "",
                    timelinePoint: (timelineEvents.slice(-1)[0].timelinePoint) + 100,
                    titleImg: titleImg,
                    bodyImg: bodyImg

                }).then(() => {
                    setSliderValue("");
                    setChecked(false);
                    setPrimeEventTitle("");
                    setVariantValue([]);
                    setEventLocations([]);
                    setIntroText("");
                    setTitleImg("");
                    setBodyImg("");
                    setScenarioText("");
                    setSelectedTitleImage(null);
                    setSelectedBodyImage(null);
                })

        } catch (e) {
            console.log(e)
        }

    };

    const addNexusEvent = async (e: any) => {
        e.preventDefault();

        setEventCode("4" + codeGenerator(100000000, 9999999999).toString());


        try {

            database
                .collection("events")
                .doc()
                .set({

                    phase: sliderValue,
                    hasNexusEvent: checked,
                    code: eventCode,
                    isNexusEvent: checked,
                    eventTitle: primeEventTitle,
                    pageTitle: primeEventTitle,
                    eventVariants: variantValue,
                    eventLocations: eventLocations,
                    introText: introText,
                    releaseDate: firebase.firestore.Timestamp.fromDate(moment(dateValue).toDate()),
                    scenarioText: "",
                    titleImg: titleImg,
                    bodyImg: bodyImg,
                    originalText: originalText,
                    bodyText: nexusBodyText,
                    changedText: changedText,


                }).then(() => {
                    setSliderValue("");
                    setChecked(false);
                    setPrimeEventTitle("");
                    setVariantValue([]);
                    setEventLocations([]);
                    setIntroText("");
                    setTitleImg("");
                    setBodyImg("");
                    setScenarioText("");
                })

        } catch (e) {
            console.log(e)
        }

    };




    useEffect(() => {
        return database.collection('timelineEvents').orderBy('releaseDate', 'asc').onSnapshot((snapshot) => {
            const timelineEventData: any[] = [];
            snapshot.forEach(doc => timelineEventData.push({ ...doc.data(), id: doc.id, name: doc.data().name, phase: doc.data().phase, releaseDate: doc.data().releaseDate }));
            setTimelineEvents(timelineEventData);
        });
    }, []);

    return (

        <Grid container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}>
            <Typography variant="h3" gutterBottom component="div">
                Add New Timeline Event
            </Typography>

            <div className="pastEvents">
                {timelineEvents.map((event, key) => {
                    return (
                        <p key={event.id}> {event.eventTitle} | </p>
                    )
                })}
            </div>

            <LocalizationProvider dateAdapter={AdapterMoment}>
                <DateTimePicker
                    label="Date&Time picker"
                    value={dateValue}
                    onChange={handleDateChange}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

            <TextField id="primeEventTitle" value={primeEventTitle} onChange={e => setPrimeEventTitle(e.target.value)} label="Prime Event Name" variant="standard" margin="dense" fullWidth />

            <Autocomplete
                multiple
                id="eventLocation"
                options={[]}
                defaultValue={[]}
                onChange={(event, newLocationValue) => {
                    setEventLocations(newLocationValue);
                }}
                freeSolo
                renderInput={(params: any) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Event Locations"

                    />
                )}
                fullWidth
            />
            <TextField id="introText" value={introText} onChange={e => setIntroText(e.target.value)} label="Synopsis" variant="standard" margin="dense" fullWidth />

            <Autocomplete
                multiple
                id="variants"
                options={[]}
                defaultValue={[]}
                onChange={(event, newVariantValue) => {
                    setVariantValue(newVariantValue);
                }}
                freeSolo
                renderInput={(params: any) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Variants"

                    />
                )}
                fullWidth
            />


            {/* <TextField id="primeBodyText" value={primeBodyText} onChange={e => setPrimeBodyText(e.target.value)} label="Prime Event Description" variant="standard" margin="dense" fullWidth multiline /> */}

            <Grid item container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3>Title Image</h3>
                {selectedTitleImage ?
                    <Badge badgeContent={<IconButton onClick={(e) => removeTitleImage(e)}> <CloseIcon sx={{ color: 'black', fontSize: 24 }} ></CloseIcon> </IconButton>} >
                        <img src={URL.createObjectURL(selectedTitleImage)} height="200"></img>
                    </Badge>
                    :

                    <></>

                }

                <label htmlFor="icon-button-file">

                    <input accept="image/*" id="icon-button-file" type="file" onChange={handleTitleImageUpload} />

                </label>

            </Grid>
            <Grid item container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h3>Body Image</h3>
                {selectedBodyImage ?
                    <Badge badgeContent={<IconButton onClick={(e) => removeBodyImage(e)}> <CloseIcon sx={{ color: 'black', fontSize: 24 }} ></CloseIcon> </IconButton>} >
                        <img src={URL.createObjectURL(selectedBodyImage)} height="200"></img>
                    </Badge>
                    :

                    <></>

                }

                <label htmlFor="icon-button-file">

                    <input accept="image/*" id="icon-button-file" type="file" onChange={handleBodyImageUpload} />

                </label>

            </Grid>

            <Grid>
                {errorMessage && <div className="fail">{errorMessage}</div>}
                {successMessage ? <div className="success">{successMessage}</div> : <></>}
                <Button variant="outlined" disabled={!selectedTitleImage || !selectedBodyImage} onClick={uploadImages}>Upload Images</Button>
            </Grid>

            <Grid item>
                <Box sx={{ width: 300 }}>
                    <Slider
                        aria-label="Restricted values"
                        defaultValue={1}
                        valueLabelFormat={valueLabelFormat}
                        getAriaValueText={valuetext}
                        onChange={handleSliderChange}
                        step={null}
                        valueLabelDisplay="auto"
                        marks={marks}
                    />
                </Box>
            </Grid>

            <FormGroup>
                <FormControlLabel control={<Checkbox checked={checked}
                    onChange={handleChange}
                    inputProps={{ 'aria-label': 'controlled' }} />} label="Is There a Nexus Event?" />
            </FormGroup>

            {checked ?
                <>
                    <TextField id="nexusEventTitle" value={nexusEventTitle} onChange={e => setNexusEventTitle(e.target.value)} label="Nexus Event Name" variant="standard" margin="dense" fullWidth />
                    <TextField id="nexusBodyText" value={nexusBodyText} onChange={e => setNexusBodyText(e.target.value)} label="Nexus Event Description" variant="standard" margin="dense" fullWidth multiline />
                    <TextField id="scenarioText" value={scenarioText} onChange={e => setScenarioText(e.target.value)} label="Scenario Text" variant="standard" margin="dense" fullWidth />
                    <TextField id="originalText" value={originalText} onChange={e => setOriginalText(e.target.value)} label="Original Text" variant="standard" margin="dense" fullWidth />
                    <TextField id="changedText" value={changedText} onChange={e => setChangedText(e.target.value)} label="Changed Text" variant="standard" margin="dense" fullWidth />
                    <TextField id="changedText" value={notableChanges} onChange={e => setNotableChanges(e.target.value)} label="Notable Changes" variant="standard" margin="dense" fullWidth />
                    <TextField id="changedText" value={extraText} onChange={e => setExtraText(e.target.value)} label="Extra Text" variant="standard" margin="dense" fullWidth />

                </>
                :
                <></>
            }

            <Grid>
                {errorMessage && <div className="fail">{errorMessage}</div>}
                <Button variant="outlined" onClick={addPrimeEvent}>Submit</Button>
            </Grid>

        </Grid>

    );
};

export default AddForm;