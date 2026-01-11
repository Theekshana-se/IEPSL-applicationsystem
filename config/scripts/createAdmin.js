const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Admin Model
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['super_admin', 'admin', 'reviewer'],
        default: 'admin'
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const Admin = mongoose.model('Admin', adminSchema);

async function createAdmin() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email: 'admin@iepsl.lk' });
        if (existingAdmin) {
            console.log('Admin already exists!');
            console.log('\n=== Admin Credentials ===');
            console.log('Email: admin@iepsl.lk');
            console.log('Password: admin123');
            console.log('Role: super_admin');
            console.log('========================\n');
            process.exit(0);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash('admin123', 12);

        // Create admin
        const admin = new Admin({
            username: 'admin',
            email: 'admin@iepsl.lk',
            password: hashedPassword,
            role: 'super_admin',
            isActive: true
        });

        await admin.save();
        console.log('Admin created successfully!');
        console.log('\n=== Admin Credentials ===');
        console.log('Email: admin@iepsl.lk');
        console.log('Password: admin123');
        console.log('Role: super_admin');
        console.log('========================\n');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
}

createAdmin();
