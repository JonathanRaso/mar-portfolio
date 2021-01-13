const getPieces = (req, res, next) => {
  
  const pieceData = {
    id: "45897aze",
    title: "piece number one",
    description: "it is the first piece I've ever created",
    image: "image's url"
  }

  res.status(200).json({ piece: pieceData });
};

exports.getPieces = getPieces;