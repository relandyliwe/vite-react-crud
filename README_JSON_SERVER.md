# AI Planner - JSON Server Setup

## Instalasi

Semua dependencies sudah terinstall. Untuk menjalankan aplikasi:

## Menjalankan Aplikasi

### 1. Jalankan JSON Server (Terminal 1)
```bash
npx json-server db.json --port 3001
```

JSON Server akan berjalan di `http://localhost:3001`

### 2. Jalankan Aplikasi React (Terminal 2)
```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:8080`

## API Endpoints

JSON Server menyediakan REST API lengkap:

### Users
- `GET /users` - Mendapatkan semua users
- `GET /users/:id` - Mendapatkan user berdasarkan ID
- `POST /users` - Menambah user baru
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Hapus user

### Schedules
- `GET /schedules` - Mendapatkan semua schedules
- `GET /schedules/:id` - Mendapatkan schedule berdasarkan ID
- `GET /schedules?userId=1` - Mendapatkan schedules berdasarkan user
- `POST /schedules` - Menambah schedule baru
- `PUT /schedules/:id` - Update schedule
- `DELETE /schedules/:id` - Hapus schedule

### Reminders
- `GET /reminders` - Mendapatkan semua reminders
- `GET /reminders/:id` - Mendapatkan reminder berdasarkan ID
- `GET /reminders?userId=1` - Mendapatkan reminders berdasarkan user
- `POST /reminders` - Menambah reminder baru
- `PUT /reminders/:id` - Update reminder
- `DELETE /reminders/:id` - Hapus reminder

### Chats
- `GET /chats` - Mendapatkan semua chats
- `POST /chats` - Menambah chat baru
- `DELETE /chats/:id` - Hapus chat

## Login Credentials

Username: `brayen`
Password: `password123`

## Fitur Aplikasi

✅ **Authentication** - Login & Register dengan validasi
✅ **Dashboard** - Overview jadwal dan statistik
✅ **Schedule Management** - CRUD lengkap untuk jadwal
✅ **Profile Management** - Edit profil user
✅ **Search & Filter** - Cari dan filter jadwal
✅ **Status Management** - Update status jadwal (Pending, Ongoing, Completed)
✅ **Priority Levels** - Low, Medium, High priority
✅ **Responsive Design** - Mobile-friendly UI

## Struktur Data

### User Object
```json
{
  "id": 1,
  "username": "brayen",
  "email": "brayen@gmail.com",
  "password": "password123",
  "fullName": "Brayen",
  "phone": "23124144123213",
  "gender": "Laki-laki",
  "birthDate": "1995-05-15",
  "isPremium": true,
  "isActive": true,
  "joinedDate": "2025-11-01"
}
```

### Schedule Object
```json
{
  "id": 1,
  "userId": 1,
  "title": "Belajar Menggambar",
  "description": "",
  "date": "2025-11-24",
  "startTime": "08:00",
  "endTime": "09:00",
  "location": "Unklab",
  "priority": "low",
  "status": "ongoing",
  "createdAt": "2025-11-20T10:00:00Z"
}
```

## Catatan Penting

- JSON Server secara otomatis menyimpan perubahan ke file `db.json`
- Setiap kali menambah data baru, ID akan auto-increment
- Data persisten selama file `db.json` tidak dihapus
- Gunakan dua terminal terpisah untuk menjalankan JSON Server dan React app
