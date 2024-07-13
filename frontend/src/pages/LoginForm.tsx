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

    const handleFormChange = (_event: MouseEvent<HTMLElement>, newFormType: 'Signin' | 'SignUp' | null) => {
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
                        fontSize: '16px',
                        width: '120px',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Slight transparency for better background adaptation
                        color: '#333', // Neutral text color
                        borderRadius: '8px', // Rounded corners for a modern look
                        '&.Mui-selected': {
                            backgroundColor: 'rgba(37, 117, 252, 0.8)', // Light blue with slight transparency
                            color: 'white',
                            '&:hover': {
                                backgroundColor: 'rgba(71, 196, 253, 0.8)', // Brighter blue on hover
                            }
                        },
                        '&:hover': {
                            backgroundColor: 'rgba(200, 155, 241, 0.8)', // Light purple on hover
                        }
                    },
                    '& .MuiToggleButtonGroup-grouped:not(:last-of-type)': {
                        marginRight: '8px',
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
