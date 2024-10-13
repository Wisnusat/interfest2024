import { uploadToGooglDrive } from '../../../utils/file-upload'; // Adjust the import path

// Named export for POST method
export async function POST(req) {
    try {
        // Get the file from the request body
        const file = await req.formData();

        // Assuming the input field name is 'file'
        const uploadedFile = file.get('file');

        // Upload the file to Google Drive
        const result = await uploadToGooglDrive(uploadedFile);
        
        // Return the result as a JSON response
        return new Response(JSON.stringify(result), { 
            status: 200, 
            headers: { 'Content-Type': 'application/json' } 
        });
    } catch (error) {
        return new Response(error.message, { status: 500 });
    }
}
