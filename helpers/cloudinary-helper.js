const cloudinary = require('../config/cloudinary-config')

const uploadImagetoCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath);

    return {
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
    }
  } catch (error) {
    console.error("Caught an error:", error)
    throw new Error("Unexpected error encounered while uploading to cloudinary")
  }
}

const uploadVideotoCloudinary = async (filePath) => {
  try {
    const result = await cloudinary.uploader.upload(filePath, { resource_type: "video" });

    return {
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
    }
  } catch (error) {
    console.error("Caught an error:", error)
    throw new Error("Unexpected error encounered while uploading to cloudinary")
  }
}

const deleteImagefromCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id)

    return result
  } catch (error) {
    console.error("Caught an error:", error)
    throw new Error("Unexpected error encounered while deleting from cloudinary")
  }
}

const deleteVideofromCloudinary = async (public_id) => {
  try {
    const result = await cloudinary.uploader.destroy(public_id, { resource_type: "video" })

    return result
  } catch (error) {
    console.error("Caught an error:", error)
    throw new Error("Unexpected error encounered while deleting from cloudinary")
  }
}


module.exports = {
  uploadImagetoCloudinary,
  uploadVideotoCloudinary,
  deleteImagefromCloudinary,
  deleteVideofromCloudinary,
}

// {
//   public_id: 'cr4mxeqx5zb8rlakpfkg',
//   version: 1571218330,
//   signature: '63bfbca643baa9c86b7d2921d776628ac83a1b6e',
//   width: 864,
//   height: 576,
//   format: 'jpg',
//   resource_type: 'image',
//   created_at: '2017-06-26T19:46:03Z',
//   bytes: 120253,
//   type: 'upload',
//   url: 'http://res.cloudinary.com/demo/image/upload/v1571218330/cr4mxeqx5zb8rlakpfkg.jpg',
//   secure_url: 'https://res.cloudinary.com/demo/image/upload/v1571218330/cr4mxeqx5zb8rlakpfkg.jpg'
// }