import bcrypt from "bcryptjs";
import activitiesData from "../../frontend/src/activitiesData.js";

// Password hashes for default demo accounts
// "admin123" -> hashed
const ADMIN_HASH = bcrypt.hashSync("admin123", 10);
// "volunteer123" -> hashed
const VOLUNTEER_HASH = bcrypt.hashSync("volunteer123", 10);

class MemoryStore {
  constructor() {
    this.adminUser = {
      _id: "66f000000000000000000001",
      name: "NSS Administrator",
      email: "admin@rgukt.ac.in",
      password: ADMIN_HASH,
      role: "admin",
      createdAt: new Date("2024-01-01"),
    };

    this.activities = activitiesData.map((item) => ({
      _id: `act_${item.id}`,
      activityId: item.id,
      date: item.date,
      title: item.title,
      vertical: item.vertical,
      hours: item.hours,
      objective: item.objective || "",
      impact: item.impact || "",
      images: Array.isArray(item.images) ? item.images : [],
      createdAt: new Date("2024-01-01"),
    }));

    this.photos = [
      {
        _id: "gal_1",
        title: "NSS Awareness Street Play",
        category: "Social Awareness",
        imagePath: "/IMG-20240211-WA0014.jpg",
        date: "Nov 2024",
        description: "Volunteers presenting street play on community harmony and civic duty",
        createdAt: new Date("2024-11-20"),
      },
      {
        _id: "gal_2",
        title: "Plant Adoption & Tree Plantation",
        category: "Environment & Plantation",
        imagePath: "/IMG-20250504-WA0020.jpg",
        date: "Nov 2024",
        description: "Planting native trees across the campus perimeter",
        createdAt: new Date("2024-11-22"),
      },
      {
        _id: "gal_3",
        title: "Mega Blood Donation Camp",
        category: "Health & Well-being",
        imagePath: "/IMG-20250819-WA0021.jpg",
        date: "Jan 2025",
        description: "Students and faculty donating blood in collaboration with Red Cross",
        createdAt: new Date("2025-01-10"),
      },
      {
        _id: "gal_4",
        title: "Community Outreach & Village Camp",
        category: "Community Service",
        imagePath: "/IMG-20250912-WA0017.jpg",
        date: "Feb 2025",
        description: "Rural awareness drive and survey on education and sanitation",
        createdAt: new Date("2025-02-14"),
      },
      {
        _id: "gal_5",
        title: "Clean Campus Initiative",
        category: "Campus Drives",
        imagePath: "/IMG-20250819-WA0002.jpg",
        date: "Feb 2025",
        description: "Zero-waste drive and plastic-free campus promotion",
        createdAt: new Date("2025-02-28"),
      },
      {
        _id: "gal_6",
        title: "Independence Day Celebrations",
        category: "National Celebrations",
        imagePath: "/IMG-20250310-WA0010.jpg",
        date: "Aug 2024",
        description: "Flag hoisting ceremony and patriotic cultural performances",
        createdAt: new Date("2024-08-15"),
      },
      {
        _id: "gal_7",
        title: "Yoga & Wellness Session",
        category: "Health & Well-being",
        imagePath: "/IMG-20250712-WA0035.jpg",
        date: "Jun 2024",
        description: "International Yoga Day mass yoga session on university grounds",
        createdAt: new Date("2024-06-21"),
      },
      {
        _id: "gal_8",
        title: "Road Safety Rally",
        category: "Social Awareness",
        imagePath: "/IMG-20250819-WA0009.jpg",
        date: "Mar 2025",
        description: "Helmet awareness and traffic rules educational rally",
        createdAt: new Date("2025-03-05"),
      },
    ];

    this.volunteers = [
      {
        _id: "66f000000000000000000002",
        name: "K. Sai Prasanth",
        rollNumber: "B210123",
        branch: "Computer Science & Engineering",
        year: "E3",
        phone: "9876543210",
        email: "b210123@rgukt.ac.in",
        unit: "Unit 1",
        serviceHours: 48,
        status: "Active",
        role: "volunteer",
        password: VOLUNTEER_HASH,
        createdAt: new Date("2024-07-01"),
      },
    ];

    this.contacts = [];
  }

  // Admin
  getAdminByEmail(email) {
    if (this.adminUser.email.toLowerCase() === email.toLowerCase()) {
      return this.adminUser;
    }
    return null;
  }

  getAdminById(id) {
    if (this.adminUser._id === id || String(id) === "66f000000000000000000001") {
      return this.adminUser;
    }
    return null;
  }

  // Activities
  getActivities() {
    return [...this.activities].sort((a, b) => a.activityId - b.activityId);
  }

  getActivity(id) {
    return (
      this.activities.find((a) => a._id === id || String(a.activityId) === String(id)) || null
    );
  }

  createActivity(data) {
    const highestId = this.activities.reduce((max, a) => Math.max(max, a.activityId || 0), 0);
    const newActivity = {
      _id: `act_${Date.now()}`,
      activityId: data.activityId || highestId + 1,
      date: data.date,
      title: data.title,
      vertical: data.vertical,
      hours: Number(data.hours),
      objective: data.objective || "",
      impact: data.impact || "",
      images: Array.isArray(data.images) ? data.images : [],
      createdAt: new Date(),
    };
    this.activities.push(newActivity);
    return newActivity;
  }

  updateActivity(id, data) {
    const act = this.getActivity(id);
    if (!act) return null;
    if (data.date !== undefined) act.date = data.date;
    if (data.title !== undefined) act.title = data.title;
    if (data.vertical !== undefined) act.vertical = data.vertical;
    if (data.hours !== undefined) act.hours = Number(data.hours);
    if (data.objective !== undefined) act.objective = data.objective;
    if (data.impact !== undefined) act.impact = data.impact;
    if (data.images !== undefined) act.images = data.images;
    return act;
  }

  deleteActivity(id) {
    const index = this.activities.findIndex(
      (a) => a._id === id || String(a.activityId) === String(id)
    );
    if (index === -1) return false;
    this.activities.splice(index, 1);
    return true;
  }

  // Gallery
  getPhotos() {
    return [...this.photos].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createPhoto(data) {
    const newPhoto = {
      _id: `gal_${Date.now()}`,
      title: data.title,
      category: data.category || "General",
      imagePath: data.imagePath,
      date: data.date || "",
      description: data.description || "",
      createdAt: new Date(),
    };
    this.photos.unshift(newPhoto);
    return newPhoto;
  }

  deletePhoto(id) {
    const index = this.photos.findIndex((p) => p._id === id);
    if (index === -1) return false;
    this.photos.splice(index, 1);
    return true;
  }

  // Volunteers
  findVolunteer(query) {
    return (
      this.volunteers.find((v) => {
        if (query.email && v.email.toLowerCase() === query.email.toLowerCase()) return true;
        if (query.rollNumber && v.rollNumber.toUpperCase() === query.rollNumber.toUpperCase())
          return true;
        if (query._id && (v._id === query._id || String(v._id) === String(query._id))) return true;
        return false;
      }) || null
    );
  }

  getVolunteers() {
    return this.volunteers.map(({ password, ...rest }) => rest);
  }

  createVolunteer(data) {
    const newVol = {
      _id: `vol_${Date.now()}`,
      name: data.name,
      rollNumber: data.rollNumber.toUpperCase(),
      branch: data.branch,
      year: data.year,
      phone: data.phone,
      email: data.email.toLowerCase(),
      unit: data.unit || "Any",
      message: data.message || "",
      password: data.password,
      serviceHours: 12,
      status: "Active",
      role: "volunteer",
      createdAt: new Date(),
    };
    this.volunteers.unshift(newVol);
    return newVol;
  }

  deleteVolunteer(id) {
    const index = this.volunteers.findIndex((v) => v._id === id);
    if (index === -1) return false;
    this.volunteers.splice(index, 1);
    return true;
  }

  // Contacts
  getContacts() {
    return [...this.contacts].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  createContact(data) {
    const newMsg = {
      _id: `contact_${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      subject: data.subject,
      message: data.message,
      createdAt: new Date(),
    };
    this.contacts.unshift(newMsg);
    return newMsg;
  }
}

export const memoryStore = new MemoryStore();
