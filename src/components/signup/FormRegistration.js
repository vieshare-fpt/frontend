
import { Box, Button, Checkbox, FormControlLabel, Grid, MenuItem, TextField, Typography, Link } from '@mui/material';
import * as yup from 'yup';
import Image from 'next/image'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


export default function FormRegistration({ formik, dob, setDob, handleAvatar, avatar }) {

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2}>
                    <Grid item xs={12} >
                        <TextField
                            autoComplete="given-name"
                            id="fullname"
                            name="fullname"
                            required
                            fullWidth
                            label="Họ và Tên"
                            onChange={formik.handleChange}
                            error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                            helperText={formik.touched.fullname && formik.errors.fullname}
                        />
                    </Grid>
                    <Grid item xs={5} >
                        <TextField
                            label="Giới tính"
                            select
                            fullWidth
                            id="gender"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}

                        >
                            <MenuItem value='female'>Nữ</MenuItem>
                            <MenuItem value='male'>Nam</MenuItem>
                            <MenuItem value='other'>Khác</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={7}  >
                        <DatePicker
                            disableFuture
                            inputFormat='dd/MM/yyyy'
                            label="Ngày sinh"
                            openTo="year"
                            // views={['day', 'month', 'year']}
                            value={dob}
                            onChange={(date) => setDob(date)}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="phone"
                            label="Số điện thoại"
                            name="phone"
                            autoComplete="phone"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            error={formik.touched.phone && Boolean(formik.errors.phone)}
                            helperText={formik.touched.phone && formik.errors.phone}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                            value={formik.values.email}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}

                            onChange={formik.handleChange}

                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="password"
                            label="Mật Khẩu"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formik.values.password}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onChange={formik.handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            name="passwordConfirmation"
                            label="Xác nhận Mật Khẩu"
                            type="password"
                            id="passwordConfirmation"
                            autoComplete="new-password"
                            value={formik.values.passwordConfirmation}
                            error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                            helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                            onChange={formik.handleChange}

                        />
                    </Grid>
                    <Grid item xs={3}>
                        <input
                            style={{ display: 'none' }}
                            id="raised-button-file"
                            type="file"
                            onChange={handleAvatar}
                        />
                        <label htmlFor="raised-button-file">
                            <Button variant="raised" component="span" >
                                Upload
                            </Button>
                        </label>

                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5' sx={{ lineHeight: '35px' }}>Hình đại diện</Typography>
                    </Grid>
                    <Grid item xs={3}>
                        {avatar && (
                            <Image
                                src={avatar.preview} alt={avatar} width="80%"
                            />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                        />
                        Tôi đồng ý với các<Link href="/"> điều khoản</Link> của trang web.
                    </Grid>

                </Grid>
            </LocalizationProvider>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Đăng ký
            </Button>

        </div>
    )
}
