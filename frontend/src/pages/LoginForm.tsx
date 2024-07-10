import React, { useState, MouseEvent, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ToggleButton, ToggleButtonGroup } from "@mui/material/";
import Signin from "../components/Signin";
import Signup from "../components/Signup";

interface LoginFormProps {
    defaultFormType?: 'Signin' | 'SignUp';
}

const LoginForm: React.FC<LoginFormProps> = ({ defaultFormType = 'Signin' }) => {
    const [formType, setFormType] = useState<'Signin' | 'SignUp'>(defaultFormType);

    useEffect(() => {
        setFormType(defaultFormType);
    }, [defaultFormType]);

    const handleFormChange = (event: MouseEvent<HTMLElement>, newFormType: 'Signin' | 'SignUp' | null) => {
        if (newFormType !== null) {
            setFormType(newFormType);
        }
    };

    return (
        <Box sx={{ textAlign: 'center' }}>
            <ToggleButtonGroup
                value={formType}
                onChange={handleFormChange}
                exclusive
                aria-label="Platform"
                sx={{ 
                    '& .MuiToggleButton-root': {
                        fontSize: '20px',
                        width: '227px',
                        backgroundColor: 'blueviolet',
                        color: 'white',
                        '&.Mui-selected': {
                            backgroundColor: '#2575fc',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#47c4fd',
                            }
                        },
                        '&:hover': {
                            backgroundColor: '#c89bf1',
                        }
                    }
                }}
            >
                <ToggleButton value="Signin"><Typography>Sign In</Typography></ToggleButton>
                <ToggleButton value="SignUp"><Typography>Sign Up</Typography></ToggleButton>
            </ToggleButtonGroup>
            {formType === 'Signin' ? <Signin /> : <Signup />}
        </Box>
    );
}

export default LoginForm;
