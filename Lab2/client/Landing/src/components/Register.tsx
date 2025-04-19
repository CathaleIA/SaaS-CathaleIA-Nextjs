// components/Register.tsx
'use client'

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler, Controller} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    Snackbar,
    Alert,
    CircularProgress,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    InputLabel,
} from '@mui/material';
import axios from 'axios';

// Esquema de validación con Zod
const schema = z.object({
    tenantName: z.string().min(1, 'Name is required'),
    tenantEmail: z.string().email('Invalid email').min(1, 'Email is required'),
    tenantTier: z.enum(['Basic', 'Standard', 'Premium', 'Platinum']),
    tenantPhone: z.string().optional(),
    tenantAddress: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Register() {

    const router = useRouter();

    const [submitting, setSubmitting] = useState(false);
    const [snackbar, setSnackbar] = useState<{
        open: boolean;
        message: string;
        severity: 'success' | 'error';
    }>({ open: false, message: '', severity: 'success' });

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            tenantName: '',
            tenantEmail: '',
            tenantTier: '' as FormValues['tenantTier'],
            tenantPhone: '',
            tenantAddress: '',
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        setSubmitting(true);
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_API_GATEWAY_URL}/registration`,
                data
            );

            setSnackbar({
                open: true,
                message: 'Successfully created new tenant!',
                severity: 'success',
            });
            reset();
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'An unexpected error occurred!',
                severity: 'error',
            });
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    return (
        <Card sx={{ maxWidth: 500, margin: 'auto', mt: 4 }}>
            <CardHeader
                title="Provision a new Tenant"
                subheader="Login details will be sent to the email provided."
            />
            <CardContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Name"
                            variant="outlined"
                            error={!!errors.tenantName}
                            helperText={errors.tenantName?.message}
                            {...control.register('tenantName')}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            error={!!errors.tenantEmail}
                            helperText={errors.tenantEmail?.message}
                            {...control.register('tenantEmail')}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Phone"
                            variant="outlined"
                            {...control.register('tenantPhone')}
                        />
                    </FormControl>

                    <FormControl fullWidth margin="normal">
                        <TextField
                            label="Address"
                            variant="outlined"
                            {...control.register('tenantAddress')}
                        />
                    </FormControl>

                    <Controller
                        name="tenantTier"
                        control={control}
                        defaultValue="Basic" // <-- Valor inicial
                        render={({ field }) => (
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Plan</InputLabel>
                                <Select
                                    {...field}
                                    label="Plan"
                                    error={!!errors.tenantTier}
                                >
                                    <MenuItem value="Basic">Basic</MenuItem>
                                    <MenuItem value="Standard">Standard</MenuItem>
                                    <MenuItem value="Premium">Premium</MenuItem>
                                    <MenuItem value="Platinum">Platinum</MenuItem>
                                </Select>
                            </FormControl>
                        )}
                    />

                    <div style={{ marginTop: 20, display: 'flex', gap: 16 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={submitting}
                        >
                            {submitting ? <CircularProgress size={24} /> : 'Submit'}
                        </Button>
                        <Button variant="outlined" color="error" onClick={() => router.push('/')}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </CardContent>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={1500}
                onClose={handleCloseSnackbar}
                slotProps={{
                    transition: { 
                        onExited: () => {
                            if (snackbar.severity === 'success') {
                                window.location.href = "https://tu-pagina-externa.com";
                            }
                        }
                    }
                }}
                anchorOrigin={{ // Posicionamiento del mensaje
                    vertical: 'top', 
                    horizontal: 'center'
                }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Card>
    );
}