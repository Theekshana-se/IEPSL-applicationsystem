const Member = require("../models/Member");
const asyncHandler = require("../middleware/asyncHandler");
const ApiError = require("../utils/ApiError");

exports.createMember = asyncHandler(async (req, res) => {
  const member = await Member.create(req.body);
  res.status(201).json({
    success: true,
    data: member,
  });
});

exports.getAllMembers = asyncHandler(async (req, res) => {
  const members = await Member.find();
  res.status(200).json({
    success: true,
    count: members.length,
    data: members,
  });
});

exports.getMemberById = asyncHandler(async (req, res) => {
  const member = await Member.findById(req.params.id);

  if (!member) {
    throw new ApiError(404, "Member not found");
  }

  res.status(200).json({
    success: true,
    data: member,
  });
});
