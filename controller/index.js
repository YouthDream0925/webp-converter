import path from 'path';
import fs from 'fs-extra';
import sharp from 'sharp';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const compressImage = async (req, res) => {
    try {
        const imageDir = path.join(__dirname, '../images');
        const files = await fs.readdir(imageDir);

        // Define maximum width and height for resized image
        const maxWidth = 768;
        const maxHeight = 768;

        files.map(async (file) => {
            const imagePath = path.join(imageDir, file);

            try {
                // Read the image file
                const imageBuffer = await fs.readFile(imagePath);
        
                let originalWidth = 512;
                let originalHeight = 512;
        
                sharp(imageBuffer)
                    .metadata()
                    .then(async (imageInfo) => {
                        originalWidth = imageInfo.width;
                        originalHeight = imageInfo.height;
        
                        // Calculate dimensions for resized image while maintaining aspect ratio
                        let resizedWidth; let resizedHeight;
                        if (originalWidth > maxWidth || originalHeight > maxHeight) {
                            const aspectRatio = originalWidth / originalHeight;
                            if (aspectRatio > 1) {
                                // Landscape orientation
                                resizedWidth = Math.min(originalWidth, maxWidth);
                                resizedHeight = Math.round(resizedWidth / aspectRatio);
                            } else {
                                // Portrait or square orientation
                                resizedHeight = Math.min(originalHeight, maxHeight);
                                resizedWidth = Math.round(resizedHeight * aspectRatio);
                            }
                        } else {
                            // Image is smaller than maximum dimensions, no need to resize
                            resizedWidth = originalWidth;
                            resizedHeight = originalHeight;
                        }
            
                        // Resize the image to fit within the maximum width and height while maintaining aspect ratio
                        const compressedBuffer = await sharp(imageBuffer)
                            .resize(resizedWidth, resizedHeight)
                            .webp({ quality: 100 })
                            .toFormat('webp')
                            .toBuffer();
        
                        const outputImagePath = path.join(imageDir, `${path.parse(file).name}.webp`);
                        await fs.writeFile(outputImagePath, compressedBuffer);
                    })
                    .catch(async (err) => {
                        console.error('Error processing image:', err);
                    });
            } catch (error) {
                console.error('Error processing image:', imagePath, err);
            }
        })

        return res.status(200).json({ message: 'You have successfully converted your images to webp format.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

export default {
    compressImage
}