const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const router = express.Router();

// POST /api/forms - Create a new form
router.post('/forms', async (req, res) => {
  try {
    const { formName, fields } = req.body;

    // Validate the request body
    if (!formName || !fields || !Array.isArray(fields)) {
      return res.status(400).json({ error: 'Invalid input data' });
    }

    // Save the form in the database
    const form = await prisma.form.create({
      data: {
        name: formName,
        fields: JSON.stringify(fields), // Save fields as JSON
      },
    });

    res.status(201).json({ message: 'Form created successfully', form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/forms - Retrieve all forms
router.get('/forms', async (req, res) => {
    try {
      const forms = await prisma.form.findMany();
  
      // Parse the fields JSON before sending the response
      const formattedForms = forms.map((form) => ({
        ...form,
        fields: JSON.parse(form.fields),
      }));
  
      res.status(200).json(formattedForms);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

module.exports = router;
