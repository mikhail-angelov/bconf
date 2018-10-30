const aws = require('aws-sdk')

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
const upload = async (request) => {
  const response = {}
  const files = Object.keys(request)
  for (const name of files) {
    console.log('uploading: ', name)
    const file = request[name]
    const ext = file.mimetype.split('/')[1]
    const upload = await s3.upload({
      Bucket: BUCKET,
      Key: `${Date.now()}.${ext}`,
      Body: file.data,
      ContentType: file.mimetype,
      ACL: 'public-read',
    }).promise()
    console.log('uploaded: ', upload)
    response[name] = { url: upload.Location }
  }
  return response
}

module.exports = {
  upload
}
