import { extractTextFromBuffer, categorizeResumeEntities } from '../services/parserService.js';
import { uploadToS3 } from '../config/s3.js';
import Resume from '../models/Resume.js';

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a resume file (PDF, DOCX, or TXT).' });
    }

    const { buffer, originalname, mimetype } = req.file;

    // 1. Extract raw text
    const rawText = await extractTextFromBuffer(buffer, mimetype, originalname);

    if (!rawText || rawText.trim().length < 20) {
      return res.status(422).json({
        success: false,
        error: 'Unable to extract text from document. Please ensure the file is not scanned/image-only.',
      });
    }

    // 2. Structured entity parsing
    const parsedData = categorizeResumeEntities(rawText);

    // 3. Upload to S3/local storage
    const s3Result = await uploadToS3(buffer, originalname, mimetype);

    const fileType = originalname.endsWith('.pdf') ? 'pdf' : originalname.endsWith('.docx') ? 'docx' : 'text';

    const resumeDoc = await Resume.create({
      userId: req.user ? req.user.id : null,
      fileName: originalname,
      fileType,
      s3Url: s3Result.location,
      rawText,
      parsedData,
    });

    res.status(201).json({
      success: true,
      data: resumeDoc,
    });
  } catch (error) {
    console.error('[RESUME UPLOAD ERROR]', error);
    res.status(500).json({ success: false, error: error.message });
  }
};
