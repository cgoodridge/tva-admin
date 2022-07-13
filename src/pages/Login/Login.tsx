import { useState } from "react";
import { Grid } from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onLoginClicked = async () => {
        alert('Login not ready yet');
    };

    return (

        <Grid container alignItems="center" sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h3" gutterBottom component="div">
                TVA Admin Console
            </Typography>
            <Grid item>
                <TextField id="email" value={email} onChange={e => setEmail(e.target.value)} label="Username" variant="standard" margin="dense" />
            </Grid>
            <Grid item>
                <TextField id="password" value={password} onChange={e => setPassword(e.target.value)} label="Password" type="password" variant="standard" margin="dense" />
            </Grid>
            <Grid>
                {errorMessage && <div className="fail">{errorMessage}</div>}
                <Button variant="outlined" disabled={!email || !password} onClick={onLoginClicked}>Login</Button>
            </Grid>
        </Grid>

    );
}

export default Login;