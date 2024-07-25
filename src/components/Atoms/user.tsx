import { atom } from 'recoil'

// { role_Name: 'Security' | "BranchAdmin" }
export const userState = atom({
	key: 'userState',
	default: {
		name: '',
		email: '',
		role: '',
		token: '',
		empsrno: ''
	}
})
