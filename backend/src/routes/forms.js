import express from 'express';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ message: 'This is a test route!' });
});

// POST /api/forms - Create a new form
router.post('/forms', async (req, res) => {
  try {
    console.log('POST /forms hit'); // Debugging log
    const { userId, title, description, fields } = req.body;

    // Validate input
    if (!userId || !title || !description || !Array.isArray(fields)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Create the form and associated fields
    const form = await prisma.form.create({
      data: {
        title,
        description,
        userId,
        fields: {
          create: fields.map((field) => ({
            label: field.label,
            type: field.type,
            required: field.required || false,
            options: field.options || [],
          })),
        },
      },
      include: {
        fields: true,
      },
    });

    res.status(201).json({ message: 'Form created successfully', form });
  } catch (error) {
    console.error('Error creating form:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// GET /api/forms - Retrieve all forms
router.get('/forms', async (req, res) => {
  try {
    const forms = await prisma.form.findMany({
      include: {
        fields: true, // Include associated fields
      },
    });

    res.status(200).json(forms);
  } catch (error) {
    console.error('Error retrieving forms:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/forms/:formId/submissions', async (req, res) => {
  try {
    const { formId } = req.params;
    const { userId, data } = req.body;

    // Validate input
    if (!formId || !userId || !data) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Check if the form exists
    const form = await prisma.form.findUnique({
      where: { id: parseInt(formId) },
    });
    if (!form) {
      return res.status(404).json({ error: 'Form not found' });
    }

    // Create the submission
    const submission = await prisma.formSubmission.create({
      data: {
        formId: parseInt(formId),
        userId,
        data,
      },
    });

    res.status(201).json({ message: 'Form submission created', submission });
  } catch (error) {
    console.error('Error creating form submission:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Export as default
export default router;