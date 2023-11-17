import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

export const fireBaseConfig = (): void => {
  initializeApp({
    credential: cert({
      projectId: 'test-login-709b9',
      clientEmail:
        'firebase-adminsdk-z2jyd@test-login-709b9.iam.gserviceaccount.com',
      privateKey:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnsA9reu2OZ2iZ\neAsx0OrMFjYfhokNK+WY/fPODa+8YRyRAZuAZE6CCAD39az0gEuvEDM3wkcQi9sL\nPw16O9O7OqG5GyqDEHtCKL24EAFWm1KkE95QoOJkJRsD5yVQb+B0y4zIylyrBhph\nCDnWMtU7ko0UZSLcqnHw5IkjZtNUNXos3yXKxg3130uuZbDAuHdQNMF9QB8Czvrw\nTviMk9GXBh4TLRjvif89DXpGf5eyaUVKY5nTS/ITKm4PKjKx9CniLSlgf/PUpNFo\nVCi7SV63dGt/chsyCPuyjLvwcUGzMsvFJDz/+DMXBEQ1JFRP1kIB1VT0Pv9BGI/q\nGWkTx2FpAgMBAAECggEABw08WMS+oLJwj6OgtOOYPCTi+chqkwc5jImBazTgIwfi\nb6alp2yQcJ9tiv/l2hJbHG2N+dZNrsBy4bIxGubRLJp2mpYt330d8dZMxCTIKaA2\nhXfgbXuWiaeVz0A1LYDG66JztS3tX7POAC6cYAmbNfofvK/UG3t/dyXlLnvwfyX/\nHCBTY284Y2qqLl2Dh1MOuipE2Rt0r2x3LiWfL+HMJNY1r1+dA0w0Ko9TR2MGfxvi\nXCbl73168xCjjt+GAFUvSfeHyVpb3xbziQn9My92la2HTi4E5dwJB9VjElmT+5e9\nYvapeskcwDr+7WXCFdhkmV34NFY5m3TW+OytESJmUQKBgQDcDTfZfKZW13dVqmfP\ntmE1gZyuyreHlyZff5GIealFWSp1BWDtsHslWRP16CC8mpW3fMorh49ao/BmloI/\nkRO6h9pweAn56liNrFj0NGRdcItYZ2B5UsKx0YuIXzwNIOuHLc6C0ua6WFCBHugl\nISOUzt179m84/sF08C/ayuGf9wKBgQDDFO5PTMRUaYw5iuTPIMPudy/CINtIAyU1\nBUljrEawx9ttFjj/gRTYhOeDAIZv4zddf3TTIuuNWhYdz1Aulxss7HP/yuisIEhO\nI4DBm6PRnLqKBKAF1MjOiRf3xYlUyaphsVbM/aPoFgppgYzb/ctX8zGp9iem5HtK\nvh/9Nf9xnwKBgArLfzTlH4fdFBaYwHT5HnWwgQ42FaDKMnC24l3OkhY71JBfDi06\n3h+r6gXDOG/oKXYR4h0WjlrE9hMiSQtzQ4OADKA900d2TpfMn6SDOXU4Ay34DEyH\nWdO9UtoCygBe4A8GmT3juLvlfzWGXZ8MrCEtsMHXCgfCv5zL950FHOJrAoGAJTGF\nagsZ13o0KPhpPXBiysFgkqOPC0DGRECYyG8dHzFLjZXSEiy7G7jjJt/fwc9RS/sz\n+9lJja6iTtaq0+ctYDhIuXknOUICZxtvvfn9lsZJ7myJUfNKwc3ziuLXlxnH6U5V\nXUnyiRpCq/DuOTc/IKqWSnBLCQ/AzfRHxxAXfsMCgYEAmz9d5Onc4FuLifLL1dLT\npMIPdrOLbAFOcaSCW3vcnoUZEYsWkUhXFRLTzyhohcJM0pujATFJY/IsAQlUK4ld\n/Yuw1edujNcNaIzh8y+v1GKAH+AV+Et6I5sX4yf/T4YjD/ccENuILgNs9KZPhtb6\nFEzyxFQLT/PVjqsAKlMyMhs=\n-----END PRIVATE KEY-----\n'
    })
  })
}

export const verifyToken = async (idToken: any): Promise<any> => {
  try {
    const auth = getAuth()
    const decodedToken = await auth.verifyIdToken(idToken)
    return decodedToken
  } catch (e) {
    throw new Error('Invalid Token')
  }
}
