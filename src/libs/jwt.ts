import jwt from 'jsonwebtoken'
export async function createAccessToken (payload: any): Promise<string | undefined> {
  return await new Promise((resolve, reject) => {
    jwt.sign(payload, 'secret123', { expiresIn: '1d' }, (err, token) => {
      if (err !== null) {
        reject(err)
      } else {
        resolve(token)
      }
    })
  })
}
