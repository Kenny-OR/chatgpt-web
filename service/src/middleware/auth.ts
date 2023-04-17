import {getSecretKeyList, isNotEmptyString} from '../utils/is'

const auth = async (req, res, next) => {
    try {
      // const Authorization = req.header('Authorization')
			// // const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
			// const AUTH_SECRET_KEY = getSecretKeyList();
			// let hasAuth = false;
			// for (const key of AUTH_SECRET_KEY) {
			// 	if (Authorization && Authorization.replace('Bearer ', '').trim() === key) {
			// 		hasAuth = true;
			// 		break;
			// 	}
			// }
			//
      // if (!hasAuth)
      //   throw new Error('Error: 无访问权限 | No access rights')
      // next()
			const AUTH_SECRET_KEY = process.env.AUTH_SECRET_KEY
			if (isNotEmptyString(AUTH_SECRET_KEY)) {
				try {
					const Authorization = req.header('Authorization')
					if (!Authorization || Authorization.replace('Bearer ', '').trim() !== AUTH_SECRET_KEY.trim())
						throw new Error('Error: 无访问权限 | No access rights')
					next()
				}
				catch (error) {
					res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
				}
			}
			else {
				next()
			}
    }
    catch (error) {
      res.send({ status: 'Unauthorized', message: error.message ?? 'Please authenticate.', data: null })
    }
}

export { auth }
