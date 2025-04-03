const Expert = require("../models/Expert");
const asyncHandler = require("express-async-handler");

// @desc    Get all experts
// @route   GET /api/experts
// @access  Public
const getExperts = asyncHandler(async (req, res) => {
    const experts = await Expert.find();
    res.status(200).json(experts);
});

// @desc    Get single expert by ID
// @route   GET /api/experts/:id
// @access  Public
const getExpertById = asyncHandler(async (req, res) => {
    const expert = await Expert.findById(req.params.id);
    if (!expert) {
        res.status(404);
        throw new Error("Expert not found");
    }
    res.status(200).json(expert);
});

// @desc    Create a new expert
// @route   POST /api/experts
// @access  Admin
const createExpert = asyncHandler(async (req, res) => {
    const { name, specialty, image, rating } = req.body;

    if (!name || !specialty) {
        res.status(400);
        throw new Error("Please provide all required fields");
    }

    const expert = new Expert({ name, specialty, image, rating });
    const createdExpert = await expert.save();

    res.status(201).json(createdExpert);
});

// @desc    Update an expert
// @route   PUT /api/experts/:id
// @access  Admin
const updateExpert = asyncHandler(async (req, res) => {
    const { name, specialty, image, rating } = req.body;
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
        res.status(404);
        throw new Error("Expert not found");
    }

    expert.name = name || expert.name;
    expert.specialty = specialty || expert.specialty;
    expert.image = image || expert.image;
    expert.rating = rating || expert.rating;

    const updatedExpert = await expert.save();
    res.status(200).json(updatedExpert);
});

// @desc    Delete an expert
// @route   DELETE /api/experts/:id
// @access  Admin
const deleteExpert = asyncHandler(async (req, res) => {
    const expert = await Expert.findById(req.params.id);

    if (!expert) {
        res.status(404);
        throw new Error("Expert not found");
    }

    await expert.deleteOne();
    res.status(200).json({ message: "Expert removed" });
});
// In expertController.js (at the end)
export { getExperts, getExpertById, createExpert, updateExpert, deleteExpert };