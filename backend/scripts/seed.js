import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import path from "path";
import dns from "node:dns";
import { fileURLToPath } from "url";
import Activity from "../models/Activity.js";
import User from "../models/User.js";
import Gallery from "../models/Gallery.js";
import activitiesData from "../../frontend/src/activitiesData.js";

// Fix Windows Node DNS SRV lookup issues with MongoDB Atlas
try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch {
  // Ignore if not permitted
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env config from backend/.env
dotenv.config({ path: path.join(__dirname, "..", ".env") });

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/nss_rgukt";
    console.log(`Connecting to MongoDB at: ${mongoUri}`);
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB successfully.");

    // 1. Seed Activities
    console.log(`Found ${activitiesData.length} activities in frontend/src/activitiesData.js`);
    await Activity.deleteMany({});
    console.log("Cleared existing activities.");

    const formattedActivities = activitiesData.map((item) => ({
      activityId: item.id,
      date: item.date,
      title: item.title,
      vertical: item.vertical,
      hours: item.hours,
      objective: item.objective || "",
      impact: item.impact || "",
      images: Array.isArray(item.images) ? item.images : [],
    }));

    const insertedActivities = await Activity.insertMany(formattedActivities);
    console.log(`Successfully seeded ${insertedActivities.length} activities.`);

    // 2. Seed Admin User
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@rgukt.ac.in").toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

    await User.deleteMany({ email: adminEmail });
    console.log(`Cleared existing admin user with email: ${adminEmail}`);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    const adminUser = await User.create({
      name: "NSS Administrator",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    });

    console.log(`Admin user created successfully:`);
    console.log(`  Name:  ${adminUser.name}`);
    console.log(`  Email: ${adminUser.email}`);
    console.log(`  Role:  ${adminUser.role}`);

    // 3. Seed Gallery
    await Gallery.deleteMany({});
    const initialPhotos = [
      {
        title: "NSS Awareness Street Play",
        category: "Social Awareness",
        imagePath: "/IMG-20240211-WA0014.jpg",
        date: "Nov 2024",
        description: "Volunteers presenting street play on community harmony and civic duty",
      },
      {
        title: "Plant Adoption & Tree Plantation",
        category: "Environment & Plantation",
        imagePath: "/IMG-20250504-WA0020.jpg",
        date: "Nov 2024",
        description: "Planting native trees across the campus perimeter",
      },
      {
        title: "Mega Blood Donation Camp",
        category: "Health & Well-being",
        imagePath: "/IMG-20250819-WA0021.jpg",
        date: "Jan 2025",
        description: "Students and faculty donating blood in collaboration with Red Cross",
      },
      {
        title: "Community Outreach & Village Camp",
        category: "Community Service",
        imagePath: "/IMG-20250712-WA0035.jpg",
        date: "Feb 2025",
        description: "Special rural service camp and survey in adopted village",
      },
      {
        title: "National Youth Day Celebration",
        category: "Youth & National",
        imagePath: "/IMG-20250310-WA0010.jpg",
        date: "Jan 2025",
        description: "Youth empowerment convention and leadership seminar",
      },
      {
        title: "Yuva Utsav Cultural & Skill Showcase",
        category: "Youth & National",
        imagePath: "/8KvEfkTu_400x400.jpg",
        date: "Mar 2025",
        description: "Celebration of talent, arts, and volunteer dedication",
      },
      {
        title: "Clean Campus Initiative",
        category: "Environment & Plantation",
        imagePath: "/IMG-20250819-WA0009.jpg",
        date: "Dec 2024",
        description: "Swachh Bharat cleanliness drive across student residential zones",
      },
      {
        title: "Orientation Session for New Recruits",
        category: "Social Awareness",
        imagePath: "/IMG-20250310-WA0018.jpg",
        date: "Nov 2024",
        description: "Welcoming 100+ enthusiastic new volunteers into NSS RGUKT Basar",
      },
    ];

    const insertedPhotos = await Gallery.insertMany(initialPhotos);
    console.log(`Successfully seeded ${insertedPhotos.length} gallery photos.`);

    console.log("\nDatabase seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error during database seeding:", error);
    process.exit(1);
  }
};

seedDatabase();
