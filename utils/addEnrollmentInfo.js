module.exports = {
  addEnrollmentInfo: function () {
    return [
      {
        $lookup: {
          from: "enrolleds",
          let: { courseId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [{ $toObjectId: "$course_id" }, "$$courseId"] },
              },
            },
          ],
          as: "enrollment",
        },
      },
      {
        $addFields: {
          totalEnroll: {
            $size: "$enrollment",
          },
        },
      },
    ];
  },
};
