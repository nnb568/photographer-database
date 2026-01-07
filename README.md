# 📸 Photographer Client Database

A simple, elegant web application for photographers to manage their client database. Built with vanilla HTML, CSS, and JavaScript, it runs entirely in the browser with no server required.

## ✨ Features

- **Client Management**: Add, edit, and delete client records
- **Smart Search**: Search clients by name, email, phone, or session type
- **Session Tracking**: Track session dates, types, and status
- **Local Storage**: All data is stored locally in your browser
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **No Backend Required**: Pure client-side application, perfect for GitHub Pages

## 🚀 Live Demo

Access the application at: `https://nnb568.github.io/photographer-database/`

## 📋 Usage

### Adding a Client

1. Fill out the client form with their information:
   - **Name** (required)
   - **Email** (required)
   - **Phone** (optional)
   - **Session Date** (optional)
   - **Session Type**: Portrait, Wedding, Event, Family, Commercial, or Other
   - **Status**: Inquiry, Booked, Completed, or Delivered
   - **Notes** (optional)

2. Click "Add Client" to save

### Editing a Client

1. Find the client in the list
2. Click the "Edit" button
3. Modify the information in the form
4. Click "Update Client" to save changes

### Deleting a Client

1. Find the client in the list
2. Click the "Delete" button
3. Confirm the deletion

### Searching Clients

Use the search bar to filter clients by name, email, phone number, session type, or status. The list updates in real-time as you type.

## 💾 Data Storage

All client data is stored in your browser's local storage. This means:

- ✅ Your data stays private on your device
- ✅ No account or login required
- ✅ Works offline
- ⚠️ Data is browser-specific (won't sync across devices)
- ⚠️ Clearing browser data will delete your clients

**Tip**: Regularly export your data by backing up the local storage, or take screenshots for records.

## 🛠️ Development

This is a static website that requires no build process or dependencies.

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/nnb568/photographer-database.git
   cd photographer-database
   ```

2. Open `index.html` in your browser, or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js
   npx serve
   ```

3. Navigate to `http://localhost:8000`

## 🌐 Deployment to GitHub Pages

The application is automatically deployed to GitHub Pages:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Select the main branch as the source
4. Save and wait for deployment

Your site will be live at: `https://[username].github.io/[repository-name]/`

## 📁 File Structure

```
photographer-database/
├── index.html      # Main HTML structure
├── styles.css      # Styling and responsive design
├── app.js          # Application logic and client management
└── README.md       # Documentation
```

## 🎨 Customization

You can easily customize the application:

- **Colors**: Edit the CSS variables in `styles.css` (`:root` section)
- **Session Types**: Modify the options in `index.html` and update the select element
- **Fields**: Add or remove form fields by editing both HTML and JavaScript

## 🔒 Privacy & Security

- All data is stored locally in the browser
- No data is sent to any server
- No tracking or analytics
- No external dependencies or CDNs

## 📄 License

This project is open source and available for personal and commercial use.

## 🤝 Contributing

Feel free to fork this repository and submit pull requests for any improvements.

## 📞 Support

If you encounter any issues or have questions, please open an issue on GitHub.