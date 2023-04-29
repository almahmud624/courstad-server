module.exports = {
  addRatingInfo: function () {
    return [
      {
        $lookup: {
          from: "ratings",
          let: { courseId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: [{ $toObjectId: "$course_id" }, "$$courseId"] },
              },
            },
          ],
          as: "reviews",
        },
      },
      {
        $addFields: {
          rating: {
            $avg: "$reviews.rating",
          },
        },
      },
    ];
  },
};
