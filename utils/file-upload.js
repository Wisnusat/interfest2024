"use server"; // if you are using reactjs remove this line this is for nextjs only
import { google } from "googleapis";
import { Readable } from "stream";

export const findExistingFile = async (driveService, fileName) => {
    try {
        const response = await driveService.files.list({
            q: `name='${fileName}'`,
            fields: "files(id, webViewLink)",
        });
        const files = response.data.files;
        if (files && files.length > 0) {
            return files[0]; // Return the first matching file
        } else {
            return null; // File not found
        }
    } catch (error) {
        console.error("Error searching for file:", error);
        throw new Error('Failed to search for file');
    }
};

export const uploadToGooglDrive = async (file) => {
    try {
        // Create an authenticated Google Drive client
        const auth = new google.auth.GoogleAuth({
            credentials: {
                type: process.env.TYPE,
                project_id: process.env.PROJECT_ID,
                private_key_id: process.env.PRIVATE_KEY_ID,
                private_key: process.env.PRIVATE_KEY.replace(/\\n/g, '\n'),
                client_email: process.env.CLIENT_EMAIL,
                client_id: process.env.CLIENT_ID,
                auth_uri: process.env.AUTH_URI,
                token_uri: process.env.TOKEN_URI,
                auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
                client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
                universe_domain: process.env.UNIVERSE_DOMAIN,
            },
            scopes: ["https://www.googleapis.com/auth/drive"],
        });

        const driveService = google.drive({ version: "v3", auth });
        
        // Ensure the file object is valid
        if (!file || !file.name || !file.stream) {
            throw new Error('Invalid file data');
        }

        // Check if the file already exists in Google Drive
        const existingFile = await findExistingFile(driveService, file.name);
        if (existingFile) {
            return { viewLink: existingFile.webViewLink, success: true };
        }

        // Prepare file metadata and upload
        const fileMetadata = {
            name: file.name,
        };

        const response = await driveService.files.create({
            requestBody: fileMetadata,
            media: {
                mimeType: file.type || "application/pdf", // Dynamically set mime type or default to PDF
                body: Readable.from(file.stream()),
            },
            fields: "id, webViewLink",
        });

        const docId = response.data.id;
        const viewLink = response.data.webViewLink;
        console.log(`File '${file.name}' uploaded with ID: ${docId}`);
        console.log(`View link: ${viewLink}`);

        // Add permissions for anyone to read the file
        await driveService.permissions.create({
            fileId: docId,
            requestBody: {
                role: "reader",
                type: "anyone",
            },
        });

        // Add a writer permission for a specific user
        await driveService.permissions.create({
            fileId: docId,
            requestBody: {
                role: "writer",
                type: "user",
                emailAddress: "<your email address>", // Replace with the email to share
            },
        });

        return { viewLink, success: true };
    } catch (error) {
        console.error("Error uploading file to Google Drive:", error);
        throw new Error('Failed to upload file to Google Drive');
    }
};
