// import Expert from "../models/Expert.js";
// import asyncHandler from "express-async-handler";
//
// // @desc    Get all experts
// // @route   GET /api/experts
// // @access  Public
// const getExperts = asyncHandler(async (req, res) => {
//     const experts = await Expert.find();
//     res.status(200).json(experts);
// });
//
// // @desc    Get single expert by ID
// // @route   GET /api/experts/:id
// // @access  Public
// const getExpertById = asyncHandler(async (req, res) => {
//     const expert = await Expert.findById(req.params.id);
//     if (!expert) {
//         res.status(404);
//         throw new Error("Expert not found");
//     }
//     res.status(200).json(expert);
// });
//
// // @desc    Create a new expert
// // @route   POST /api/experts
// // @access  Admin
// const createExpert = asyncHandler(async (req, res) => {
//     const { name, specialization, phone, email, bio } = req.body;
//
//     if (!name || !specialization || !phone || !email) {
//         res.status(400);
//         throw new Error("Please provide all required fields");
//     }
//
//     const expert = new Expert({ name, specialization, phone, email, bio });
//     const createdExpert = await expert.save();
//
//     res.status(201).json(createdExpert);
// });
//
// // @desc    Update an expert
// // @route   PUT /api/experts/:id
// // @access  Admin
// const updateExpert = asyncHandler(async (req, res) => {
//     const { name, specialization, phone, email, bio } = req.body;
//     const expert = await Expert.findById(req.params.id);
//
//     if (!expert) {
//         res.status(404);
//         throw new Error("Expert not found");
//     }
//
//     expert.name = name || expert.name;
//     expert.specialization = specialization || expert.specialization;
//     expert.phone = phone || expert.phone;
//     expert.email = email || expert.email;
//     expert.bio = bio || expert.bio;
//
//     const updatedExpert = await expert.save();
//     res.status(200).json(updatedExpert);
// });
//
// // @desc    Delete an expert
// // @route   DELETE /api/experts/:id
// // @access  Admin
// const deleteExpert = asyncHandler(async (req, res) => {
//     const expert = await Expert.findById(req.params.id);
//
//     if (!expert) {
//         res.status(404);
//         throw new Error("Expert not found");
//     }
//
//     await expert.deleteOne();
//     res.status(200).json({ message: "Expert removed" });
// });
//
// export { getExperts, getExpertById, createExpert, updateExpert, deleteExpert };
