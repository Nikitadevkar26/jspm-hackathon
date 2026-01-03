const axios = require('axios');

const BASE_URL = 'http://localhost:5001';
const ADMIN_EMAIL = 'admin@test.com';
const ADMIN_PASSWORD = 'password123';

const runTests = async () => {
    try {
        console.log('--- Starting Endpoint Verification ---');

        // 1. Health Check
        try {
            const health = await axios.get(`${BASE_URL}/`);
            console.log('✅ Health Check Passed:', health.data.message);
        } catch (err) {
            console.error('❌ Health Check Failed:', err.message);
        }

        // 2. Try to access protected route WITHOUT token
        try {
            await axios.get(`${BASE_URL}/api/admin/all`);
            console.error('❌ Protected Route Test Failed: Should have been rejected');
        } catch (err) {
            if (err.response && err.response.status === 401) {
                console.log('✅ Protected Route Check Passed: Access denied without token');
            } else {
                console.error('❌ Protected Route Check Failed:', err.message);
            }
        }

        // 3. Admin Login
        let token;
        try {
            const login = await axios.post(`${BASE_URL}/api/admin/login`, {
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD
            });

            if (login.data.success && login.data.token) {
                token = login.data.token;
                console.log('✅ Admin Login Passed: Token received');
            } else {
                console.error('❌ Admin Login Failed: No token received');
                return;
            }
        } catch (err) {
            console.error('❌ Admin Login Failed:', err.response ? err.response.data : err.message);
            return;
        }

        // 4. Try to access protected route WITH token
        try {
            const protectedRes = await axios.get(`${BASE_URL}/api/admin/all`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log('✅ Protected Route Access Passed: Data received with token');
            console.log('   Admins found:', protectedRes.data.admins.length);
        } catch (err) {
            console.error('❌ Protected Route Access Failed with Token:', err.message);
        }

    } catch (err) {
        console.error('Unexpected error:', err);
    }
};

runTests();
