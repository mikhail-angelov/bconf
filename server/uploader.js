const aws = require('aws-sdk')
const fileType = require('file-type')
const fetch = require('node-fetch')

aws.config.update({
  secretAccessKey: process.env.YANDEX_CLOUD_SECRET,
  accessKeyId: process.env.YANDEX_CLOUD_ID,
  region: 'us-east-1'
})

const s3 = new aws.S3({
  endpoint: 'https://storage.yandexcloud.net',
  apiVersion: '2006-03-01'
})

const BUCKET = 'bconf'
async function upload(request) {
  const response = {}
  const files = Object.keys(request)
  for (const name of files) {
    console.log('uploading: ', name)
    const file = request[name]
    const ext = file.mimetype.split('/')[1]
    const uploadResponse = await s3.upload({
      Bucket: BUCKET,
      Key: `${Date.now()}.${ext}`,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }).promise()
    console.log('uploaded: ', uploadResponse)
    response[name] = { url: uploadResponse.Location }
  }
  return response
}

async function uploadUrl(url) {
  if (!url) {
    return ''
  } else {
    const resImg = await fetch(url)
    const fileBuffer = await resImg.buffer()
    console.log('fileUrl', url)
    const fileMeta = fileType(fileBuffer)
    console.log('fileMeta: ', JSON.stringify(fileMeta))
    const uploadResponse = await s3.upload({
      Bucket: BUCKET,
      Key: `${Date.now()}.${fileMeta.ext}`,
      Body: fileBuffer,
      ContentType: fileMeta.mimetype,
      ACL: 'public-read',
    }).promise()
    console.log('uploaded: ', uploadResponse)
    return uploadResponse.Location
  }
}

module.exports = {
  upload,
  uploadUrl,
}
